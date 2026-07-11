# Graph Report - .  (2026-07-11)

## Corpus Check
- 205 files · ~936,234 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 408 nodes · 770 edges · 29 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## God Nodes (most connected - your core abstractions)
1. `fetchCourseTrends()` - 7 edges
2. `getCurrentWeekBounds()` - 6 edges
3. `validateConsultStep1()` - 5 edges
4. `addDaysToDateKey()` - 5 edges
5. `buildWeeklyBuckets()` - 5 edges
6. `buildDeckEnterTimeline()` - 4 edges
7. `validateConsultStep2()` - 4 edges
8. `getMondayOfWeekContaining()` - 4 edges
9. `focusFirstError()` - 3 edges
10. `resolveInternalHref()` - 3 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Communities

### Community 0 - "Community 0"
Cohesion: 0.05
Nodes (0): 

### Community 1 - "Community 1"
Cohesion: 0.07
Nodes (2): createTranslator(), LanguageProvider()

### Community 2 - "Community 2"
Cohesion: 0.08
Nodes (2): onKey(), showChrome()

### Community 3 - "Community 3"
Cohesion: 0.1
Nodes (3): captureEvent(), capturePageview(), isPostHogReady()

### Community 4 - "Community 4"
Cohesion: 0.09
Nodes (10): getBootLoaderPreloadScript(), isBootLoaderDisabled(), getHandler(), requestBootNavigation(), normalizePath(), onClick(), resolveInternalHref(), isLinkActive() (+2 more)

### Community 5 - "Community 5"
Cohesion: 0.1
Nodes (2): handleLinkClick(), scrollToSection()

### Community 6 - "Community 6"
Cohesion: 0.14
Nodes (19): fetchSummary(), load(), buildTicks(), formatBucketTitle(), niceMax(), parseLocalDateKey(), addDaysToDateKey(), buildMonthlyBuckets() (+11 more)

### Community 7 - "Community 7"
Cohesion: 0.09
Nodes (0): 

### Community 8 - "Community 8"
Cohesion: 0.13
Nodes (13): isRecord(), readConsultFormDraft(), focusFirstError(), goNext(), handleSubmit(), isValidEmail(), isValidSource(), isValidVietnamPhone() (+5 more)

### Community 9 - "Community 9"
Cohesion: 0.17
Nodes (6): createAnalyticsSessionToken(), getAuthSecret(), verifyAnalyticsSessionToken(), createDeckSessionToken(), getAuthSecret(), verifyDeckSessionToken()

### Community 10 - "Community 10"
Cohesion: 0.27
Nodes (4): buildDeckEnterTimeline(), enterDuration(), enterFromVars(), enterStagger()

### Community 11 - "Community 11"
Cohesion: 0.22
Nodes (0): 

### Community 12 - "Community 12"
Cohesion: 0.25
Nodes (0): 

### Community 13 - "Community 13"
Cohesion: 0.29
Nodes (0): 

### Community 14 - "Community 14"
Cohesion: 0.29
Nodes (0): 

### Community 15 - "Community 15"
Cohesion: 0.43
Nodes (3): deckPassword(), ensureDeckAuthenticated(), openDeckSlide()

### Community 16 - "Community 16"
Cohesion: 0.5
Nodes (0): 

### Community 17 - "Community 17"
Cohesion: 0.67
Nodes (0): 

### Community 18 - "Community 18"
Cohesion: 1.0
Nodes (0): 

### Community 19 - "Community 19"
Cohesion: 1.0
Nodes (0): 

### Community 20 - "Community 20"
Cohesion: 1.0
Nodes (0): 

### Community 21 - "Community 21"
Cohesion: 1.0
Nodes (0): 

### Community 22 - "Community 22"
Cohesion: 1.0
Nodes (0): 

### Community 23 - "Community 23"
Cohesion: 1.0
Nodes (0): 

### Community 24 - "Community 24"
Cohesion: 1.0
Nodes (0): 

### Community 25 - "Community 25"
Cohesion: 1.0
Nodes (0): 

### Community 26 - "Community 26"
Cohesion: 1.0
Nodes (0): 

### Community 27 - "Community 27"
Cohesion: 1.0
Nodes (0): 

### Community 28 - "Community 28"
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **Thin community `Community 18`** (2 nodes): `useCourseScrollSpy.ts`, `useCourseScrollSpy()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 19`** (1 nodes): `next-env.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 20`** (1 nodes): `next.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 21`** (1 nodes): `playwright.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 22`** (1 nodes): `instrumentation-client.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 23`** (1 nodes): `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 24`** (1 nodes): `Metric.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 25`** (1 nodes): `bento-monochrome.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 26`** (1 nodes): `about.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 27`** (1 nodes): `courseRegistration.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 28`** (1 nodes): `logos.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.07 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.09 - nodes in this community are weakly interconnected._
- **Should `Community 5` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `Community 6` be split into smaller, more focused modules?**
  _Cohesion score 0.14 - nodes in this community are weakly interconnected._