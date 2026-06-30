# Static images for the sponsorship site

All paths below are relative to `public/`. Run `npm run check:assets` to verify every referenced file exists before deploy.

## Directories

| Folder | Used by |
|--------|---------|
| `Images/Teams/` | Team carousel (`src/data/team.ts`) |
| `Images/About FTC/` | About FTC section |
| `Images/About First/` | About FIRST section |
| `Images/About SocSonHighschool/` | School section |
| `Images/Achievements/` | Achievements gallery |
| `Images/Mission/` | Mission section |
| `Images/QR CODE/` | Sponsor page personal donation QR |

## Before go-live

1. Ensure all images are committed (or rsync `public/Images/` to the VPS).
2. Update bank details in `src/data/sponsorPage.ts` (`bankInfo`).
3. Optional: set YouTube/TikTok/GitHub URLs in `src/data/settings.ts` when available.
