# Goal Spark AI (GoalPilot)

Turn ambitious goals into daily action with an AI planner, calendar, tasks, habits, and analytics in one focused workspace.

---

## ⚡ Quickstart in GitHub Codespaces

This repository includes a pre-configured, lightweight **Dev Container** optimized for GitHub Codespaces.

### 1. Launch Codespaces
Click **Code** > **Codespaces** > **Create codespace on main**.
- Container setup is automated via `.devcontainer/devcontainer.json`.
- Automatically uses a dedicated Node.js 22 image (boots in seconds).
- Pre-installs Tailwind CSS, TypeScript, and React extensions.
- Automatically opens and previews Port 3000.

### 2. Configure Your Gemini API Key (Optional)
If you have a Gemini API key:
```bash
cp .env.example .env
```
Add your key in `.env`:
```env
GEMINI_API_KEY=your_actual_key_here
```
*(If no API key is provided, the application runs seamlessly in Standby Mode with high-fidelity local plan generators).*

### 3. Start Development Server
```bash
npm run dev
```
The server will boot at `http://localhost:3000` and Codespaces will prompt you with an **Open in Browser** preview notification.

---

## 🛠️ Available Scripts

- `npm run dev` — Starts the Express + Vite development server on port 3000
- `npm run build` — Builds the Vite client and bundles the server to `dist/server.cjs`
- `npm run start` — Runs the compiled production build
- `npm run lint` — Runs TypeScript type checks (`tsc --noEmit`)

---

## 🏗️ Tech Stack
- **Frontend**: React 19, Tailwind CSS v4, TanStack Router & Query, Lucide Icons, Motion
- **Backend**: Express (Node.js) with Vite SPA middleware
- **AI Integration**: `@google/genai` TypeScript SDK with `gemini-3.7-flash` (server-side only)

