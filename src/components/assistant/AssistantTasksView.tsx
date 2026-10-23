import React, { useState } from 'react';
import { ViewMode, AssistantTask } from '../../types';
import { MOCK_ASSISTANT_TASKS } from '../../data/mockData';
import { 
  CheckSquare, 
  Square, 
  Calendar, 
  Camera, 
  Sparkles, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Filter 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AssistantTasksViewProps {
  onNavigate: (view: ViewMode) => void;
}

export const AssistantTasksView: React.FC<AssistantTasksViewProps> = ({ onNavigate }) => {
  const [tasks, setTasks] = useState<AssistantTask[]>(MOCK_ASSISTANT_TASKS);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(t => {
      if (t.id === taskId) {
        const next = !t.completed;
        if (next) {
          confetti({
            particleCount: 40,
            spread: 50,
            origin: { y: 0.7 },
            colors: ['#C9A876', '#1A1714']
          });
        }
        return { ...t, completed: next };
      }
      return t;
    }));
  };

  const filteredTasks = tasks.filter(t => filterCategory === 'All' || t.category === filterCategory);

  return (
    <div className="min-h-screen bg-cream-100 text-charcoal-900 pb-20">
      
      {/* Top Header */}
      <div className="bg-cream-50 border-b border-warmGray-300 py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold-700 font-bold block mb-1">
            PRODUCTION CHECKLIST
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold uppercase tracking-tight text-charcoal-950">
            Assistant Task Operations
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
            Track gear prep, SD card ingest, culling review, and client gallery drafts.
          </p>
        </div>
      </div>

      {/* Filter Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-cream-50 p-4 rounded-lg border border-warmGray-300 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {['All', 'Culling', 'Review', 'Gallery', 'Gear', 'Scouting'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 rounded text-[11px] font-semibold uppercase tracking-wider transition-colors ${
                  filterCategory === cat
                    ? 'bg-charcoal-900 text-cream-50'
                    : 'bg-cream-200 text-charcoal-800 hover:bg-cream-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <span className="text-xs font-mono text-charcoal-700 font-semibold">
            {tasks.filter(t => t.completed).length} of {tasks.length} Completed
          </span>
        </div>
      </div>

      {/* Tasks List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white rounded-lg border border-warmGray-300 p-6 sm:p-8 space-y-4 shadow-luxury">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`p-4 rounded border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                task.completed
                  ? 'bg-cream-50/60 border-warmGray-200 text-warmGray-400'
                  : 'bg-cream-50 border-warmGray-300 hover:border-charcoal-900 text-charcoal-900 hover:shadow-sm'
              }`}
            >
              <div className="flex items-start gap-3">
                <button className="mt-0.5 shrink-0">
                  {task.completed ? (
                    <CheckSquare className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <Square className="w-5 h-5 text-warmGray-400" />
                  )}
                </button>
                
                <div>
                  <h4 className={`text-xs sm:text-sm font-semibold ${task.completed ? 'line-through' : 'text-charcoal-950'}`}>
                    {task.taskTitle}
                  </h4>
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-warmGray-500 mt-1">
                    <span className="text-gold-700 font-bold uppercase">{task.shootTitle}</span>
                    <span>•</span>
                    <span className="px-2 py-0.2 rounded bg-cream-200 text-charcoal-700 font-mono text-[9px] uppercase font-bold">
                      {task.category}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs self-end sm:self-auto">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  task.priority === 'High' ? 'bg-rose-100 text-rose-800' : 'bg-warmGray-200 text-charcoal-800'
                }`}>
                  {task.priority} Priority
                </span>
                <span className="font-mono text-warmGray-500">{task.dueDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
