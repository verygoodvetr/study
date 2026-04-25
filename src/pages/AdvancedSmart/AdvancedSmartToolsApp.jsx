import { useMemo, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import PageShell from '../../components/ui/PageShell';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export default function AdvancedSmartToolsApp() {
  const notes = JSON.parse(localStorage.getItem('study_notes') || '[]');
  const [mistakes, setMistakes] = useLocalStorage('study_mistakes', []);
  const [hidden, setHidden] = useState('Paste text to gradually reveal while reading.');
  const [reveal, setReveal] = useState(30);
  const [subject, setSubject] = useLocalStorage('study_last_subject', 'Math');
  const [position, setPosition] = useLocalStorage('study_context_pos', {});

  const recallItems = useMemo(() => notes.slice(0, 5).map((n) => n.title || n.content?.slice(0, 40)), [notes]);
  const suggested = useMemo(() => {
    const tasks = JSON.parse(localStorage.getItem('study_planner_tasks') || '[]');
    const pending = tasks.filter((t) => !t.done);
    if (!pending.length) return 'Review flashcards';
    return `Next best study target: ${pending[0].task}`;
  }, []);

  return (
    <PageShell>
      <PageTitle title="Advanced / Smart Study Tools" description="Active recall, decision support, mistake-driven repetition, and study context recovery." />
      <div className="grid gap-3 lg:grid-cols-2">
        <div className="glass-card rounded-2xl p-5">
          <h3 className="font-semibold">Active Recall Trainer</h3>
          {recallItems.length ? recallItems.map((q) => <p key={q} className="mt-2 rounded bg-slate-100 p-2 text-sm dark:bg-slate-800">Question: {q}?</p>) : <p className="mt-2 text-sm">No notes yet.</p>}
        </div>
        <div className="glass-card rounded-2xl p-5">
          <h3 className="font-semibold">Blur Mode Reader</h3>
          <input className="input mt-2" value={hidden} onChange={(e) => setHidden(e.target.value)} />
          <input className="mt-2 w-full" type="range" min="0" max="100" value={reveal} onChange={(e) => setReveal(Number(e.target.value))} />
          <p className="mt-2 text-sm" style={{ filter: `blur(${(100 - reveal) / 10}px)` }}>{hidden}</p>
        </div>
        <div className="glass-card rounded-2xl p-5">
          <h3 className="font-semibold">Mistake Tracker</h3>
          <button className="btn-secondary mt-2" onClick={() => setMistakes([{ id: Date.now(), topic: subject, time: Date.now() }, ...mistakes])} type="button">Log mistake</button>
          <p className="mt-2 text-sm">Mistakes logged: {mistakes.length}. Weakest topic focus: {mistakes[0]?.topic || 'None'}.</p>
        </div>
        <div className="glass-card rounded-2xl p-5">
          <h3 className="font-semibold">Study Decision Helper</h3>
          <p className="mt-2 text-sm">{suggested}</p>
        </div>
        <div className="glass-card rounded-2xl p-5 lg:col-span-2">
          <h3 className="font-semibold">Context Switcher</h3>
          <div className="mt-2 grid gap-2 sm:grid-cols-3">
            <input className="input" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" />
            <input className="input" value={position[subject] || ''} onChange={(e) => setPosition({ ...position, [subject]: e.target.value })} placeholder="Last position / page" />
            <p className="rounded-xl bg-slate-100 p-2 text-sm dark:bg-slate-800">Resume point: {position[subject] || 'Not set'}</p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
