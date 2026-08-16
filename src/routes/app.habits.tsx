import { useState } from "react";
import { useApp } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Flame, Sparkles, Check, Trash2, Calendar, Target } from "lucide-react";
import { toast } from "sonner";
import { CATEGORY_THEMES } from "@/lib/category-styles";
import type { Habit } from "@/lib/demo-data";

export default function HabitsPage() {
  const { state, addHabit, toggleHabitToday, deleteHabit } = useApp();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("⚡");

  const todayStr = new Date().toISOString().slice(0, 10);

  const emojis = ["⚡", "🏃", "💻", "🧘", "📚", "💧", "🥗", "🎯", "✍️", "🎸"];

  const handleAdd = () => {
    if (!name.trim()) return;
    addHabit({
      name: name.trim(),
      emoji,
      frequency: "daily",
      color: "brand",
    });
    setName("");
    setOpen(false);
    toast.success("Habit routine created!");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight flex items-center gap-2.5">
            <span className="p-1.5 rounded-xl gradient-brand text-white shadow-md shadow-primary/25">
              <Target className="size-5" />
            </span>
            <span>Habit Tracking Engine</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Build consistency, compound positive routines, and track streaks across every area of life.
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-full gradient-brand text-white font-semibold shadow-md shadow-primary/25">
              <Plus className="size-4 mr-1.5" /> New Habit
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-display font-bold text-lg">Create Habit Routine</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Choose Icon</label>
                <div className="flex flex-wrap gap-2">
                  {emojis.map((e) => (
                    <button
                      key={e}
                      type="button"
                      onClick={() => setEmoji(e)}
                      className={`size-9 rounded-xl text-lg flex items-center justify-center border transition ${
                        emoji === e ? "bg-primary/20 border-primary shadow-xs ring-2 ring-primary/40" : "bg-muted/30 border-border hover:bg-muted"
                      }`}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">Habit Name</label>
                <Input
                  autoFocus
                  placeholder="e.g., 20m Morning Mobility & Stretch"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAdd();
                  }}
                />
              </div>

              <Button onClick={handleAdd} className="w-full rounded-xl gradient-brand text-white font-semibold shadow-md shadow-primary/25">
                Save & Start Tracking
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Habits Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {state.habits.map((habit) => {
          const isDoneToday = habit.log.includes(todayStr);

          return (
            <Card
              key={habit.id}
              className={`border transition-all duration-300 hover:translate-y-[-2px] ${
                isDoneToday
                  ? "border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.12)] bg-card/90"
                  : "border-border/70 shadow-xs bg-card/60"
              }`}
            >
              <CardContent className="p-5 flex flex-col justify-between h-full space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="size-11 rounded-2xl bg-muted/40 grid place-items-center text-2xl shrink-0 border border-border/50">
                      {habit.emoji}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-sm text-foreground truncate">{habit.name}</h3>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5 font-medium">
                        <Flame className="size-3.5 text-amber-500 fill-amber-500" />
                        <span className="font-bold text-foreground font-mono">{habit.streak} day streak</span>
                        <span>· best: {habit.bestStreak}d</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteHabit(habit.id)}
                    className="p-1.5 text-muted-foreground hover:text-destructive rounded-lg hover:bg-muted/40 transition opacity-60 hover:opacity-100"
                    title="Delete Habit"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>

                {/* 7-Day Micro Checkins */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                    <span>Recent 7-Day Trend</span>
                    <span className="text-emerald-500 font-bold">{isDoneToday ? "Completed Today" : "Pending"}</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1.5">
                    {[6, 5, 4, 3, 2, 1, 0].map((offset) => {
                      const d = new Date();
                      d.setDate(d.getDate() - offset);
                      const dStr = d.toISOString().slice(0, 10);
                      const logged = habit.log.includes(dStr);
                      const dayName = d.toLocaleDateString("en-US", { weekday: "narrow" });

                      return (
                        <div key={offset} className="flex flex-col items-center gap-1">
                          <div
                            className={`size-6.5 rounded-lg grid place-items-center text-[10px] font-bold transition-all ${
                              logged
                                ? "bg-emerald-500 text-white shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                                : "bg-muted/60 text-muted-foreground/40 border border-border/50"
                            }`}
                          >
                            {logged ? "✓" : "·"}
                          </div>
                          <span className="text-[9px] font-mono text-muted-foreground">{dayName}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Toggle Button */}
                <Button
                  onClick={() => toggleHabitToday(habit.id)}
                  className={`w-full rounded-xl text-xs font-semibold transition-all ${
                    isDoneToday
                      ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25"
                      : "gradient-brand text-white shadow-md shadow-primary/20 hover:shadow-primary/35"
                  }`}
                  variant={isDoneToday ? "outline" : "default"}
                >
                  {isDoneToday ? (
                    <>
                      <Check className="size-4 mr-1.5 text-emerald-500" /> Logged for Today
                    </>
                  ) : (
                    <>
                      <Sparkles className="size-3.5 mr-1.5" /> Check In for Today
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
