# Beads Protocol

Every major action writes a checkpoint bead to track progress, decisions, and enable rollback.

## Bead Format

```yaml
id: bead-NNNN
timestamp: ISO-8601
actor: claude-code
phase: [scaffold|data|ui|test|deploy]
repo: executiveusa/kupuri-recetario-vivo
branch: claude/exciting-hopper-uqtpx9
files_changed: [list]
decision: what was done
reason: why
rollback_command: git command to undo
risks: [list]
next_action: what comes next
human_needed: true/false
```

## Checkpoints

- 0001: Repo inventory
- 0002: Skill ingestion
- 0003: Inspiration site analysis
- 0004: Content extraction
- 0005: Content schema created
- 0006: Hero design system
- 0007: Flipbook UI
- 0008: Voice assistant
- 0009: Spanish localization
- 0010: Build/test result
- 0011: Browser verification
- 0012: PR/deploy status
