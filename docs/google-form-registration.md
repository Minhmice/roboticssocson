# Google Form registration (custom UI)

The course consult form on `/course#course-register` uses a **custom React UI**. It does **not** embed a Google Forms iframe. Submissions POST to Google’s `formResponse` endpoint via a hidden iframe + hidden form.

## Live form

| | |
|---|---|
| Title | Đăng kí tư vấn khoá học lập trình Robotics |
| View | `https://docs.google.com/forms/d/e/1FAIpQLSda8_sRGtCiOLWgjR073-TV9drtiOzdWW9nbgLr5PIqO9xzTw/viewform` |
| Post | `…/formResponse` |

## Mapping file

`src/lib/google-form-map.ts` holds:

- `GOOGLE_FORM_POST_URL`
- `GOOGLE_FORM_ENTRIES` (exact `entry.<id>` names)
- Radio options (must match Google’s strings)
- `__other_option__` + `entry.<id>.other_option_response` for “Mục khác”
- `pageHistory: "0,1"` (multi-section form)

Validation: `src/lib/google-form-validation.ts`  
UI: `src/components/course/CourseConsultForm.tsx`

## How to refresh entry IDs after the form changes

1. Open the form **view** URL (or “Preview”).
2. View page source / fetch HTML and find `FB_PUBLIC_LOAD_DATA_ = …`.
3. Parse the JSON. Each question has structure roughly:
   - `[questionId, "Title", …, type, [[entryId, options…], …], …]`
   - `type`: `0` short text, `1` paragraph, `2` multiple choice, `8` page break.
4. Update `GOOGLE_FORM_ENTRIES` with the new `entry.<entryId>` values.
5. If options or titles change, update `GOOGLE_FORM_SOURCE_OPTIONS` and UI labels to match **exact** Google option strings.
6. If section order changes, re-check `pageHistory` (usually `"0,1"` for two pages).

Example one-liner (Node, from repo root):

```bash
node -e "fetch('VIEW_URL').then(r=>r.text()).then(h=>{const m=h.match(/FB_PUBLIC_LOAD_DATA_\\s*=\\s*([\\s\\S]*?);\\s*<\\/script>/); const d=JSON.parse(m[1]); d[1][1].forEach(q=>{ if(!q||q[3]===8) return; console.log(q[1], 'type', q[3], 'entry', q[4]?.[0]?.[0]); });})"
```

## Testing submissions

1. Fill the custom UI with sample data; use “Mục khác” once with custom text.
2. Submit → UI shows success (optimistic).
3. In Google Forms → **Responses**, confirm the row (including Other).
4. Confirm no visible Google Form chrome on the site; only the site’s form card.

## Notes

- CORS: browser `fetch` to `formResponse` is opaque; hidden iframe POST is the supported pattern.
- Google may silently drop mismatched option strings or wrong entry IDs — always re-extract after edits.
- Optional long-text fields can be omitted from the POST when empty.
