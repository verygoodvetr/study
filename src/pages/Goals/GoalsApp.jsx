import { useMemo, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import PageShell from '../../components/ui/PageShell';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { uuid } from '../../utils/helpers';

export default function GoalsApp() {
  const [goals, setGoals] = useLocalStorage('study_goals', []);
  const [title, setTitle] = useState('');
  const [target, setTarget] = useState(100);

  const totalProgress = useMemo(() => {
    if (!goals.length) return 0;
    const total = goals.reduce((acc, goal) => acc + (goal.progress / goal.target) * 100, 0);
    return Math.round(total / goals.length);
  }, [goals]);

  const addGoal = (e) => {
    e.preventDefault();
    if (!title.trim() || target <= 0) return;
    setGoals([...goals, { id: uuid(), title, target: Number(target), progress: 0 }]);
    setTitle('');
    setTarget(100);
  };

  return (
    <PageShell>
      <PageTitle title="Goal Tracker" description="Define long-term study outcomes and increment progress regularly." />
      <form className="glass-card rounded-2xl p-5 grid gap-2 sm:grid-cols-3" onSubmit={addGoal}>
        <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Goal" />
        <input className="input" type="number" value={target} onChange={(e) => setTarget(e.target.value)} placeholder="Target units" />
        <button className="btn-primary" type="submit">Add goal</button>
      </form>
      <p className="mt-3 text-sm text-slate-500">Average completion: {totalProgress}%</p>
      <div className="mt-3 space-y-2">
        {goals.map((goal) => (
          <div key={goal.id} className="glass-card rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <p className="font-medium">{goal.title}</p>
              <p className="text-sm">{goal.progress}/{goal.target}</p>
            </div>
            <div className="mt-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700">
              <div className="h-2 rounded-full bg-indigo-500" style={{ width: `${Math.min(100, (goal.progress / goal.target) * 100)}%` }} />
            </div>
            <button className="btn-secondary mt-3" type="button" onClick={() => setGoals(goals.map((item) => item.id === goal.id ? { ...item, progress: Math.min(item.target, item.progress + 1) } : item))}>+1 Progress</button>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
