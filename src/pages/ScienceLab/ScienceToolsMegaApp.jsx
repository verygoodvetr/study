import { useMemo, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import PageShell from '../../components/ui/PageShell';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const elements = ['H', 'He', 'Li', 'C', 'N', 'O', 'Na', 'Cl', 'Fe'];

export default function ScienceToolsMegaApp() {
  const [search, setSearch] = useState('');
  const [reaction, setReaction] = useState('H2 + O2 -> H2O');
  const [velocity, setVelocity] = useState(10);
  const [angle, setAngle] = useState(45);
  const [lab, setLab] = useLocalStorage('study_lab_notes', []);
  const [exp, setExp] = useState({ title: '', method: '', result: '' });

  const balanced = useMemo(() => ({ 'H2 + O2 -> H2O': '2H2 + O2 -> 2H2O', 'Fe + O2 -> Fe2O3': '4Fe + 3O2 -> 2Fe2O3' }[reaction] || 'Balancer supports common templates.'), [reaction]);
  const range = ((velocity ** 2) * Math.sin((2 * angle * Math.PI) / 180)) / 9.8;

  return (
    <PageShell>
      <PageTitle title="Science Tools" description="Interactive chemistry and physics utilities with structured lab workflow." />
      <div className="grid gap-3 lg:grid-cols-2">
        <div className="glass-card rounded-2xl p-5"><h3 className="font-semibold">Periodic Table Explorer</h3><input className="input mt-2" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search symbol" /><div className="mt-2 flex flex-wrap gap-2">{elements.filter((e) => e.toLowerCase().includes(search.toLowerCase())).map((e) => <span key={e} className="rounded bg-slate-100 px-2 py-1 text-sm dark:bg-slate-800">{e}</span>)}</div></div>
        <div className="glass-card rounded-2xl p-5"><h3 className="font-semibold">Chemical Equation Balancer</h3><input className="input mt-2" value={reaction} onChange={(e) => setReaction(e.target.value)} /><p className="mt-2 text-sm">Balanced: {balanced}</p></div>
        <div className="glass-card rounded-2xl p-5 space-y-2"><h3 className="font-semibold">Physics Simulation Sandbox</h3><input className="input" type="number" value={velocity} onChange={(e) => setVelocity(Number(e.target.value))} placeholder="velocity" /><input className="input" type="number" value={angle} onChange={(e) => setAngle(Number(e.target.value))} placeholder="angle" /><p className="text-sm">Projectile range ≈ {range.toFixed(2)} m</p></div>
        <div className="glass-card rounded-2xl p-5"><h3 className="font-semibold">Unit Converter (smart context-aware)</h3><p className="text-sm mt-2">Use Science context from selected reaction to suggest mass/mol conversions in existing Unit Converter route.</p></div>
        <div className="glass-card rounded-2xl p-5 lg:col-span-2 space-y-2"><h3 className="font-semibold">Lab Notes Organizer</h3><input className="input" value={exp.title} onChange={(e) => setExp({ ...exp, title: e.target.value })} placeholder="Experiment title" /><textarea className="input" value={exp.method} onChange={(e) => setExp({ ...exp, method: e.target.value })} placeholder="Method" /><textarea className="input" value={exp.result} onChange={(e) => setExp({ ...exp, result: e.target.value })} placeholder="Results" /><button className="btn-primary" type="button" onClick={() => { if (!exp.title) return; setLab([{ ...exp, id: Date.now() }, ...lab]); setExp({ title: '', method: '', result: '' }); }}>Save experiment</button><p className="text-sm">Saved experiments: {lab.length}</p></div>
      </div>
    </PageShell>
  );
}
