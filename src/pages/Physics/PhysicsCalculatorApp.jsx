import { useMemo, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import PageShell from '../../components/ui/PageShell';

const formulaOptions = {
  force: { label: 'Force (F = m * a)', fields: ['m', 'a'], calc: ({ m, a }) => m * a, unit: 'N' },
  kinetic: { label: 'Kinetic Energy (0.5*m*v²)', fields: ['m', 'v'], calc: ({ m, v }) => 0.5 * m * v * v, unit: 'J' },
  voltage: { label: 'Ohm Law (V = I * R)', fields: ['I', 'R'], calc: ({ I, R }) => I * R, unit: 'V' },
};

export default function PhysicsCalculatorApp() {
  const [formula, setFormula] = useState('force');
  const [values, setValues] = useState({ m: 1, a: 1, v: 1, I: 1, R: 1 });

  const active = formulaOptions[formula];
  const result = useMemo(() => active.calc(values), [active, values]);

  return (
    <PageShell>
      <PageTitle title="Physics Calculator" description="Compute common physics equations with clean controls." />
      <div className="glass-card rounded-2xl p-5 space-y-3">
        <select className="input" value={formula} onChange={(e) => setFormula(e.target.value)}>
          {Object.entries(formulaOptions).map(([key, item]) => <option key={key} value={key}>{item.label}</option>)}
        </select>
        <div className="grid gap-2 sm:grid-cols-2">
          {active.fields.map((field) => (
            <input key={field} className="input" type="number" value={values[field]} onChange={(e) => setValues((prev) => ({ ...prev, [field]: Number(e.target.value) }))} placeholder={field} />
          ))}
        </div>
        <p className="rounded-xl bg-slate-100 p-3 text-sm dark:bg-slate-800">Result: <strong>{result.toFixed(4)}</strong> {active.unit}</p>
      </div>
    </PageShell>
  );
}
