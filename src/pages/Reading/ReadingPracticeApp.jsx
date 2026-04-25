import { useMemo, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import PageShell from '../../components/ui/PageShell';

export default function ReadingPracticeApp() {
  const [text, setText] = useState('');
  const [minutes, setMinutes] = useState(1);

  const words = useMemo(() => text.trim().split(/\s+/).filter(Boolean).length, [text]);
  const wpm = words && minutes ? Math.round(words / minutes) : 0;

  return (
    <PageShell>
      <PageTitle title="Reading Practice" description="Measure reading pace and track comprehension workload." />
      <div className="glass-card rounded-2xl p-5 space-y-3">
        <textarea className="input min-h-44" value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste passage to practice" />
        <div className="grid gap-2 sm:grid-cols-3">
          <input className="input" type="number" min="0.5" step="0.5" value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} />
          <p className="rounded-xl bg-slate-100 p-3 text-sm dark:bg-slate-800">Words: {words}</p>
          <p className="rounded-xl bg-slate-100 p-3 text-sm dark:bg-slate-800">Estimated WPM: {wpm}</p>
        </div>
      </div>
    </PageShell>
  );
}
