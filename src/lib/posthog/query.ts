const POSTHOG_PROJECT_ID = process.env.POSTHOG_PROJECT_ID ?? "506211";
const POSTHOG_API_HOST =
  process.env.POSTHOG_API_HOST ?? "https://us.posthog.com";

export const POSTHOG_PERSONAL_API_KEYS_URL =
  "https://us.posthog.com/settings/user-api-keys";

export type HogQLRow = Record<string, string | number | null>;

export type CourseFunnelEventId =
  | "course_page_viewed"
  | "course_register_page_viewed"
  | "course_register_submit_clicked";

export type TrendRange = "weekly" | "monthly";

export type TrendBucket = {
  key: string;
  label: string;
  course_page_viewed: number;
  course_register_page_viewed: number;
  course_register_submit_clicked: number;
};

export type AnalyticsSummary = {
  configured: boolean;
  trends: {
    weekly: TrendBucket[];
    monthly: TrendBucket[];
  };
  posthogAppUrl: string;
  posthogApiKeysUrl: string;
  error?: string;
};

const COURSE_FUNNEL_EVENT_IDS: CourseFunnelEventId[] = [
  "course_page_viewed",
  "course_register_page_viewed",
  "course_register_submit_clicked",
];

const EVENT_LIST_SQL = COURSE_FUNNEL_EVENT_IDS.map((id) => `'${id}'`).join(
  ", ",
);

/** Team analytics use Vietnam local week (Mon–Sun). */
const ANALYTICS_TIMEZONE = "Asia/Ho_Chi_Minh";

const WEEKDAY_LABELS_VI = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"] as const;

function formatLocalDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getDateKeyInTimezone(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function parseDateKey(key: string): Date {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day, 12, 0, 0, 0);
}

function addDaysToDateKey(key: string, days: number): string {
  const date = parseDateKey(key);
  date.setDate(date.getDate() + days);
  return formatLocalDate(date);
}

function getMondayOfWeekContaining(dateKey: string): string {
  const date = parseDateKey(dateKey);
  const weekday = date.getDay();
  const diff = weekday === 0 ? 6 : weekday - 1;
  date.setDate(date.getDate() - diff);
  return formatLocalDate(date);
}

function getCurrentWeekBounds(): { monday: string; nextMonday: string } {
  const todayKey = getDateKeyInTimezone(new Date(), ANALYTICS_TIMEZONE);
  const monday = getMondayOfWeekContaining(todayKey);
  return {
    monday,
    nextMonday: addDaysToDateKey(monday, 7),
  };
}

async function runHogQL<T extends HogQLRow>(query: string): Promise<T[]> {
  const personalKey = process.env.POSTHOG_PERSONAL_API_KEY?.trim();
  if (!personalKey) {
    throw new Error("POSTHOG_PERSONAL_API_KEY is not configured");
  }

  const response = await fetch(
    `${POSTHOG_API_HOST}/api/projects/${POSTHOG_PROJECT_ID}/query/`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${personalKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: {
          kind: "HogQLQuery",
          query,
        },
      }),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `PostHog query failed (${response.status}): ${body.slice(0, 200)}`,
    );
  }

  const payload = (await response.json()) as {
    results?: T[][];
    columns?: string[];
  };

  const columns = payload.columns ?? [];
  const rows = payload.results ?? [];

  return rows.map((row) => {
    const record: HogQLRow = {};
    columns.forEach((column, index) => {
      const value = row[index];
      record[column] =
        typeof value === "string" || typeof value === "number" || value === null
          ? value
          : value == null
            ? null
            : String(value);
    });
    return record as T;
  });
}

function emptyBucket(key: string, label: string): TrendBucket {
  return {
    key,
    label,
    course_page_viewed: 0,
    course_register_page_viewed: 0,
    course_register_submit_clicked: 0,
  };
}

function buildWeeklyBuckets(): TrendBucket[] {
  const { monday } = getCurrentWeekBounds();
  const buckets: TrendBucket[] = [];

  for (let day = 0; day < 7; day += 1) {
    const key = addDaysToDateKey(monday, day);
    buckets.push(emptyBucket(key, WEEKDAY_LABELS_VI[day]));
  }

  return buckets;
}

