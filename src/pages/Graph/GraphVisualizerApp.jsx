import { useMemo, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import PageShell from '../../components/ui/PageShell';

function evaluate(coeffs, x) {
  return coeffs.a * x * x + coeffs.b * x + coeffs.c;
}

export default function GraphVisualizerApp() {
  const [coeffs, setCoeffs] = useState({ a: 1, b: 0, c: 0 });

  const points = useMemo(() => {
    const raw = [];
    for (let x = -10; x <= 10; x += 0.2) {
      raw.push({ x, y: evaluate(coeffs, x) });
    }
    return raw;
  }, [coeffs]);

  const toSvg = (p) => {
    const sx = ((p.x + 10) / 20) * 300;
    const sy = 150 - (p.y / 20) * 150;
    return `${sx},${sy}`;
  };

  return (
    <PageShell>
      <PageTitle title="Graph Visualizer" description="Plot quadratic curves with interactive coefficient controls." />
      <div className="glass-card rounded-2xl p-5">
        <div className="mb-3 grid gap-2 sm:grid-cols-3">
          {['a', 'b', 'c'].map((key) => (
            <input
              key={key}
              className="input"
              type="number"
              value={coeffs[key]}
              onChange={(e) => setCoeffs((prev) => ({ ...prev, [key]: Number(e.target.value) }))}
              aria-label={key}
            />
          ))}
        </div>
        <svg viewBox="0 0 300 300" className="h-72 w-full rounded-xl bg-slate-100 dark:bg-slate-800">
          <line x1="0" y1="150" x2="300" y2="150" stroke="gray" strokeWidth="1" />
          <line x1="150" y1="0" x2="150" y2="300" stroke="gray" strokeWidth="1" />
          <polyline fill="none" stroke="#4f46e5" strokeWidth="2.5" points={points.map(toSvg).join(' ')} />
        </svg>
      </div>
    </PageShell>
  );
}
