import { useMemo, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import PageShell from '../../components/ui/PageShell';
import StatCard from '../../components/StatCard';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { uuid } from '../../utils/helpers';

const todayKey = new Date().toISOString().slice(0, 10);

export default function HabitsApp() {
  const [habits, setHabits] = useLocalStorage('study_habits', []);
  const [name, setName] = useState('');

  const completion = useMemo(() => {
    const done = habits.filter((h) => h.checkins?.[todayKey]).length;
    return { done, total: habits.length };
  }, [habits]);

  const addHabit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setHabits([...habits, { id: uuid(), name, checkins: {} }]);
    setName('');
  };

  return (
    <PageShell>
      <div>
      <PageTitle title="Habit Tracker" description="Track recurring study habits and daily consistency." />
      <form className="glass-card rounded-2xl p-5 flex gap-2" onSubmit={addHabit}>
        <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Habit name" />
        <button className="btn-primary" type="submit">Add</button>
      </form>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <StatCard label="Habits today" value={`${completion.done}/${completion.total}`} />
        <StatCard label="Completion" value={completion.total ? `${Math.round((completion.done / completion.total) * 100)}%` : '0%'} />
      </div>
      <div className="mt-4 space-y-2">
        {habits.length === 0 && <div className="glass-card rounded-2xl p-5 text-sm text-slate-500">No habits created yet.</div>}
        {habits.map((habit) => (
          <div key={habit.id} className="glass-card rounded-2xl p-5 flex items-center justify-between gap-2">
            <p>{habit.name}</p>
            <button
              type="button"
              className={`btn ${habit.checkins?.[todayKey] ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-800'}`}
              onClick={() => setHabits(habits.map((h) => h.id === habit.id ? { ...h, checkins: { ...h.checkins, [todayKey]: !h.checkins?.[todayKey] } } : h))}
            >
              {habit.checkins?.[todayKey] ? 'Done today' : 'Mark done'}
            </button>
          </div>
        ))}
      </div>
      </div>
    </PageShell>
  );
}
