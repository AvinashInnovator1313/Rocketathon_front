# Professor Stand-In — Frontend Application

> **"Preserve the professor's knowledge. Make it available to the student."**  
> An academic digital stand-in for university students asking questions late at night, before exams, or when the professor is unavailable.

---

## 1. Quick Start

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation & Development
```bash
# Navigate to the frontend directory
cd standin/frontend

# Install dependencies
npm install

# Start Vite development server (proxies /api to http://localhost:8000)
npm run dev
```
The application will be accessible at `http://localhost:5173`.

### Production Build
```bash
npm run build
npm run preview
```

---

## 2. Environment Variables

Create a `.env` or `.env.local` file in the `frontend` root to configure custom API routing:

```env
# Optional: Set custom backend base URL (defaults to Vite proxy '/api')
VITE_API_BASE_URL=http://localhost:8000
```

When `VITE_API_BASE_URL` is omitted, requests route through the Vite development proxy directly to `http://localhost:8000`.

---

## 3. Connecting to the Backend

The frontend connects to the FastAPI backend (`standin/backend` on port `8000`) through `src/api/client.ts`:

1. **`GET /api/health`**: Real-time status badge in the header displaying index count and active model.
2. **`POST /api/ask`**: Grounded slide RAG and pre-retrieval judgement rule evaluation.
3. **`POST /api/stt`**: Whisper speech-to-text for microphone audio questions.
4. **`POST /api/tts`**: Piper text-to-speech for realistic neural voice playback.
5. **`GET /api/rules`**: Pre-configured academic integrity and boundary rules.
6. **`POST /api/review`**: Student answer evaluation (`agree`, `disagree`, `should_escalate`).
7. **`GET /api/review`**: Honesty marks and student feedback log.

### Offline & Fallback Resilience (`mockApi.ts`)
If the FastAPI backend or local Ollama engine is not running, the application automatically activates its local course mock adapter (`mockApi.ts`):
- Clearly labeled as `Mock Mode (Offline Fallback)` in the header.
- Simulates realistic slide answers and escalation rules based on the syllabus.
- Never misrepresents mocked data as real.

---

## 4. Tab Structure (Reverse-Engineered from Wireframes)

| Icon / Tab | Wireframe Source | Purpose & Functionality |
| :--- | :--- | :--- |
| **Home** | Sidebar Icon 1 (House) | Welcoming academic landing hub, suggested questions from recent lectures, and professor overview. |
| **Chat & Ask** | Sidebar Icon 2 (Chat Bubble) | Conversational interface with 3px gold border cards, expandable slide sources, voice STT/TTS, and review marks. |
| **Knowledge Base** | Wireframe 1 (Books) | 8-card grid with category filter pills (`All`, `Teaching`, `Academic`, `Advice`, `Experience`, `FAQs`) and full search bar. |
| **History** | Wireframe 2 (Clock) | Chronological session archive with `Today`, `This Week`, and `Older` filter pills, search, resume, and delete. |
| **How It Works** | Wireframe 3 (Question Mark) | 5-stage knowledge pipeline flow, academic authority context, live `/api/rules` boundary cards, and green accent counseling banner. |
| **Settings** | Wireframe 4 (Sliders) | Student profile editing, light/dark theme toggle, TTS audio toggle, language select, and local data reset. |
| **Professor Profile** | Sidebar "DA" Badge | Academic credential drawer for Dr. Ahmed: office hours, weekly counseling window, and official email handoff. |

---

## 5. Design System & Theme Tokens

The UI implements two cohesive academic themes rooted in the wireframe's extracted palette:

- **Light Mode ("Library Morning")**:
  - Main Canvas: `#FFFAE7`
  - Sidebar: `#F6F0D8`
  - Active Tab Pill: `#EDF0DB`
  - Card Surface: `#FFFCF3`
  - Dark Brand Accent: `#372E31`
  - Primary Navy: `#1B2A4A`
  - Antique Gold: `#B08A3E` (Text contrast: `#7A5C1E` for WCAG AA compliance)
  - Toggle Switch Green: `#A6BC69`
- **Dark Mode ("Library After Hours")**:
  - Main Canvas: `#0E1526`
  - Sidebar: `#111A30`
  - Card Surface: `#151E36`
  - Elevated Cards: `#1D2848`
  - Gold Accent: `#D4AF63`
  - Muted Text: `#9AA6BD`

### Typography
- **Headings & Greetings**: *Newsreader* (Classical Academic Serif)
- **UI & Body**: *Inter*
- **Code Blocks**: *JetBrains Mono* (CS student syntax highlighting with copy action)

---

## 6. Dynamic Professor Configuration

To swap professors without code changes, update `src/config/professor.config.ts`:

```typescript
export const defaultProfessor: ProfessorConfig = {
  name: "Dr. Ahmed",
  initials: "DA",
  title: "Associate Professor of Computer Science",
  department: "Department of Computer Science",
  email: "m.saleem@duet.edu.pk",
  officeHours: "Tuesday & Thursday: 2:00 PM – 4:00 PM",
  freeWindowWeekly: "3 to 4 hours weekly",
  ...
};
```
