import { useState } from "react";
import { Droplets, Leaf, ArrowRightLeft, Bug, Scissors, CheckCircle2, Circle } from "lucide-react";
import { useContainerSize } from "@/hooks/useContainerSize";

interface Task {
  id: string;
  label: string;
  category: "water" | "fertilize" | "transplant" | "pest" | "prune";
  location: string;
  time: string;
  done: boolean;
}

const iconMap = { water: Droplets, fertilize: Leaf, transplant: ArrowRightLeft, pest: Bug, prune: Scissors };
const colorMap = { water: "hsl(217,91%,60%)", fertilize: "hsl(142,71%,45%)", transplant: "hsl(38,92%,50%)", pest: "hsl(0,84%,60%)", prune: "hsl(271,81%,56%)" };

const initialTasks: Task[] = [
  { id: "1", label: "Water hanging baskets", category: "water", location: "Greenhouse A", time: "7:00 AM", done: false },
  { id: "2", label: "Fertilize seedling trays", category: "fertilize", location: "Propagation House", time: "8:30 AM", done: true },
  { id: "3", label: "Transplant petunias", category: "transplant", location: "Greenhouse B", time: "9:00 AM", done: false },
  { id: "4", label: "Inspect for aphids", category: "pest", location: "Greenhouse C", time: "10:30 AM", done: false },
  { id: "5", label: "Prune tomato suckers", category: "prune", location: "Greenhouse A", time: "11:00 AM", done: false },
  { id: "6", label: "Water perennial beds", category: "water", location: "Greenhouse C", time: "2:00 PM", done: false },
];

export function TodaysTasks() {
  const [tasks, setTasks] = useState(initialTasks);
  const { ref, size } = useContainerSize();
  const completed = tasks.filter((t) => t.done).length;
  const toggleTask = (id: string) => setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  const compact = size.width < 200;

  return (
    <div ref={ref} className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold font-display tracking-tight">Today's Tasks</h3>
          <p className="text-[10px] text-muted-foreground mt-0.5">{completed}/{tasks.length} completed</p>
        </div>
        <div className="text-[10px] text-primary font-medium">{Math.round((completed / tasks.length) * 100)}%</div>
      </div>
      <div className="mx-4 mt-3 h-1 rounded-full bg-muted">
        <div className="h-1 rounded-full bg-primary transition-all duration-500" style={{ width: `${(completed / tasks.length) * 100}%` }} />
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {tasks.map((task) => {
          const Icon = iconMap[task.category];
          return (
            <button key={task.id} onClick={() => toggleTask(task.id)}
              className={`w-full flex items-start gap-2.5 px-2 py-2 rounded-lg text-left transition-colors hover:bg-muted/40 group ${task.done ? "opacity-50" : ""}`}>
              {task.done
                ? <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 text-primary flex-shrink-0" />
                : <Circle className="h-3.5 w-3.5 mt-0.5 text-muted-foreground group-hover:text-foreground flex-shrink-0" />}
              <div className="flex-1 min-w-0">
                <p className={`text-xs leading-tight truncate ${task.done ? "line-through text-muted-foreground" : ""}`}>{task.label}</p>
                {!compact && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Icon className="h-2.5 w-2.5" style={{ color: colorMap[task.category] }} />{task.location}
                    </span>
                    <span className="text-[10px] text-muted-foreground/70">{task.time}</span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
