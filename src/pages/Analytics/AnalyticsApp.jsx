import { useMemo } from 'react';
import PageTitle from '../../components/PageTitle';
import PageShell from '../../components/ui/PageShell';
import StatCard from '../../components/StatCard';

function read(key, fallback) {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try { return JSON.parse(raw); } catch { return fallback; }
}

function MiniBarChart({ values }) {
  const max = Math.max(...values, 1);
  return (
    <div className="flex h-28 items-end gap-2">
      {values.map((value, idx) => (
        <div key={idx} className="flex-1 rounded-t bg-indigo-500/70" style={{ height: `${(value / max) * 100}%` }} />
      ))}
    </div>
  );
}

export default function AnalyticsApp() {
  const notes = read('study_notes', []);
  const cards = read('study_flashcards', []);
  const pomodoro = read('study_pomodoro_stats', { sessions: 0, focusedMinutes: 0 });
  const habits = read('study_habits', []);

  const habitScore = useMemo(() => habits.reduce((acc, h) => acc + Object.values(h.checkins || {}).filter(Boolean).length, 0), [habits]);

  return (
    <PageShell>
      <PageTitle title="Study Session Analytics" description="Cross-app insights for momentum, streaks, and completion." />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Notes captured" value={notes.length} />
        <StatCard label="Flashcards" value={cards.length} />
        <StatCard label="Pomodoro sessions" value={pomodoro.sessions} />
        <StatCard label="Habit check-ins" value={habitScore} />
      </div>
      <div className="glass-card rounded-2xl p-5 mt-4">
        <p className="text-sm text-slate-500">Weekly momentum (synthetic from available data)</p>
        <MiniBarChart values={[notes.length, cards.length, pomodoro.sessions, habitScore, notes.length + cards.length, pomodoro.focusedMinutes / 25, habitScore / 2]} />
      </div>
    </PageShell>
  );
}
