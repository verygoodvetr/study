import { Link } from 'react-router-dom';
import { BookOpenCheck, Brain, CalendarClock, FileText, Flame, Goal, ListChecks, Map, Timer } from 'lucide-react';
import DataTools from '../../components/DataTools';
import PageTitle from '../../components/PageTitle';

const apps = [
  { path: '/flashcards', name: 'Flashcards', purpose: 'Flip cards and track mastery.', icon: BookOpenCheck },
  { path: '/pomodoro', name: 'Pomodoro Timer', purpose: 'Timed deep-work sessions with stats.', icon: Timer },
  { path: '/notes', name: 'Notes App', purpose: 'Taggable notes with auto-save.', icon: FileText },
  { path: '/quiz', name: 'Quiz App', purpose: 'Create and attempt custom quizzes.', icon: Brain },
  { path: '/planner', name: 'Study Planner', purpose: 'Manage tasks and deadlines.', icon: ListChecks },
  { path: '/habits', name: 'Habit Tracker', purpose: 'Monitor daily study routines.', icon: Flame },
  { path: '/mind-map', name: 'Mind Map Tool', purpose: 'Build topic nodes and links.', icon: Map },
  { path: '/focus', name: 'Focus Mode', purpose: 'Fullscreen minimal timer mode.', icon: Goal },
  { path: '/formulas', name: 'Formula Viewer', purpose: 'Quick access by subject.', icon: BookOpenCheck },
  { path: '/countdown', name: 'Exam Countdown', purpose: 'Track multiple exam timers.', icon: CalendarClock },
];

export default function Dashboard() {
  return (
    <div>
      <PageTitle
        title="Study Dashboard"
        description="Open any module below. Your data is stored locally for a persistent study workflow."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {apps.map(({ path, name, purpose, icon: Icon }) => (
          <Link key={path} to={path} className="card group hover:-translate-y-0.5">
            <div className="flex items-center gap-3">
              <span className="rounded-xl bg-indigo-100 p-2 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300">
                <Icon size={18} />
              </span>
              <h2 className="font-semibold">{name}</h2>
            </div>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{purpose}</p>
          </Link>
        ))}
      </div>
      <div className="card mt-6">
        <p className="text-sm text-slate-500 dark:text-slate-400">Quick tip</p>
        <p className="mt-2 text-sm">
          Start with Planner + Pomodoro for execution, then use Flashcards + Quiz for reinforcement.
        </p>
      </div>
      <DataTools />
    </div>
  );
}
