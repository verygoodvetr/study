import { useMemo, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import PageShell from '../../components/ui/PageShell';

export default function ProductivityToolsApp() {
  const [kanban, setKanban] = useState({ todo: ['Read chapter'], doing: [], done: [] });
  const [matrix, setMatrix] = useState({ urgent: '', important: '' });
  const [deadlineDays, setDeadlineDays] = useState(3);
  const [workload, setWorkload] = useState(8);
  const [focusTask, setFocusTask] = useState('Deep work task');

  const risk = useMemo(() => (workload / Math.max(1, deadlineDays) > 2 ? 'High risk' : 'On track'), [workload, deadlineDays]);

  const move = (from, to, index) => {
    const next = structuredClone(kanban);
    const [item] = next[from].splice(index, 1);
    next[to].push(item);
    setKanban(next);
  };

  return (
    <PageShell>
      <PageTitle title="Organization & Productivity" description="Kanban planning, priority matrix, deadline risk checks, and focused workspace." />
      <div className="grid gap-3 lg:grid-cols-2">
        <div className="glass-card rounded-2xl p-5"><h3 className="font-semibold">Kanban Study Board</h3><div className="mt-2 grid grid-cols-3 gap-2 text-sm">{Object.entries(kanban).map(([k, list]) => <div key={k} className="rounded bg-slate-100 p-2 dark:bg-slate-800"><p className="font-medium capitalize">{k}</p>{list.map((item, i) => <div key={`${item}-${i}`} className="mt-1 rounded bg-white p-1 dark:bg-slate-700">{item}<div className="mt-1 flex gap-1">{k !== 'todo' && <button type="button" onClick={() => move(k, 'todo', i)}>←</button>}{k !== 'doing' && <button type="button" onClick={() => move(k, 'doing', i)}>→</button>}{k !== 'done' && <button type="button" onClick={() => move(k, 'done', i)}>✓</button>}</div></div>)}</div>)}</div></div>
        <div className="glass-card rounded-2xl p-5 space-y-2"><h3 className="font-semibold">Priority Matrix</h3><input className="input" placeholder="Urgent tasks" value={matrix.urgent} onChange={(e) => setMatrix({ ...matrix, urgent: e.target.value })} /><input className="input" placeholder="Important tasks" value={matrix.important} onChange={(e) => setMatrix({ ...matrix, important: e.target.value })} /></div>
        <div className="glass-card rounded-2xl p-5 space-y-2"><h3 className="font-semibold">Deadline Risk Predictor</h3><input className="input" type="number" value={deadlineDays} onChange={(e) => setDeadlineDays(Number(e.target.value))} placeholder="Days left" /><input className="input" type="number" value={workload} onChange={(e) => setWorkload(Number(e.target.value))} placeholder="Hours remaining" /><p className="text-sm">Risk status: {risk}</p></div>
        <div className="glass-card rounded-2xl p-5"><h3 className="font-semibold">Weekly Review Dashboard</h3><p className="mt-2 text-sm">Completed tasks: {kanban.done.length}. In progress: {kanban.doing.length}. Pending: {kanban.todo.length}.</p></div>
        <div className="glass-card rounded-2xl p-5 lg:col-span-2"><h3 className="font-semibold">Minimalist Focus Workspace</h3><input className="input mt-2" value={focusTask} onChange={(e) => setFocusTask(e.target.value)} /><div className="mt-2 rounded bg-slate-900 p-4 text-center text-white">Single task mode: {focusTask}</div></div>
      </div>
    </PageShell>
  );
}
