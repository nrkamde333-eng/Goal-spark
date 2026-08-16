import { useState } from "react";
import { useApp } from "@/lib/store";
import type { Task } from "@/lib/demo-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CheckCircle2, Circle, Plus, Trash2, Clock, Pin, CheckCheck, TrendingUp, Sparkles, AlertCircle } from "lucide-react";
import { format, isToday, isTomorrow, isThisWeek, isPast, parseISO } from "date-fns";
import { CategoryBadge, PriorityDot } from "./app.index";
import { getCategoryTheme } from "@/lib/category-styles";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const filters = [
  { id: "today", label: "Today", fn: (t: Task) => isToday(parseISO(t.dueDate)) },
  { id: "tomorrow", label: "Tomorrow", fn: (t: Task) => isTomorrow(parseISO(t.dueDate)) },
  { id: "week", label: "This week", fn: (t: Task) => isThisWeek(parseISO(t.dueDate), { weekStartsOn: 1 }) },
  { id: "overdue", label: "Overdue", fn: (t: Task) => isPast(parseISO(t.dueDate)) && !isToday(parseISO(t.dueDate)) && t.status !== "done" },
  { id: "high", label: "High Priority", fn: (t: Task) => t.priority === "high" && t.status !== "done" },
  { id: "done", label: "Completed", fn: (t: Task) => t.status === "done" },
  { id: "all", label: "All Tasks", fn: () => true },
];

