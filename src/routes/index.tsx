import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Sparkles,
  ArrowRight,
  Brain,
  Calendar,
  ListChecks,
  Target,
  LineChart,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Flame,
  Clock,
  ChevronDown,
  ChevronRight,
  Layers,
  BarChart3,
  Compass,
  Check,
  Star,
  Award,
  Play,
  RotateCcw,
  Sliders,
  CheckCheck,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// Preset simulated goals for the interactive roadmap explorer
const SAMPLE_ROADMAPS = [
  {
    id: "interview",
    title: "Master Google & FAANG Coding Interviews",
    timeframe: "90 Days · 3 Sprints",
    category: "Study & Career",
    badgeColor: "bg-primary/20 text-primary border-primary/30",
    icon: "💻",
    description:
      "Structured curriculum covering data structures, algorithmic patterns, distributed system design, and behavioral frameworks.",
    months: [
      {
        title: "Month 1: Core Fundamentals & Patterns",
        tag: "Days 1–30",
        items: [
          "Arrays, Two Pointers, & Sliding Window Mastery (20 Problems)",
          "Binary Search Variations & Fast/Slow Pointers",
          "HashMaps, Monotonic Stacks, & Priority Queues",
          "Weekly Milestone: Complete 40 LeetCode Mediums with timed 25m limits",
        ],
      },
      {
        title: "Month 2: Advanced Structures & Dynamic Programming",
        tag: "Days 31–60",
        items: [
          "Binary Trees, BFS/DFS Traversals, & Lowest Common Ancestor",
          "Graph Algorithms: Dijkstra, Topological Sort, Union-Find",
          "1D & 2D Dynamic Programming (Knapsack, LCS, Edit Distance)",
          "Weekly Milestone: 3 Full Mock Interviews on Pramp with live feedback",
        ],
      },
      {
        title: "Month 3: System Design & Mock Sprints",
        tag: "Days 61–90",
        items: [
          "Distributed Architecture: Sharding, Caching, Rate Limiters, & Kafka",
          "Designing URL Shortener, WhatsApp, & Distributed Web Crawler",
          "Google Behavioral Leadership & STAR Story Matrix",
          "Final Benchmark: Score >85% on 5 Consecutive Timed Mock Rounds",
        ],
      },
    ],
    dailyHabits: [
      { name: "Solve 2 LeetCode Mediums", time: "07:00 - 08:30" },
      { name: "Review System Design Chapter", time: "19:00 - 20:00" },
    ],
  },
  {
    id: "saas",
    title: "Build & Launch SaaS to $5k MRR",
    timeframe: "60 Days · 2 Sprints",
    category: "Engineering & Business",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    icon: "🚀",
    description:
      "End-to-end entrepreneurial sprint from problem discovery interviews to MVP deployment, Stripe billing, and Product Hunt debut.",
    months: [
      {
        title: "Month 1: Validation & MVP Build",
        tag: "Days 1–30",
        items: [
          "Conduct 15 User Discovery Calls with target buyers",
          "Figma design system & core user onboarding flow",
          "Build full-stack backend, database schemas, & auth",
          "Integrate Stripe Subscriptions & Webhook idempotency",
        ],
      },
      {
        title: "Month 2: Beta Testing & Public Launch",
        tag: "Days 31–60",
        items: [
          "Private Beta with 25 users; collect quantitative feedback",
          "Build automated email onboarding & telemetry dashboard",
          "Product Hunt launch kit (demo video, badges, maker story)",
          "Cold outreach to 200 high-intent LinkedIn prospects",
        ],
      },
    ],
    dailyHabits: [
      { name: "90m Deep Work Coding Sprint", time: "09:00 - 10:30" },
      { name: "Engage with 10 Target Users online", time: "16:00 - 16:45" },
    ],
  },
  {
    id: "marathon",
    title: "Run a Sub-3:30 Marathon",
    timeframe: "16 Weeks · 4 Tiers",
    category: "Health & Endurance",
    badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    icon: "🏃",
    description:
      "Periodized aerobic stamina development, tempo lactate thresholds, nutrition strategies, and peaking for race day.",
    months: [
      {
        title: "Phase 1: Aerobic Base & Mobility",
        tag: "Weeks 1–4",
        items: [
          "Establish 40km weekly volume in strict Zone 2 heart rate",
          "Cadence training at 175-180 SPM to minimize impact fatigue",
          "Bi-weekly glute and hip stabilizer strength sessions",
          "Weekly Benchmark: 15km easy-pace continuous weekend run",
        ],
      },
      {
        title: "Phase 2: Lactate Threshold & Tempo",
        tag: "Weeks 5–8",
        items: [
          "6x 800m track intervals at 4:30/km goal race pace",
          "Progress weekly mileage to 60km with mid-week tempo runs",
          "Electrolyte & carb gel fueling strategy testing during runs",
          "Weekly Benchmark: Half-marathon time trial under 1:40:00",
        ],
      },
      {
        title: "Phase 3: Peak Long Runs & Taper",
        tag: "Weeks 9–16",
        items: [
          "Peak 32km long run simulation with full race gear",
          "3-week systematic taper to restore glycogen and muscle freshness",
          "Carb-loading protocol and mental visualization routines",
          "Race Day: Execute negative splits for sub-3:30:00 finish",
        ],
      },
    ],
    dailyHabits: [
      { name: "Morning Aerobic Run / Mobility", time: "06:00 - 07:15" },
      { name: "3L Hydration + Magnesium Recovery", time: "All Day" },
    ],
  },
  {
    id: "mindfulness",
    title: "Digital Detox & Peak Daily Energy",
    timeframe: "30 Days · 1 Sprint",
    category: "Mindset & Habits",
    badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    icon: "🧘",
    description:
      "Reset dopamine pathways, establish non-negotiable morning rituals, and reclaim 3+ hours of focused deep work every single day.",
    months: [
      {
        title: "Full 30-Day Protocol",
        tag: "Days 1–30",
        items: [
          "06:30 Sunrise wakeup + 10m diaphragmatic breathwork",
          "Zero screen exposure or notification checking before 08:30",
          "90-minute daily uninterrupted focus block in aircraft mode",
          "Evening digital sunset: devices docked outside bedroom at 21:30",
        ],
      },
    ],
    dailyHabits: [
      { name: "10-Minute Morning Meditation", time: "06:45 - 07:00" },
      { name: "Nightly Reflection Journaling", time: "21:30 - 21:45" },
    ],
  },
];