function buildMonthlyBuckets(): TrendBucket[] {
  const year = new Date().getFullYear();
  const buckets: TrendBucket[] = [];

  for (let month = 0; month < 12; month += 1) {
    const date = new Date(year, month, 1);
    const key = `${year}-${String(month + 1).padStart(2, "0")}-01`;
    const label = date.toLocaleString("en-US", { month: "short" });
    buckets.push(emptyBucket(key, label));
  }

  return buckets;
}

function mergeTrendRows(
  buckets: TrendBucket[],
  rows: Array<{ period: string; event: string; total: number }>,
): TrendBucket[] {
  const byKey = new Map(buckets.map((bucket) => [bucket.key, { ...bucket }]));

  for (const row of rows) {
    const periodKey = String(row.period).slice(0, 10);
    const event = row.event as CourseFunnelEventId;
    const bucket = byKey.get(periodKey);
    if (!bucket || !COURSE_FUNNEL_EVENT_IDS.includes(event)) continue;
    bucket[event] = Number(row.total ?? 0);
  }

  return Array.from(byKey.values());
}

async function fetchCourseTrends(): Promise<{
  weekly: TrendBucket[];
  monthly: TrendBucket[];
}> {
  const { monday, nextMonday } = getCurrentWeekBounds();
  // HogQL toDate() accepts one argument only; shift to VN time first via toTimeZone.
  const localEventDate = `toDate(toTimeZone(timestamp, '${ANALYTICS_TIMEZONE}'))`;

  const [weeklyRows, monthlyRows] = await Promise.all([
    runHogQL<{ period: string; event: string; total: number }>(
      `SELECT ${localEventDate} AS period, event, count() AS total FROM events WHERE event IN (${EVENT_LIST_SQL}) AND ${localEventDate} >= toDate('${monday}') AND ${localEventDate} < toDate('${nextMonday}') GROUP BY period, event ORDER BY period`,
    ),
    runHogQL<{ period: string; event: string; total: number }>(
      `SELECT toStartOfMonth(timestamp) AS period, event, count() AS total FROM events WHERE event IN (${EVENT_LIST_SQL}) AND timestamp >= toStartOfYear(now()) AND timestamp < toStartOfYear(now()) + INTERVAL 1 YEAR GROUP BY period, event ORDER BY period`,
    ),
  ]);

  return {
    weekly: mergeTrendRows(buildWeeklyBuckets(), weeklyRows),
    monthly: mergeTrendRows(buildMonthlyBuckets(), monthlyRows),
  };
}

const EMPTY_TRENDS = {
  weekly: buildWeeklyBuckets(),
  monthly: buildMonthlyBuckets(),
};

export async function fetchAnalyticsSummary(): Promise<AnalyticsSummary> {
  const posthogAppUrl = `${POSTHOG_API_HOST}/project/${POSTHOG_PROJECT_ID}`;

  if (!process.env.POSTHOG_PERSONAL_API_KEY?.trim()) {
    return {
      configured: false,
      trends: EMPTY_TRENDS,
      posthogAppUrl,
      posthogApiKeysUrl: POSTHOG_PERSONAL_API_KEYS_URL,
      error:
        "Thêm POSTHOG_PERSONAL_API_KEY vào .env.local (tạo tại PostHog → Settings → Personal API keys, scope: query:read).",
    };
  }

  try {
    const trends = await fetchCourseTrends();

    return {
      configured: true,
      trends,
      posthogAppUrl,
      posthogApiKeysUrl: POSTHOG_PERSONAL_API_KEYS_URL,
    };
  } catch (error) {
    return {
      configured: false,
      trends: EMPTY_TRENDS,
      posthogAppUrl,
      posthogApiKeysUrl: POSTHOG_PERSONAL_API_KEYS_URL,
      error: error instanceof Error ? error.message : "Failed to query PostHog",
    };
  }
}
