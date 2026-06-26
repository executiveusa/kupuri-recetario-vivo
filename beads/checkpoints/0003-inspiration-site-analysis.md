---
id: bead-0003
timestamp: 2026-06-25T22:37:00Z
actor: claude-code
phase: design
repo: executiveusa/kupuri-recetario-vivo
branch: claude/exciting-hopper-uqtpx9
files_changed: [src/lib/theme.ts]
decision: Established visual system based on Sandra Sii inspiration
reason: Create Awwwards-worthy cookbook design language
rollback_command: git checkout HEAD -- src/lib/theme.ts
risks: [No real photos yet, using gradient placeholders]
next_action: Build hero component
human_needed: false
---

## Inspiration Analysis

Source: cook.sandrasii.com

### Borrowed Concepts
- Black top navigation bar
- Photography-first hero grid
- Hover-reveal recipe labels
- Awards-quality minimalism
- Google Fonts: Raleway + Lato

### Adapted for Recetario Vivo
- Dark hero (#050505) transitions to warm paper (#F8F1E4)
- Mexican cookbook color palette: tomato, chile, corn, herb
- Third font: Lora for recipe reading mode
- Interactive tile grid with colored gradients (no real photos yet)
- Voice dock in hero
- Status chips for app capabilities
