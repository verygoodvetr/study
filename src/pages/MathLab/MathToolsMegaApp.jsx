import { useMemo, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import PageShell from '../../components/ui/PageShell';

export default function MathToolsMegaApp() {
  const [coef, setCoef] = useState({ a: 1, b: 0, c: 0 });
  const [angleA, setAngleA] = useState(60);
  const [difficulty, setDifficulty] = useState(1);
  const [seed, setSeed] = useState(1);

  const delta = coef.b ** 2 - 4 * coef.a * coef.c;
  const roots = delta < 0 ? 'No real roots' : `${((-coef.b + Math.sqrt(delta)) / (2 * coef.a)).toFixed(2)}, ${((-coef.b - Math.sqrt(delta)) / (2 * coef.a)).toFixed(2)}`;
  const interiorSum = (3 - 2) * 180;
  const angleC = interiorSum - angleA - 60;
  const derivation = 'For y=ax²+bx+c, derivative by power rule is dy/dx = 2ax + b.';
  const problem = useMemo(() => {
    const x = difficulty * 2 + seed;
    return { q: `Solve: ${x}x + ${difficulty} = ${x + difficulty * 2}`, a: ((x + difficulty * 2 - difficulty) / x).toFixed(2) };
  }, [difficulty, seed]);

  return (
    <PageShell>
      <PageTitle title="Math Tools" description="Step solver, graph explorer, geometry helper, derivation guide, and adaptive practice." />
      <div className="grid gap-3 lg:grid-cols-2">
        <div className="glass-card rounded-2xl p-5 space-y-2"><h3 className="font-semibold">Step-by-Step Equation Solver</h3><input className="input" type="number" value={coef.a} onChange={(e) => setCoef({ ...coef, a: Number(e.target.value) })} /><input className="input" type="number" value={coef.b} onChange={(e) => setCoef({ ...coef, b: Number(e.target.value) })} /><input className="input" type="number" value={coef.c} onChange={(e) => setCoef({ ...coef, c: Number(e.target.value) })} /><p className="text-sm">Δ={delta.toFixed(2)} roots={roots}</p></div>
        <div className="glass-card rounded-2xl p-5"><h3 className="font-semibold">Graph Explorer</h3><svg viewBox="0 0 220 160" className="mt-2 h-40 w-full rounded bg-slate-100 dark:bg-slate-800"><polyline fill="none" stroke="#4f46e5" points={Array.from({ length: 40 }, (_, i) => { const x = i / 2 - 10; const y = coef.a * x * x + coef.b * x + coef.c; return `${(x + 10) * 11},${80 - y * 3}`; }).join(' ')} /></svg></div>
        <div className="glass-card rounded-2xl p-5 space-y-2"><h3 className="font-semibold">Geometry Visualizer</h3><input className="input" type="number" value={angleA} onChange={(e) => setAngleA(Number(e.target.value))} /><p className="text-sm">Triangle angles: A={angleA}°, B=60°, C={angleC}°</p></div>
        <div className="glass-card rounded-2xl p-5"><h3 className="font-semibold">Formula Derivation Helper</h3><p className="text-sm mt-2">{derivation}</p></div>
        <div className="glass-card rounded-2xl p-5 lg:col-span-2 space-y-2"><h3 className="font-semibold">Practice Problem Generator</h3><input className="input" type="range" min="1" max="5" value={difficulty} onChange={(e) => setDifficulty(Number(e.target.value))} /><button className="btn-secondary" type="button" onClick={() => setSeed((s) => s + 1)}>Generate new</button><p className="text-sm">{problem.q}</p><p className="text-sm">Answer: {problem.a}</p></div>
      </div>
    </PageShell>
  );
}