export default function LandingPage() {
  const [selectedRoadmap, setSelectedRoadmap] = useState(SAMPLE_ROADMAPS[0]);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "yearly",
  );
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Interactive mockup task states
  const [mockTasks, setMockTasks] = useState([
    {
      id: 1,
      title: "Solve Binary Search on 2D Matrix (LeetCode 74)",
      time: "07:00 - 08:30",
      tag: "Deep Work",
      done: true,
    },
    {
      id: 2,
      title: "Review Distributed Cache Architecture (Redis vs Memcached)",
      time: "10:00 - 11:30",
      tag: "System Design",
      done: true,
    },
    {
      id: 3,
      title: "Conduct 45m Pramp Mock Interview with Peer",
      time: "14:00 - 15:00",
      tag: "Live Mock",
      done: false,
    },
    {
      id: 4,
      title: "Zone 2 Aerobic Run (5km) + Post-Run Stretch",
      time: "17:30 - 18:30",
      tag: "Health",
      done: false,
    },
  ]);

  const toggleMockTask = (id: number) => {
    setMockTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  };

  const completedCount = mockTasks.filter((t) => t.done).length;
  const mockProgressPercent = Math.round(
    (completedCount / mockTasks.length) * 100,
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/30">
      {/* 1. STICKY BLUR NAVIGATION */}
      <header className="sticky top-0 z-50 border-b border-border/60 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="size-9 rounded-xl gradient-brand grid place-items-center shadow-lg shadow-primary/30 ring-1 ring-white/20 transition-transform group-hover:scale-105">
              <Sparkles className="size-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-xl tracking-tight bg-linear-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
                GoalPilot
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a
              href="#features"
              className="hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#interactive-demo"
              className="hover:text-foreground transition-colors"
            >
              Interactive Planner
            </a>
            <a
              href="#how-it-works"
              className="hover:text-foreground transition-colors"
            >
              How It Works
            </a>
            <a
              href="#comparison"
              className="hover:text-foreground transition-colors"
            >
              Why GoalPilot
            </a>
            <a
              href="#pricing"
              className="hover:text-foreground transition-colors"
            >
              Pricing
            </a>
            <a href="#faq" className="hover:text-foreground transition-colors">
              FAQ
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link to="/auth">
              <Button
                variant="ghost"
                size="sm"
                className="font-medium text-muted-foreground hover:text-foreground"
              >
                Sign In
              </Button>
            </Link>
            <Link to="/app">
              <Button
                size="sm"
                className="rounded-full gradient-brand text-white font-semibold shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/35 transition"
              >
                Open Workspace <ArrowRight className="size-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative pt-16 sm:pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 size-162.5 rounded-full bg-primary/15 blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 size-87.5 rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-6 relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-xs font-semibold text-primary shadow-xs">
            <Sparkles className="size-3.5" /> Powered by Gemini Intelligence ·
            90-Day Milestone Deconstructor
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.08]">
            Turn Any Ambitious Goal into{" "}
            <span className="bg-linear-to-r from-primary via-purple-400 to-emerald-400 bg-clip-text text-transparent">
              Daily Actionable Flow
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Stop letting ambitious goals get lost in chaotic to-do lists.
            GoalPilot automatically breaks high-level aspirations into
            structured monthly milestones, weekly sprints, and auto-scheduled
            daily focus blocks.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/app" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto rounded-full gradient-brand text-white font-bold px-9 h-12 text-base shadow-xl shadow-primary/30 hover:scale-[1.02] transition-transform"
              >
                Launch Live Workspace <ArrowRight className="size-4 ml-2" />
              </Button>
            </Link>
            <a href="#interactive-demo" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto rounded-full border-border/80 hover:bg-muted/40 font-medium h-12 text-base"
              >
                <Play className="size-4 mr-2 text-primary" /> Test Interactive
                Demo
              </Button>
            </a>
          </div>

          {/* Trust proof points */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-emerald-500" /> Free demo
              with full features
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-primary" /> 100% Offline
              client-side persistence
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="size-4 text-amber-500" /> Instant zero-latency
              roadmap generation
            </span>
          </div>

          {/* 3. HERO INTERACTIVE APP MOCKUP PREVIEW */}
          <div className="pt-10 max-w-5xl mx-auto">
            <div className="rounded-2xl border border-border/70 bg-card/90 shadow-2xl overflow-hidden backdrop-blur-xl ring-1 ring-white/10">
              {/* Window Controls Header */}
              <div className="px-4 py-3 bg-muted/40 border-b border-border/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-red-500/80" />
                  <div className="size-3 rounded-full bg-amber-500/80" />
                  <div className="size-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-muted-foreground ml-2 font-semibold">
                    GoalPilot Workspace — Live Simulation
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="inline-block size-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono">Sync: Active</span>
                </div>
              </div>

              {/* Mock App Content Area */}
              <div className="p-5 sm:p-7 space-y-6 text-left">
                {/* Active Goal Header Banner */}
                <div className="p-4 sm:p-5 rounded-xl border border-primary/30 bg-primary/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-primary text-white text-[11px] font-semibold">
                        Active 90-Day Sprint
                      </Badge>
                      <span className="text-xs text-muted-foreground font-mono">
                        Target: 65 Days Remaining
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-lg text-foreground">
                      Prepare for Google Senior SWE Interview (90 Days)
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Current Milestone: Month 2 — Binary Trees, Dynamic
                      Programming & Graph BFS/DFS
                    </p>
                  </div>
                  <div className="sm:text-right shrink-0 space-y-1">
                    <div className="text-2xl font-bold font-mono text-primary">
                      {mockProgressPercent}%
                    </div>
                    <p className="text-[11px] text-muted-foreground font-medium">
                      Daily Focus Velocity
                    </p>
                  </div>
                </div>

                {/* Grid: Interactive Today Schedule + Habit Tracker */}
                <div className="grid md:grid-cols-3 gap-5">
                  {/* Left 2 Cols: Today's Interactive Timeblock Checklist */}
                  <div className="md:col-span-2 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                        <Clock className="size-3.5 text-primary" /> Today's
                        Scheduled Time-Blocks
                      </h4>
                      <span className="text-xs text-muted-foreground font-mono">
                        {completedCount} of {mockTasks.length} Completed (Click
                        to Toggle)
                      </span>
                    </div>

                    <div className="space-y-2">
                      {mockTasks.map((t) => (
                        <div
                          key={t.id}
                          onClick={() => toggleMockTask(t.id)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                            t.done
                              ? "bg-muted/30 border-emerald-500/30 text-muted-foreground"
                              : "bg-card/70 border-border hover:border-primary/40 hover:bg-muted/20"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div
                              className={`size-5 rounded-md border grid place-items-center transition-colors ${
                                t.done
                                  ? "bg-emerald-500 border-emerald-500 text-white"
                                  : "border-border bg-background"
                              }`}
                            >
                              {t.done && (
                                <Check className="size-3.5 stroke-3" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <p
                                className={`text-xs font-semibold truncate ${t.done ? "line-through opacity-75" : "text-foreground"}`}
                              >
                                {t.title}
                              </p>
                              <span className="text-[10px] font-mono text-muted-foreground">
                                {t.time}
                              </span>
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className="text-[10px] shrink-0 font-medium"
                          >
                            {t.tag}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Col: Mini Habit & Copilot Widget */}
                  <div className="space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                        <Flame className="size-3.5 text-amber-500" /> Active
                        Streaks
                      </h4>

                      <div className="p-3 rounded-xl border border-border/70 bg-card/60 space-y-2.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold flex items-center gap-1.5">
                            <span>💻</span> Daily 90m DSA Practice
                          </span>
                          <span className="font-mono font-bold text-amber-500">
                            8d streak
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold flex items-center gap-1.5">
                            <span>🏃</span> Morning 5k Aerobic Run
                          </span>
                          <span className="font-mono font-bold text-amber-500">
                            12d streak
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold flex items-center gap-1.5">
                            <span>🧘</span> Evening Mindful Journal
                          </span>
                          <span className="font-mono font-bold text-amber-500">
                            21d streak
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Copilot insight */}
                    <div className="p-3 rounded-xl border border-primary/20 bg-primary/5 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-primary">
                        <Sparkles className="size-3" /> Copilot Recommendation
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        "Great pace on sliding window problems today. Tomorrow's
                        dynamic programming session is scheduled for 19:00 with
                        zero conflicts."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE ROADMAP EXPLORER (TRY BEFORE YOU SIGN UP) */}
      <section
        id="interactive-demo"
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
      >
        <div className="text-center space-y-3 mb-12">
          <Badge className="bg-primary/20 text-primary border-primary/30">
            Interactive Roadmap Deconstructor
          </Badge>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight">
            See How GoalPilot Deconstructs Any Ambition
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Select a real-world scenario below to see how our AI decomposes
            high-level goals into multi-tier progressive milestones and
            non-repeating daily focus sprints.
          </p>
        </div>

        {/* Preset Selector Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
          {SAMPLE_ROADMAPS.map((sample) => (
            <button
              key={sample.id}
              onClick={() => setSelectedRoadmap(sample)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all flex items-center gap-2 ${
                selectedRoadmap.id === sample.id
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/25"
                  : "bg-card/70 border-border text-muted-foreground hover:text-foreground hover:bg-muted/40"
              }`}
            >
              <span>{sample.icon}</span>
              <span>{sample.title}</span>
            </button>
          ))}
        </div>

        {/* Active Roadmap Detailed Display */}
        <div className="rounded-2xl border border-border/80 bg-card/70 backdrop-blur-md p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/60 pb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{selectedRoadmap.icon}</span>
                <h3 className="font-display font-bold text-xl text-foreground">
                  {selectedRoadmap.title}
                </h3>
                <Badge className={selectedRoadmap.badgeColor}>
                  {selectedRoadmap.timeframe}
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-3xl">
                {selectedRoadmap.description}
              </p>
            </div>

            <Link to="/app/planner">
              <Button
                size="sm"
                className="rounded-full gradient-brand text-white font-semibold shrink-0 shadow-md shadow-primary/20"
              >
                Plan Custom Goal with AI{" "}
                <ArrowRight className="size-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>

          {/* Monthly Milestone Tiers */}
          <div className="grid md:grid-cols-3 gap-5">
            {selectedRoadmap.months.map((m, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border border-border/60 bg-muted/20 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-primary font-mono uppercase tracking-wider">
                    {m.tag}
                  </span>
                  <Badge variant="outline" className="text-[10px]">
                    Tier {idx + 1}
                  </Badge>
                </div>
                <h4 className="font-display font-bold text-sm text-foreground">
                  {m.title}
                </h4>
                <ul className="space-y-2 pt-1">
                  {m.items.map((item, iIdx) => (
                    <li
                      key={iIdx}
                      className="text-xs text-muted-foreground flex items-start gap-2"
                    >
                      <Check className="size-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Daily Habits Generated */}
          <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg gradient-brand grid place-items-center text-white shrink-0">
                <Target className="size-4" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-foreground">
                  Auto-Generated Daily Routines & Sprints
                </h5>
                <p className="text-[11px] text-muted-foreground">
                  Synced directly into your calendar without overlapping with
                  existing commitments.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {selectedRoadmap.dailyHabits.map((h, hIdx) => (
                <div
                  key={hIdx}
                  className="px-3 py-1.5 rounded-lg bg-card border border-border/80 text-xs font-medium flex items-center gap-2"
                >
                  <span className="text-foreground">{h.name}</span>
                  <span className="text-[10px] font-mono text-muted-foreground font-semibold">
                    ({h.time})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. 6-PILLAR FEATURE BENTO GRID */}
      <section
        id="features"
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
      >
        <div className="text-center space-y-3 mb-14">
          <Badge className="bg-primary/20 text-primary border-primary/30">
            Architecture & Features
          </Badge>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight">
            Engineered for Unrelenting Execution
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            A cohesive productivity operating system replacing disjointed note
            apps, reminder lists, and generic calendars.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={Brain}
            title="AI Roadmap Architect"
            desc="Input any goal in plain English. Gemini generates progressive multi-month milestones, weekly themes, and distinct daily micro-tasks with Sunday rest days."
            gradient="from-purple-500/20 to-pink-500/10"
            border="border-purple-500/30"
          />

          <FeatureCard
            icon={Calendar}
            title="Intelligent Time-Block Calendar"
            desc="Automatically schedules focus blocks into your actual week. Calculates next available time slots, resolves conflicts, and groups tasks by category themes."
            gradient="from-blue-500/20 to-cyan-500/10"
            border="border-blue-500/30"
          />

          <FeatureCard
            icon={ListChecks}
            title="Execution Velocity & Task Filters"
            desc="Filter by Today, Tomorrow, Priority, and Goal alignment. Avoid cognitive overload with high-impact 3-task daily focus recommendations."
            gradient="from-emerald-500/20 to-teal-500/10"
            border="border-emerald-500/30"
          />

          <FeatureCard
            icon={Flame}
            title="Compound Habit Tracking Engine"
            desc="Track streaks, weekly compliance trends, and best streaks with 1-tap check-ins. Watch micro-routines compound into life-changing mastery."
            gradient="from-amber-500/20 to-orange-500/10"
            border="border-amber-500/30"
          />

          <FeatureCard
            icon={LineChart}
            title="Productivity Analytics & Heatmaps"
            desc="Visualize completion velocity, time allocation breakdowns across Work, Study, Health, and Personal, and GitHub-style 30-day activity heatmaps."
            gradient="from-indigo-500/20 to-violet-500/10"
            border="border-indigo-500/30"
          />

          <FeatureCard
            icon={Sliders}
            title="Continuous AI Copilot & Rescheduling"
            desc="Fell behind on a sprint or missed a day? Ask the assistant in real-time to redistribute remaining milestones across your updated timeline."
            gradient="from-rose-500/20 to-red-500/10"
            border="border-rose-500/30"
          />
        </div>
      </section>

      {/* 6. HOW IT WORKS (3-STEP JOURNEY) */}
      <section
        id="how-it-works"
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-border/60"
      >
        <div className="text-center space-y-3 mb-14">
          <Badge className="bg-primary/20 text-primary border-primary/30">
            The 3-Step Flow
          </Badge>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight">
            From Vague Wish to Completed Milestone
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            How GoalPilot bridges the gap between high-level ambition and daily
            execution.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="p-6 rounded-2xl border border-border/70 bg-card/60 space-y-4 relative">
            <div className="size-12 rounded-xl gradient-brand text-white font-display font-extrabold text-lg grid place-items-center shadow-md shadow-primary/25">
              1
            </div>
            <h3 className="font-display font-bold text-lg text-foreground">
              1. Declare Your North Star
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Describe what you want to accomplish—from passing a technical
              certification to running a marathon or shipping an app—with your
              target timeframe.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border/70 bg-card/60 space-y-4 relative">
            <div className="size-12 rounded-xl gradient-brand text-white font-display font-extrabold text-lg grid place-items-center shadow-md shadow-primary/25">
              2
            </div>
            <h3 className="font-display font-bold text-lg text-foreground">
              2. Deconstruct & Schedule
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              GoalPilot structures the goal into progressive 30-day stages,
              weekly topics, and concrete daily focus blocks, automatically
              mapped into your calendar.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border/70 bg-card/60 space-y-4 relative">
            <div className="size-12 rounded-xl gradient-brand text-white font-display font-extrabold text-lg grid place-items-center shadow-md shadow-primary/25">
              3
            </div>
            <h3 className="font-display font-bold text-lg text-foreground">
              3. Execute in Pure Flow
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Open your dashboard every morning with zero decision fatigue. Know
              exactly what to work on, check off tasks, and build momentum with
              streak tracking.
            </p>
          </div>
        </div>
      </section>

      {/* 7. COMPARISON TABLE: TRADITIONAL TO-DO APPS VS GOALPILOT */}
      <section
        id="comparison"
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full"
      >
        <div className="text-center space-y-3 mb-14">
          <Badge className="bg-primary/20 text-primary border-primary/30">
            Direct Comparison
          </Badge>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight">
            Why Standard To-Do Apps Fail for Ambitious Goals
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Traditional checklist apps only manage short-term chores. GoalPilot
            is designed for long-range achievement.
          </p>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card/70 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-border/60 bg-muted/40">
                  <th className="p-4 sm:p-5 font-semibold text-muted-foreground">
                    Capabilities & Architecture
                  </th>
                  <th className="p-4 sm:p-5 font-semibold text-muted-foreground">
                    Generic To-Do Lists (Notion, Todoist)
                  </th>
                  <th className="p-4 sm:p-5 font-bold text-primary bg-primary/10">
                    GoalPilot System
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-foreground">
                    Goal Deconstruction
                  </td>
                  <td className="p-4 sm:p-5 text-muted-foreground">
                    Manual guesswork; user must research every sub-step
                  </td>
                  <td className="p-4 sm:p-5 text-emerald-400 font-semibold bg-primary/5 flex items-center gap-2">
                    <Check className="size-4 text-emerald-500" /> AI Progressive
                    Sprints & Milestone Deconstruction
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-foreground">
                    Time-Blocking & Calendar
                  </td>
                  <td className="p-4 sm:p-5 text-muted-foreground">
                    Separate disconnected app or manual Google Calendar entry
                  </td>
                  <td className="p-4 sm:p-5 text-emerald-400 font-semibold bg-primary/5 flex items-center gap-2">
                    <Check className="size-4 text-emerald-500" /> Integrated
                    Smart Time-Blocking with Conflict Avoidance
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-foreground">
                    Handling Missed Days
                  </td>
                  <td className="p-4 sm:p-5 text-muted-foreground">
                    Overdue red badge anxiety; tasks pile up endlessly
                  </td>
                  <td className="p-4 sm:p-5 text-emerald-400 font-semibold bg-primary/5 flex items-center gap-2">
                    <Check className="size-4 text-emerald-500" /> Intelligent
                    1-Tap Sched-Rebalancing with Copilot
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-foreground">
                    Habit & Routine Synergy
                  </td>
                  <td className="p-4 sm:p-5 text-muted-foreground">
                    Requires dedicated second habit tracker subscription
                  </td>
                  <td className="p-4 sm:p-5 text-emerald-400 font-semibold bg-primary/5 flex items-center gap-2">
                    <Check className="size-4 text-emerald-500" /> Unified
                    Streaks, Heatmaps & Habit Check-ins
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-foreground">
                    Data Privacy & Offline
                  </td>
                  <td className="p-4 sm:p-5 text-muted-foreground">
                    Heavy cloud lock-in with slow page loading
                  </td>
                  <td className="p-4 sm:p-5 text-emerald-400 font-semibold bg-primary/5 flex items-center gap-2">
                    <Check className="size-4 text-emerald-500" /> Instant Local
                    Storage + Zero Latency SPA
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS & SOCIAL PROOF */}
      <section
        id="testimonials"
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
      >
        <div className="text-center space-y-3 mb-14">
          <Badge className="bg-primary/20 text-primary border-primary/30">
            User Outcomes
          </Badge>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight">
            Built for Serious Achievers
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            See how high-agency professionals use GoalPilot to conquer ambitious
            90-day targets.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <TestimonialCard
            name="David Chen"
            role="Staff Software Engineer"
            avatar="DC"
            stars={5}
            goal="Passed Google L6 Interview in 90 Days"
            quote="GoalPilot deconstructed LeetCode and System Design into exact daily 90-minute blocks. Having the calendar time-blocks pre-arranged eliminated all decision fatigue."
          />
          <TestimonialCard
            name="Elena Rostova"
            role="Founder & Solo Builder"
            avatar="ER"
            stars={5}
            goal="Shipped SaaS MVP in 6 Weeks"
            quote="Instead of drowning in an amorphous backlog, GoalPilot gave me a 4-tier milestone roadmap. We launched on Product Hunt on the exact target date."
          />
          <TestimonialCard
            name="Marcus Vance"
            role="Triathlete & Consultant"
            avatar="MV"
            stars={5}
            goal="Sub-3:30 Marathon & Peak Habit Streaks"
            quote="The combination of habit tracking with periodized training milestones was game-changing. Kept a 28-day streak and smashed my PR by 14 minutes."
          />
        </div>
      </section>

      {/* 9. PRICING SECTION */}
      <section
        id="pricing"
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full border-t border-border/60"
      >
        <div className="text-center space-y-3 mb-12">
          <Badge className="bg-primary/20 text-primary border-primary/30">
            Transparent Plans
          </Badge>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight">
            Invest in Your Execution Velocity
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Start completely free with unlimited demo workspaces, or upgrade for
            full AI Copilot sync.
          </p>

          {/* Monthly / Yearly Toggle */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <span
              className={`text-xs font-semibold ${billingCycle === "monthly" ? "text-foreground" : "text-muted-foreground"}`}
            >
              Monthly
            </span>
            <button
              onClick={() =>
                setBillingCycle((b) => (b === "monthly" ? "yearly" : "monthly"))
              }
              className="w-12 h-6 rounded-full bg-muted p-0.5 border border-border transition-colors relative"
            >
              <div
                className={`size-5 rounded-full gradient-brand transition-transform ${
                  billingCycle === "yearly" ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
            <span
              className={`text-xs font-semibold flex items-center gap-1.5 ${billingCycle === "yearly" ? "text-foreground" : "text-muted-foreground"}`}
            >
              Yearly{" "}
              <Badge className="bg-emerald-500/20 text-emerald-400 text-[10px]">
                Save 25%
              </Badge>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {/* Free Tier */}
          <div className="p-6 sm:p-7 rounded-2xl border border-border/80 bg-card/60 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <Badge variant="outline" className="text-xs">
                Starter Tier
              </Badge>
              <div>
                <div className="text-3xl font-extrabold font-display text-foreground">
                  $0
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Free forever · No credit card required
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="size-4 text-emerald-500" /> Unlimited goals
                  & milestones
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-4 text-emerald-500" /> Smart time-block
                  calendar
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-4 text-emerald-500" /> Daily habit
                  streaks & logs
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-4 text-emerald-500" /> 100% Client-side
                  local persistence
                </li>
              </ul>
            </div>

            <Link to="/app">
              <Button
                variant="outline"
                className="w-full rounded-xl font-semibold"
              >
                Get Started Free
              </Button>
            </Link>
          </div>

          {/* Pro Tier (Featured) */}
          <div className="p-6 sm:p-7 rounded-2xl border-2 border-primary bg-card/90 shadow-2xl relative flex flex-col justify-between space-y-6 ring-1 ring-primary/40">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full gradient-brand text-white text-[11px] font-bold shadow-md">
              Most Popular
            </div>

            <div className="space-y-4">
              <Badge className="bg-primary text-white text-xs">Pilot Pro</Badge>
              <div>
                <div className="text-3xl font-extrabold font-display text-foreground">
                  {billingCycle === "yearly" ? "$9" : "$12"}
                  <span className="text-xs font-normal text-muted-foreground">
                    / month
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Billed{" "}
                  {billingCycle === "yearly" ? "annually ($108/yr)" : "monthly"}
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-foreground">
                <li className="flex items-center gap-2">
                  <Check className="size-4 text-emerald-500" /> Everything in
                  Starter
                </li>
                <li className="flex items-center gap-2 font-semibold text-primary">
                  <Sparkles className="size-4 text-primary" /> Unlimited Gemini
                  AI Roadmap Sprints
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-4 text-emerald-500" /> Real-time
                  intelligent auto-rescheduling
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-4 text-emerald-500" /> Deep
                  productivity velocity analytics
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-4 text-emerald-500" /> Category-based
                  deep work tags
                </li>
              </ul>
            </div>

            <Link to="/app">
              <Button className="w-full rounded-xl gradient-brand text-white font-bold shadow-lg shadow-primary/30 hover:shadow-primary/40">
                Launch Pro Workspace <ArrowRight className="size-4 ml-1.5" />
              </Button>
            </Link>
          </div>

          {/* Lifetime Tier */}
          <div className="p-6 sm:p-7 rounded-2xl border border-border/80 bg-card/60 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <Badge variant="outline" className="text-xs">
                Lifetime Access
              </Badge>
              <div>
                <div className="text-3xl font-extrabold font-display text-foreground">
                  $199
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  One-time payment · Lifetime updates
                </p>
              </div>
              <ul className="space-y-2.5 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="size-4 text-emerald-500" /> Lifetime access
                  to all Pro features
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-4 text-emerald-500" /> Priority access
                  to future AI models
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-4 text-emerald-500" /> Dedicated
                  concierge onboarding
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-4 text-emerald-500" /> Exclusive
                  founder community badge
                </li>
              </ul>
            </div>

            <Link to="/app">
              <Button
                variant="outline"
                className="w-full rounded-xl font-semibold"
              >
                Get Lifetime License
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 10. FREQUENTLY ASKED QUESTIONS ACCORDION */}
      <section
        id="faq"
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full"
      >
        <div className="text-center space-y-3 mb-14">
          <Badge className="bg-primary/20 text-primary border-primary/30">
            FAQ
          </Badge>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-muted-foreground">
            Everything you need to know about GoalPilot architecture and
            workflows.
          </p>
        </div>

        <div className="space-y-3">
          {[
            {
              q: "How does GoalPilot create 90-day progressive roadmaps?",
              a: "GoalPilot pairs Gemini intelligence with periodized curriculum engineering. When you enter a goal, our backend analyzes domain difficulty, divides it into progressive monthly milestones, weekly thematic sprints, and outputs concrete daily focus tasks that avoid repetitive filler.",
            },
            {
              q: "Does GoalPilot work offline?",
              a: "Yes! All your tasks, goals, habit logs, and calendar events are stored client-side in persistent local state. You can view, check off, and manage your entire workspace seamlessly even without an internet connection.",
            },
            {
              q: "What happens if I miss a day or fall behind schedule?",
              a: "Unlike traditional checklist apps that penalize you with red overdue badges, GoalPilot's AI Copilot allows you to rebalance your roadmap with 1 click. It recalculates the timeline and evenly redistributes remaining focus blocks across upcoming weeks.",
            },
            {
              q: "Can I customize categories and daily focus times?",
              a: "Yes. GoalPilot includes full customization for work, study, personal, health, and meeting categories with dedicated color themes and default time slot preferences.",
            },
            {
              q: "Can I try GoalPilot without signing up?",
              a: "Absolutely. Click 'Open Workspace' or 'Explore Demo' anywhere on this page to jump straight into a fully populated sandbox workspace with zero signup friction.",
            },
          ].map((item, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-border/70 bg-card/60 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm text-foreground hover:bg-muted/30 transition-colors"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`size-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180 text-primary" : ""}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/40">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 11. GRAND FINAL CTA BANNER */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="rounded-3xl gradient-brand p-8 sm:p-14 text-center text-white space-y-6 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 size-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/20 text-xs font-bold text-white shadow-xs">
            <Sparkles className="size-3.5" /> Start Your Next 90-Day Sprint
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight max-w-2xl mx-auto leading-tight">
            Stop Dreaming About Your Goals. Start Executing Them Daily.
          </h2>

          <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto leading-relaxed">
            Experience the productivity workspace that turns high-level vision
            into automatic, uninterrupted daily execution.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/app" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto rounded-full bg-white text-foreground hover:bg-white/90 font-bold px-9 shadow-xl text-base"
              >
                Launch Workspace Now{" "}
                <ArrowRight className="size-4 ml-2 text-primary" />
              </Button>
            </Link>
            <Link to="/auth" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto rounded-full border-white/40 text-white hover:bg-white/10 font-semibold text-base"
              >
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 12. EXPANSIVE FOOTER */}
      <footer className="mt-auto border-t border-border/60 bg-muted/20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 mb-10 text-xs">
          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-xl gradient-brand grid place-items-center text-white shadow-md shadow-primary/20">
                <Sparkles className="size-4" />
              </div>
              <span className="font-display font-extrabold text-lg tracking-tight bg-linear-to-r from-foreground to-primary bg-clip-text text-transparent">
                GoalPilot
              </span>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed max-w-sm">
              The intelligent goal deconstruction and auto-scheduled
              productivity operating system. Transform any long-range ambition
              into daily actionable flow.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-mono">
              <span className="inline-block size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All AI Engines Operational</span>
            </div>
          </div>

          <div>
            <h5 className="font-semibold text-foreground mb-3 uppercase tracking-wider text-[11px]">
              Product
            </h5>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link to="/app/planner" className="hover:text-foreground">
                  AI Roadmap Planner
                </Link>
              </li>
              <li>
                <Link to="/app/calendar" className="hover:text-foreground">
                  Smart Calendar
                </Link>
              </li>
              <li>
                <Link to="/app/tasks" className="hover:text-foreground">
                  Velocity Tasks
                </Link>
              </li>
              <li>
                <Link to="/app/habits" className="hover:text-foreground">
                  Habit Streaks
                </Link>
              </li>
              <li>
                <Link to="/app/analytics" className="hover:text-foreground">
                  Productivity Analytics
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-foreground mb-3 uppercase tracking-wider text-[11px]">
              Resources
            </h5>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#interactive-demo" className="hover:text-foreground">
                  Interactive Demo
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-foreground">
                  3-Step Framework
                </a>
              </li>
              <li>
                <a href="#comparison" className="hover:text-foreground">
                  Product Comparison
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-foreground">
                  Pricing Tiers
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-foreground">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-foreground mb-3 uppercase tracking-wider text-[11px]">
              Workspace
            </h5>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link to="/auth" className="hover:text-foreground">
                  Sign In / Register
                </Link>
              </li>
              <li>
                <Link to="/app" className="hover:text-foreground">
                  Demo Workspace
                </Link>
              </li>
              <li>
                <Link to="/app/settings" className="hover:text-foreground">
                  Preferences
                </Link>
              </li>
              <li>
                <span className="text-muted-foreground/60">
                  Privacy & Terms
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-border/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} GoalPilot Workspace. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="hover:text-foreground cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-foreground cursor-pointer">
              Terms of Service
            </span>
            <span className="hover:text-foreground cursor-pointer">
              Security
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc, gradient, border }: any) {
  return (
    <div
      className={`p-6 rounded-2xl border ${border} bg-card/60 backdrop-blur-md space-y-3 transition-all hover:-translate-y-0.5 hover:shadow-xl`}
    >
      <div
        className={`size-11 rounded-xl bg-linear-to-br ${gradient} grid place-items-center text-primary border border-primary/20`}
      >
        <Icon className="size-5" />
      </div>
      <h3 className="font-display font-bold text-base text-foreground">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

function TestimonialCard({ name, role, avatar, stars, goal, quote }: any) {
  return (
    <Card className="border border-border/70 bg-card/60 backdrop-blur-sm shadow-sm flex flex-col justify-between">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full gradient-brand grid place-items-center text-white font-bold text-xs font-mono">
              {avatar}
            </div>
            <div>
              <h4 className="font-semibold text-sm text-foreground">{name}</h4>
              <p className="text-[11px] text-muted-foreground">{role}</p>
            </div>
          </div>
          <div className="flex text-amber-500">
            {Array.from({ length: stars }).map((_, i) => (
              <Star key={i} className="size-3.5 fill-amber-500" />
            ))}
          </div>
        </div>

        <Badge
          variant="outline"
          className="text-[10px] bg-primary/5 text-primary border-primary/20"
        >
          🎯 {goal}
        </Badge>

        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed italic">
          "{quote}"
        </p>
      </CardContent>
    </Card>
  );
}
