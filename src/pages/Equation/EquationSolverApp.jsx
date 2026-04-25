import { useState } from 'react';
import PageTitle from '../../components/PageTitle';
import PageShell from '../../components/ui/PageShell';
import AnimatedButton from '../../components/ui/AnimatedButton';

export default function EquationSolverApp() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);

  const discriminant = b * b - 4 * a * c;
  const isLinear = a === 0;

  let result = 'Enter coefficients';
  if (isLinear) {
    result = b !== 0 ? `Linear solution x = ${(-c / b).toFixed(4)}` : 'Invalid linear equation.';
  } else if (discriminant < 0) {
    result = 'No real roots.';
  } else {
    const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    result = `x1 = ${root1.toFixed(4)}, x2 = ${root2.toFixed(4)}`;
  }

  return (
    <PageShell>
      <PageTitle title="Equation Solver" description="Solve linear and quadratic equations with immediate feedback." />
      <div className="glass-card rounded-2xl p-5 space-y-3">
        <p className="text-sm">Equation: ax² + bx + c = 0</p>
        <div className="grid gap-2 sm:grid-cols-3">
          <input className="input" type="number" value={a} onChange={(e) => setA(Number(e.target.value))} />
          <input className="input" type="number" value={b} onChange={(e) => setB(Number(e.target.value))} />
          <input className="input" type="number" value={c} onChange={(e) => setC(Number(e.target.value))} />
        </div>
        <AnimatedButton className="btn-secondary" type="button" onClick={() => { setA(1); setB(0); setC(0); }}>Reset</AnimatedButton>
        <div className="rounded-xl bg-slate-100 p-3 text-sm dark:bg-slate-800">
          <p>Discriminant: {discriminant.toFixed(4)}</p>
          <p className="mt-1 font-medium">{result}</p>
          <ol className="mt-2 list-decimal pl-4 text-xs text-slate-600 dark:text-slate-300">
            <li>Compute Δ = b² - 4ac.</li>
            <li>If Δ {'<'} 0, no real roots.</li>
            <li>Else use x = (-b ± √Δ) / 2a.</li>
          </ol>
        </div>
      </div>
    </PageShell>
  );
}
