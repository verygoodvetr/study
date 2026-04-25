import { useMemo, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import PageShell from '../../components/ui/PageShell';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { uuid } from '../../utils/helpers';

export default function DistractionApp() {
  const [log, setLog] = useLocalStorage('study_distraction_log', []);
  const [minutes, setMinutes] = useState(5);
  const [type, setType] = useState('distraction');

  const metrics = useMemo(() => {
    const focus = log.filter((entry) => entry.type === 'focus').reduce((acc, entry) => acc + entry.minutes, 0);
    const distraction = log.filter((entry) => entry.type === 'distraction').reduce((acc, entry) => acc + entry.minutes, 0);
    return { focus, distraction, ratio: distraction ? (focus / distraction).toFixed(2) : '∞' };
  }, [log]);

  return (
    <PageShell>
      <PageTitle title="Distraction Tracker" description="Log focused time vs distractions and improve your ratio." />
      <div className="glass-card rounded-2xl p-5 grid gap-2 sm:grid-cols-3">
        <select className="input" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="focus">Focus</option>
          <option value="distraction">Distraction</option>
        </select>
        <input className="input" type="number" value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} />
        <button className="btn-primary" type="button" onClick={() => setLog([{ id: uuid(), type, minutes: Number(minutes), createdAt: Date.now() }, ...log])}>Log entry</button>
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        <p className="glass-card rounded-2xl p-5 text-sm">Focus minutes: <strong>{metrics.focus}</strong></p>
        <p className="glass-card rounded-2xl p-5 text-sm">Distraction minutes: <strong>{metrics.distraction}</strong></p>
        <p className="glass-card rounded-2xl p-5 text-sm">Focus ratio: <strong>{metrics.ratio}</strong></p>
      </div>
    </PageShell>
  );
}
