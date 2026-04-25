import { useMemo, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import PageShell from '../../components/ui/PageShell';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { formatDate, uuid } from '../../utils/helpers';

export default function PlannerApp() {
  const [tasks, setTasks] = useLocalStorage('study_planner_tasks', []);
  const [task, setTask] = useState('');
  const [deadline, setDeadline] = useState('');

  const sorted = useMemo(() => [...tasks].sort((a, b) => new Date(a.deadline || '9999-01-01') - new Date(b.deadline || '9999-01-01')), [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    setTasks([...tasks, { id: uuid(), task, deadline, done: false }]);
    setTask(''); setDeadline('');
  };

  return (
    <PageShell>
      <div>
      <PageTitle title="Study Planner" description="Plan study tasks with deadlines and completion status." />
      <form className="glass-card rounded-2xl p-5 grid gap-3 sm:grid-cols-3" onSubmit={addTask}>
        <input className="input sm:col-span-2" value={task} onChange={(e) => setTask(e.target.value)} placeholder="Task" />
        <input className="input" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
        <button className="btn-primary sm:col-span-3" type="submit">Add task</button>
      </form>
      <div className="mt-4 space-y-2">
        {sorted.length === 0 && <div className="glass-card rounded-2xl p-5 text-sm text-slate-500">No tasks yet.</div>}
        {sorted.map((item) => (
          <div key={item.id} className="glass-card rounded-2xl p-5 flex items-center justify-between gap-3">
            <div>
              <p className={`font-medium ${item.done ? 'line-through opacity-60' : ''}`}>{item.task}</p>
              <p className="text-xs text-slate-500">Deadline: {formatDate(item.deadline)}</p>
            </div>
            <button className="btn-secondary" type="button" onClick={() => setTasks(tasks.map((taskValue) => taskValue.id === item.id ? { ...taskValue, done: !taskValue.done } : taskValue))}>{item.done ? 'Undo' : 'Done'}</button>
          </div>
        ))}
      </div>
      </div>
    </PageShell>
  );
}