export function TasksPage() {
  const { state, toggleTask, deleteTask, addTask } = useApp();
  const [filter, setFilter] = useState("today");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "", description: "", priority: "medium" as const, category: "work" as const,
    date: format(new Date(), "yyyy-MM-dd"), start: "", end: "",
  });

  const allTasks = state.tasks;
  const totalAll = allTasks.length;
  const totalDone = allTasks.filter((t) => t.status === "done").length;
  const overallProgress = totalAll > 0 ? Math.round((totalDone / totalAll) * 100) : 0;

  const f = filters.find((x) => x.id === filter)!;
  const items: Task[] = state.tasks.filter(f.fn);
  const filterTotal = items.length;
  const filterDone = items.filter((t) => t.status === "done").length;
  const filterProgress = filterTotal > 0 ? Math.round((filterDone / filterTotal) * 100) : 0;
  const highPending = allTasks.filter((t) => t.priority === "high" && t.status !== "done").length;

  const grouped = groupBy<Task>(items, (t) => t.dueDate.slice(0, 10));

  const handleToggle = (task: Task) => {
    const nextWillBeDone = task.status !== "done";
    toggleTask(task.id);
    if (nextWillBeDone) {
      toast.success(`Completed "${task.title.slice(0, 24)}..." · Progress updated!`);
    } else {
      toast.info(`Reopened "${task.title.slice(0, 24)}..."`);
    }
  };

  const create = () => {
    if (!form.title.trim()) return;
    addTask({
      title: form.title.trim(),
      description: form.description,
      priority: form.priority,
      status: "todo",
      category: form.category,
      dueDate: form.date,
      startTime: form.start || undefined,
      endTime: form.end || undefined,
    });
    toast.success("Task created · Added to roadmap");
    setForm({ title: "", description: "", priority: "medium", category: "work", date: format(new Date(), "yyyy-MM-dd"), start: "", end: "" });
    setOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight">Tasks & Execution</h1>
          <p className="text-sm text-muted-foreground">Every granular action advances your roadmap goals.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="rounded-full gradient-brand text-white shadow-md shadow-primary/20 self-start sm:self-auto">
              <Plus className="size-4 mr-1.5" /> New task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New task</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><Label className="text-xs">Title</Label><Input autoFocus value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Solve LeetCode Dynamic Programming" /></div>
              <div><Label className="text-xs">Description</Label><Textarea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Priority</Label>
                  <Select value={form.priority} onValueChange={(v: any) => setForm({ ...form, priority: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["low", "medium", "high"].map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs">Category</Label>
                  <Select value={form.category} onValueChange={(v: any) => setForm({ ...form, category: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["work", "study", "personal", "health", "meeting"].map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div><Label className="text-xs">Date</Label><Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></div>
                <div><Label className="text-xs">Start</Label><Input type="time" value={form.start} onChange={(e) => setForm({ ...form, start: e.target.value })} /></div>
                <div><Label className="text-xs">End</Label><Input type="time" value={form.end} onChange={(e) => setForm({ ...form, end: e.target.value })} /></div>
              </div>
              <Button className="w-full rounded-full gradient-brand text-white" onClick={create}>Create task</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Progress & Velocity Summary Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Card className="p-3.5 border border-border/80 bg-gradient-to-br from-primary/5 via-card to-background shadow-xs">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-muted-foreground flex items-center gap-1.5">
              <CheckCheck className="size-4 text-primary" /> Overall Progress
            </span>
            <span className="font-mono font-bold text-primary text-sm">{overallProgress}%</span>
          </div>
          <Progress value={overallProgress} className="h-2 mb-1.5" />
          <div className="text-[11px] text-muted-foreground flex justify-between font-mono">
            <span>{totalDone} of {totalAll} tasks completed</span>
            <span>{totalAll - totalDone} remaining</span>
          </div>
        </Card>

        <Card className="p-3.5 border border-border/80 bg-card shadow-xs">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-muted-foreground flex items-center gap-1.5">
              <TrendingUp className="size-4 text-emerald-500" /> Filter Velocity ({f.label})
            </span>
            <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
              {filterDone}/{filterTotal}
            </span>
          </div>
          <Progress value={filterProgress} className="h-2 mb-1.5 bg-muted" />
          <div className="text-[11px] text-muted-foreground flex justify-between">
            <span>{filterProgress}% completed in this view</span>
            <span className="text-emerald-500 font-semibold">{filterTotal - filterDone} left</span>
          </div>
        </Card>

        <Card className="p-3.5 border border-border/80 bg-card shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5 mb-1">
              <AlertCircle className="size-4 text-amber-500" /> Urgent Focus
            </div>
            <div className="text-xl font-display font-extrabold text-foreground">
              {highPending} <span className="text-xs font-normal text-muted-foreground font-sans">High priority pending</span>
            </div>
          </div>
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500">
            <Sparkles className="size-5" />
          </div>
        </Card>
      </div>

      {/* Filter Tabs */}
      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList className="flex flex-wrap h-auto bg-transparent p-0 gap-1.5">
          {filters.map((flt) => {
            const count = allTasks.filter(flt.fn).length;
            return (
              <TabsTrigger
                key={flt.id}
                value={flt.id}
                className="rounded-full border bg-card px-3.5 py-1.5 text-xs data-[state=active]:gradient-brand data-[state=active]:text-white shadow-2xs transition-all flex items-center gap-1.5"
              >
                <span>{flt.label}</span>
                <span className="text-[10px] opacity-75 font-mono px-1.5 py-0.2 rounded-full bg-background/20">
                  {count}
                </span>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>

      {/* Task List Grouped by Day */}
      <div className="space-y-6">
        {Object.entries(grouped).sort().map(([day, list]) => (
          <div key={day}>
            <div className="text-xs uppercase tracking-widest font-bold text-muted-foreground mb-2 flex items-center justify-between">
              <span>
                {isToday(parseISO(day)) ? "Today" : isTomorrow(parseISO(day)) ? "Tomorrow" : format(parseISO(day), "EEE, MMM d")}
              </span>
              <span className="font-mono text-muted-foreground font-medium">
                {list.filter(t => t.status === "done").length} / {list.length} done
              </span>
            </div>
            <Card className="border divide-y overflow-hidden shadow-xs">
              {list.map((t) => {
                const theme = getCategoryTheme(t.category);
                return (
                  <div
                    key={t.id}
                    className={`flex items-center gap-3 p-3.5 transition group ${
                      t.status === "done" ? "opacity-60 bg-muted/15" : theme.cardBg
                    } border-l-4 ${
                      t.category === "study"
                        ? "border-l-purple-500"
                        : t.category === "work"
                        ? "border-l-blue-500"
                        : t.category === "health"
                        ? "border-l-emerald-500"
                        : t.category === "personal"
                        ? "border-l-pink-500"
                        : "border-l-amber-500"
                    }`}
                  >
                    <button
                      onClick={() => handleToggle(t)}
                      className="shrink-0 p-0.5 rounded-full hover:scale-110 transition cursor-pointer"
                      title={t.status === "done" ? "Mark incomplete" : "Mark completed"}
                    >
                      {t.status === "done" ? (
                        <CheckCircle2 className="size-5 text-emerald-500 fill-emerald-500/20" />
                      ) : (
                        <Circle className="size-5 text-muted-foreground hover:text-primary transition" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <div
                        className={`text-sm font-medium ${
                          t.status === "done" ? "line-through text-muted-foreground" : "text-foreground"
                        }`}
                      >
                        {t.title}
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5 flex-wrap">
                        {t.startTime && (
                          <span className="flex items-center gap-1 font-mono text-[11px] bg-background/60 px-1.5 py-0.5 rounded border">
                            <Clock className="size-3 text-primary" />
                            {t.startTime}
                            {t.endTime ? ` - ${t.endTime}` : ""}
                          </span>
                        )}
                        <CategoryBadge cat={t.category} />
                        {t.goalId && (
                          <span className="text-[10px] text-primary/80 bg-primary/10 px-1.5 py-0.5 rounded border border-primary/20">
                            Roadmap Goal
                          </span>
                        )}
                      </div>
                    </div>
                    <PriorityDot p={t.priority} />
                    <button
                      onClick={() => {
                        deleteTask(t.id);
                        toast.success("Task deleted");
                      }}
                      className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition p-1.5 rounded-md hover:bg-background/80"
                      title="Delete task"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                );
              })}
            </Card>
          </div>
        ))}
        {items.length === 0 && (
          <Card className="border p-12 text-center text-muted-foreground">
            <Pin className="size-10 mx-auto mb-3 opacity-30" />
            <p className="font-semibold text-sm">No tasks in this view</p>
            <p className="text-xs text-muted-foreground mt-1">Enjoy the calm or create a new task to stay ahead of your goals.</p>
          </Card>
        )}
      </div>
    </div>
  );
}

function groupBy<T>(arr: T[], key: (t: T) => string): Record<string, T[]> {
  return arr.reduce<Record<string, T[]>>((acc, item) => {
    const k = key(item);
    (acc[k] = acc[k] || []).push(item);
    return acc;
  }, {});
}
