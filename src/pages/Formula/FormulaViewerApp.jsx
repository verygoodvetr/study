import { useState } from 'react';
import PageTitle from '../../components/PageTitle';
import PageShell from '../../components/ui/PageShell';

const formulaData = {
  Algebra: ['Quadratic Formula: x = (-b ± √(b² - 4ac)) / 2a', 'Slope Formula: (y2 - y1) / (x2 - x1)'],
  Geometry: ['Area of Circle: πr²', 'Pythagorean Theorem: a² + b² = c²'],
  Physics: ['Force: F = ma', 'Ohm\'s Law: V = IR'],
  Chemistry: ['Molarity: M = moles / liters', 'Ideal Gas: PV = nRT'],
};

export default function FormulaViewerApp() {
  const [subject, setSubject] = useState('Algebra');

  return (
    <PageShell>
      <div>
      <PageTitle title="Formula Viewer" description="Browse commonly used formulas by subject." />
      <div className="glass-card rounded-2xl p-5">
        <label className="text-sm">Subject</label>
        <select className="input mt-2" value={subject} onChange={(e) => setSubject(e.target.value)}>
          {Object.keys(formulaData).map((item) => <option key={item}>{item}</option>)}
        </select>
        <ul className="mt-4 space-y-2">
          {formulaData[subject].map((formula) => (
            <li key={formula} className="rounded-xl bg-slate-100 p-3 text-sm dark:bg-slate-800">{formula}</li>
          ))}
        </ul>
      </div>
      </div>
    </PageShell>
  );
}
