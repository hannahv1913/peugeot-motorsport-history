# Peugeot Sport — Motorsport History Design System

## Mode
**Experience** — An editorial motorsport exhibition and scroll-driven monograph. The race cars, historical liveries, and champion photography lead from the first viewport; the interface recedes into razor-sharp architectural hairlines and FIA-timing telemetry typography.

## Visual World
- **Architectural Motorsport Monograph**: Sharp `2px` corners, hairline dividers (`1px solid var(--border)`), `3px` era-accent index bars, and subtle archival film grain over era-accurate livery backgrounds.
- **Typography**:
  - Display: `Archivo Black` (tight `-0.025em` tracking, uppercase monumental chapter headlines)
  - Condensed Editorial: `Barlow Condensed` (700/800 for vehicle titles, trophy figures, and navigation)
  - Telemetry / Specs: `JetBrains Mono` (`tabular-nums`, `0.18em–0.24em` uppercase tracking for years, chassis codes, lap records, and chapter indices)
  - Body: `Inter` (clean 15–19px reading measure, max `68ch`)
- **Per-Era Livery Palettes**:
  - `9x8` (2022–Today): Selenium Grey, Obsidian Black, Kryptonite `#A4E82C`
  - `1981` (Group B): PTS White `#F5F5F2`, Navy `#002F87`, Cyan `#009CDE`, Yellow `#FFD100`, Red `#E30613`
  - `1987` (Dakar / Pikes Peak): Camel Yellow `#F4C300`, Sunset Ochre, Pioneer Navy `#0D2B6B`
  - `1990` (905 Le Mans): Esso Night Blue `#003399`, White, PTS Swish
  - `1994` (Formula 1): McLaren Dayglo `#FF2800`, White, Jordan Yellow `#F7D117`, Prost Blue `#00449E`
  - `1999` (206 WRC): Silver Bullet `#CFD6DE`, Cobalt `#003A8F`, Total Red `#E2001A`
  - `2007` (908 HDi FAP): Exposed Carbon `#12151A`, Midnight Blue `#1B283D`, Total Red `#E30613`
  - `2013` (Extremes): Total Crimson `#D21034`, Red Bull Navy `#0C2340`, Dakar Yellow `#FFCC00`

## Motion Principles
- **Side-Burst Cutouts**: Unboxed transparent race cars rocket onto the page from alternating edges (`±44vw`) using motorsport deceleration (`cubic-bezier(.16, 1, .3, 1)`), bleeding outward only so adjacent editorial specs are never obscured.
- **Reduced Motion**: All scroll-driven transforms and transitions degrade cleanly under `prefers-reduced-motion: reduce`.
