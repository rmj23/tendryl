import { useState } from "react";
import { Droplets, Leaf, ArrowRightLeft, Bug, Scissors, CheckCircle2, Circle } from "lucide-react";

interface Task {
  id: string;
  label: string;
  category: "water" | "fertilize" | "transplant" | "pest" | "prune";
  location: string;
  time: string;
  done: boolean;
}

const iconMap = { water: Droplets, fertilize: Leaf, transplant: ArrowRightLeft, pest: Bug, prune: Scissors };
const colorMap = { water: "#3b82f6", fertilize: "#22c55e", transplant: "#f59e0b", pest: "#ef4444", prune: "#a855f7" };

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
  const completed = tasks.filter((t) => t.done).length;
  const toggleTask = (id: string) => setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-[hsl(220,15%,90%)] flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold font-display tracking-tight text-[hsl(220,15%,15%)]">Today's Tasks</h3>
          <p className="text-[10px] text-[hsl(220,10%,55%)] mt-0.5">{completed}/{tasks.length} completed</p>
        </div>
        <div className="text-[10px] text-[#00B8A9] font-medium">{Math.round((completed / tasks.length) * 100)}%</div>
      </div>
      <div className="mx-4 mt-3 h-1 rounded-full bg-[hsl(220,15%,90%)]">
        <div className="h-1 rounded-full bg-[#00B8A9] transition-all duration-500" style={{ width: `${(completed / tasks.length) * 100}%` }} />
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {tasks.map((task) => {
          const Icon = iconMap[task.category];
          return (
            <button key={task.id} onClick={() => toggleTask(task.id)}
              className={`w-full flex items-start gap-2.5 px-2 py-2 rounded-lg text-left transition-colors hover:bg-[hsl(210,20%,96%)] group ${task.done ? "opacity-50" : ""}`}>
              {task.done
                ? <CheckCircle2 className="h-3.5 w-3.5 mt-0.5 text-[#00B8A9] flex-shrink-0" />
                : <Circle className="h-3.5 w-3.5 mt-0.5 text-[hsl(220,10%,70%)] group-hover:text-[hsl(220,10%,50%)] flex-shrink-0" />}
              <div className="flex-1 min-w-0">
                <p className={`text-xs leading-tight ${task.done ? "line-through text-[hsl(220,10%,60%)]" : "text-[hsl(220,15%,20%)]"}`}>{task.label}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="flex items-center gap-1 text-[10px] text-[hsl(220,10%,55%)]">
                    <Icon className="h-2.5 w-2.5" style={{ color: colorMap[task.category] }} />{task.location}
                  </span>
                  <span className="text-[10px] text-[hsl(220,10%,70%)]">{task.time}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
