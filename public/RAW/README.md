# Deck raw images

Drop photos here. Run:

```bash
npm run sync:deck-images
```

Or leave this running while you add files:

```bash
npm run sync:deck-images:watch
```

## File naming

| Pattern | Deck page | Example |
|---------|-----------|---------|
| `slide{N}.{ext}` | Page N (1–9) | `slide1.jpg`, `slide5.png` |
| `slide{PP}.{ext}` | Page 10–27 | `slide10.jpg`, `slide18.webp` |
| `slide{P}{S}.{ext}` | Page P, slot S | `slide61` = page 6 slot 1, `slide72` = page 7 slot 2 |
| `slide{PP},{S}.{ext}` | Page PP, slot S | `slide12,1.jpg`, `slide12,2.webp` |

### Multi-image slides

- **Page 6** (sensors mosaic): `slide61` … `slide64`
- **Page 7** (actuators): `slide71` … `slide73`
- **Page 10** (flow + photo): `slide10` + `slide102` (page 10 slot 2)

### Aliases

| File | Maps to |
|------|---------|
| `arduino_board.*` | Page 3 |
| `mblock.*` | Page 8 |

### Logos

Files ending in `_logo` (e.g. `mblock_logo.png`) are optimized to `public/Images/Deck/assets/` and are **not** auto-assigned to slides.

### Skipped

- **Page 4** uses the animated MCU diagram component — no static image.

Output: optimized WebP in `public/Images/Deck/` and updated `src/data/arduinoMblockDeckImages.ts`.
