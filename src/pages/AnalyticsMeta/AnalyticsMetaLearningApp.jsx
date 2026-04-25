import { useMemo, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import PageShell from '../../components/ui/PageShell';

export default function AnalyticsMetaLearningApp() {
  const [interruptions, setInterruptions] = useState(2);
  const [minutes, setMinutes] = useState(60);
  const [audit, setAudit] = useState({ reading: 30, solving: 20, revision: 10 });
  const [goal, setGoal] = useState(120);

  const focusScore = Math.max(0, Math.round((minutes - interruptions * 5) / Math.max(1, minutes) * 100));
  const burnout = minutes > 300 || interruptions > 20 ? 'High risk: overstudying pattern detected.' : 'Balanced pattern.';
  const daily = Math.ceil(goal / 7);
  const heatmap = Array.from({ length: 35 }, (_, i) => ((i * 13 + minutes + interruptions) % 100));
  const totalAudit = useMemo(() => Object.values(audit).reduce((a, b) => a + Number(b), 0), [audit]);

  return (
    <PageShell>
      <PageTitle title="Analytics & Meta-Learning" description="Heatmaps, focus metrics, burnout signals, and goal decomposition." />
      <div className="grid gap-3 lg:grid-cols-2">
        <div className="glass-card rounded-2xl p-5">
          <h3 className="font-semibold">Learning Heatmap</h3>
          <div className="mt-3 grid grid-cols-7 gap-1">{heatmap.map((v, i) => <div key={i} className="h-5 rounded" style={{ background: `rgba(79,70,229,${v / 100})` }} />)}</div>
        </div>
        <div className="glass-card rounded-2xl p-5 space-y-2">
          <h3 className="font-semibold">Focus Score Calculator</h3>
          <input className="input" type="number" value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} placeholder="Session minutes" />
          <input className="input" type="number" value={interruptions} onChange={(e) => setInterruptions(Number(e.target.value))} placeholder="Interruptions" />
          <p className="text-sm">Focus score: <strong>{focusScore}/100</strong></p>
        </div>
        <div className="glass-card rounded-2xl p-5 space-y-2">
          <h3 className="font-semibold">Time Audit Tool</h3>
          {Object.keys(audit).map((k) => <input key={k} className="input" type="number" value={audit[k]} onChange={(e) => setAudit({ ...audit, [k]: Number(e.target.value) })} placeholder={k} />)}
          <p className="text-sm">Total tracked minutes: {totalAudit}</p>
        </div>
        <div className="glass-card rounded-2xl p-5 space-y-2">
          <h3 className="font-semibold">Burnout Detector</h3>
          <p className="text-sm">{burnout}</p>
          <h3 className="font-semibold">Goal Breakdown Engine</h3>
          <input className="input" type="number" value={goal} onChange={(e) => setGoal(Number(e.target.value))} placeholder="Weekly goal units" />
          <p className="text-sm">Recommended daily target: {daily} units/day</p>
        </div>
      </div>
    </PageShell>
  );
}
