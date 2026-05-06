# FusionLive FLUX — UX Wireframe Prototype

A clickable wireframe / prototype exploring a redesigned UX for the FusionLive engineering document management system. This is a **UX mockup**, not production code — there is no real backend, auth, or persistence beyond `localStorage` for the theme.

## Getting Started

1. Run `npm install`
2. Run `npm run dev`
3. Open http://localhost:5173/

## Routes

| Path | Screen |
| --- | --- |
| `/` | Documents (folders + filters + grid) |
| `/packages` | Packages library, wizard, detail |
| `/chat` | Ask Flint chat with conversation history |
| `/document/:id` | Document detail |
| `/design-system` | Design system reference |

## Key UX changes vs current FusionLive

### Global chrome
- **FusionLive brand banner** — thin dark-blue banner pinned to the top of every page with the FusionLive wordmark in the top-right.
- **Left navigation rail** — collapsed icon rail expands on hover. Items: Dashboard, Documents, Packages, Workflows, Transmittals, Reports, Admin, Projects, Chat. The rest of the page dims when the rail expands so it stands out.
- **Active item routing** — Documents → `/`, Packages → `/packages`, Chat → `/chat`. All other items are placeholders in this prototype.
- **Appearance switcher** (gear icon at the bottom of the rail) — replaced the unfinished multi-palette picker with a simple **Light / Dark** mode toggle. Choice persists in `localStorage` and applies via a `data-theme="dark"` attribute on `<html>`.

### Documents view
- **Project picker moved into the folder/filter panel** (previously at the top of the document grid).
- **Removed redundant "Sort by" control** — the column headers already sort.
- **Compact grid header** — single-line "X documents found • Showing N" plus a smaller View button.
- **Aligned gutters** — equal narrow gap between left rail / folder panel / grid.

### Packages — new mental model
The biggest functional concept change. Today, FusionLive Work Packs are tightly coupled to a single folder (the folder is the source of truth, the pack is stored inside it, and contents are inferred from folder membership).

In this prototype, **Packages are flexible standalone Package Objects** that live in their own library, separate from the document folder structure.

The Packages area includes:

1. **Packages Library** (`/packages`)
   - Filterable table by status: Draft / In Review / Approved / Issued / Out of Date
   - Columns: Reference, Title, Status, Rev, Owner, Last updated, Docs count, Change state, Actions
   - Per-row actions: Open, Repackage, Issue/Transmit, Download PDF, Download ZIP

2. **Create Package wizard** (4 steps)
   - **Details** — reference, title, description, type, discipline, area, owner, due date
   - **Add documents** — modal with five sources: Folder browser, Search results, Saved view, Document register, Manual numbers. Demonstrates that a package can gather documents from anywhere in the project, not just one folder
   - **Organise** — reorder, render-vs-link toggle per doc, include/exclude, attachments and linked-doc options
   - **Review & generate** — summary and a Generate action

3. **Package detail** with tabs: Overview, Contents, Versions, Change Log, Distribution, Activity
   - **Repackage** action bumps revision and prepends a new version entry
   - **Distribution** tab offers: Send via transmittal, Start review workflow, Download PDF/ZIP, Share link

4. **Concept callout** in the library reinforces the message: folders organise *source* documents, Packages organise *deliverables*.

### Chat (Ask Flint)
- **Removed top "Exit Chat / Ask Flint" banner** — chat overlay reuses the global chrome.
- **Left rail visible on chat page** so users can navigate without exiting.
- **Conversation history sidebar** (similar to ChatGPT / Copilot / Gemini)
  - New chat button
  - Search chats
  - Pinned and Recent sections
  - Per-chat context menu: Pin / Unpin, Rename (inline), Delete
  - Collapsible — collapses to a thin 40px rail with New-chat and expand buttons
- **Seeded EDMS-flavoured example conversations** — TAG ↔ document associations, latest revisions, where-used queries, vendor datasheets, transmittal counts, hold points, redlines, etc. Selecting a conversation loads its history into the right pane and the user can continue typing.

## Tech

- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router
- Framer Motion
- Lucide icons

