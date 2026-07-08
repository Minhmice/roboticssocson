# Graph Report - .  (2026-07-08)

## Corpus Check
- 147 files · ~686,024 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 247 nodes · 466 edges · 22 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## God Nodes (most connected - your core abstractions)
1. `validateConsultStep1()` - 5 edges
2. `validateConsultStep2()` - 4 edges
3. `resolveInternalHref()` - 3 edges
4. `isLinkActive()` - 3 edges
5. `isValidVietnamPhone()` - 3 edges
6. `req()` - 3 edges
7. `validateConsultForm()` - 3 edges
8. `normalizePath()` - 2 edges
9. `onClick()` - 2 edges
10. `scrollToSection()` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Communities

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (0): 

### Community 1 - "Community 1"
Cohesion: 0.09
Nodes (0): 

### Community 2 - "Community 2"
Cohesion: 0.15
Nodes (0): 

### Community 3 - "Community 3"
Cohesion: 0.1
Nodes (0): 

### Community 4 - "Community 4"
Cohesion: 0.12
Nodes (5): handleLinkClick(), scrollToSection(), isLinkActive(), linkClassName(), mobileLinkClassName()

### Community 5 - "Community 5"
Cohesion: 0.15
Nodes (7): getBootLoaderPreloadScript(), isBootLoaderDisabled(), getHandler(), requestBootNavigation(), normalizePath(), onClick(), resolveInternalHref()

### Community 6 - "Community 6"
Cohesion: 0.16
Nodes (0): 

### Community 7 - "Community 7"
Cohesion: 0.24
Nodes (8): isValidEmail(), isValidSource(), isValidVietnamPhone(), normalizeVietnamPhone(), req(), validateConsultForm(), validateConsultStep1(), validateConsultStep2()

### Community 8 - "Community 8"
Cohesion: 0.18
Nodes (0): 

### Community 9 - "Community 9"
Cohesion: 0.5
Nodes (0): 

### Community 10 - "Community 10"
Cohesion: 0.5
Nodes (0): 

### Community 11 - "Community 11"
Cohesion: 0.5
Nodes (0): 

### Community 12 - "Community 12"
Cohesion: 0.5
Nodes (0): 

### Community 13 - "Community 13"
Cohesion: 1.0
Nodes (0): 

### Community 14 - "Community 14"
Cohesion: 1.0
Nodes (0): 

### Community 15 - "Community 15"
Cohesion: 1.0
Nodes (0): 

### Community 16 - "Community 16"
Cohesion: 1.0
Nodes (0): 

### Community 17 - "Community 17"
Cohesion: 1.0
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

## Knowledge Gaps
- **Thin community `Community 13`** (2 nodes): `useCourseScrollSpy.ts`, `useCourseScrollSpy()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 14`** (1 nodes): `next-env.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 15`** (1 nodes): `next.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 16`** (1 nodes): `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 17`** (1 nodes): `Metric.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 18`** (1 nodes): `bento-monochrome.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 19`** (1 nodes): `about.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 20`** (1 nodes): `courseRegistration.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 21`** (1 nodes): `logos.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.06 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.09 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.12 - nodes in this community are weakly interconnected._