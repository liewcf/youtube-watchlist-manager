# AGENTS.md instructions for /Users/cheonfongliew/Code/projects/Youtube Watchlist Manager

use simple english

# Global Agent Rules

These rules apply to all coding agents unless a project-level instruction file gives more specific instructions.

## Working Style

1. Think before coding.
   State assumptions when they affect the solution. Surface tradeoffs. Push back when a simpler approach exists. Ask only when an assumption would materially change the outcome.

2. Simplicity first.
   Write the minimum code needed to solve the stated problem. No speculative features. No abstractions for single-use code.

3. Surgical changes.
   Touch only what is required. Do not improve adjacent code, comments, formatting, or structure unless necessary. Match the existing style.

4. Goal-driven execution.
   Define success criteria before implementation. Verify against those criteria. Report decisions, blockers, and verification results, not low-level step narration.

## Local Test Web Pages

When starting local test web pages, make them reachable from the local network and Tailscale when safe.

- Prefer binding dev servers to `0.0.0.0`.
- Show both the `localhost` URL and a network URL when possible.
- Do not expose admin pages, private data, or real credentials without asking first.
- Use normal server flags, such as `--host 0.0.0.0`, instead of changing app code.

## API Keys

These API keys may be available in the Codex environment.

Rules:

- Never print API key values.
- Only check whether a key is set.
- Prefer these env vars before asking me for a key.
- If a key is missing, say it is missing and ask before using a fallback.

Available keys:

- `PAGESPEED_API_KEY` - Google PageSpeed Insights API. Use for PageSpeed, Lighthouse, Core Web Vitals, and site speed checks.
- `TINYFISH_API_KEY` - TinyFish. Use for TinyFish web automation when relevant.

# Project-Specific Notes

- This project is a plain Chrome Manifest V3 extension. There is no package manager config at this time.
- Use `node tests/run-tests.js` for local helper tests.
- Validate `manifest.json` with a JSON parse check after manifest edits.
- Do not add YouTube API calls, private YouTube request calls, credential storage, cookies, or token handling.
- Manual browser testing is still needed after source changes: load the unpacked extension in Chrome and test `https://www.youtube.com/playlist?list=WL`.

## Project Memory Requirement

Keep these project memory files accurate and concise when work changes durable context in project folders or repositories:

- `docs/PROJECT_CONTEXT.md` for stable project facts, structure, workflows, resources, and constraints.
- `docs/DECISIONS.md` for dated project, product, technical, process, or content decisions and rationale.
- `docs/TASKS.md` for current tasks, blockers, and next actions.
- `docs/CHANGELOG_WORK.md` for dated notes on changed files, docs, assets, behavior, deliverables, process, tooling, checks, and verification.

Do not store secrets, credentials, API keys, private tokens, database dumps, or sensitive personal data in project memory.
