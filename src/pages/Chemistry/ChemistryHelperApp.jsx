import { useMemo, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import PageShell from '../../components/ui/PageShell';

const table = [
  { symbol: 'H', name: 'Hydrogen', mass: 1.008 },
  { symbol: 'C', name: 'Carbon', mass: 12.011 },
  { symbol: 'N', name: 'Nitrogen', mass: 14.007 },
  { symbol: 'O', name: 'Oxygen', mass: 15.999 },
  { symbol: 'Na', name: 'Sodium', mass: 22.99 },
  { symbol: 'Cl', name: 'Chlorine', mass: 35.45 },
  { symbol: 'Ca', name: 'Calcium', mass: 40.078 },
];

const examples = ['H2O', 'CO2', 'NaCl', 'C6H12O6'];

export default function ChemistryHelperApp() {
  const [formula, setFormula] = useState('H2O');

  const molarMass = useMemo(() => {
    const regex = /([A-Z][a-z]?)(\d*)/g;
    let total = 0;
    const breakdown = [];
    let match;
    while ((match = regex.exec(formula)) !== null) {
      const entry = table.find((el) => el.symbol === match[1]);
      if (!entry) return { total: null, breakdown: [] };
      const count = Number(match[2] || 1);
      total += entry.mass * count;
      breakdown.push(`${entry.symbol} × ${count}`);
    }
    return { total, breakdown };
  }, [formula]);

  return (
    <PageShell>
      <PageTitle title="Chemistry Helper" description="Periodic mini-table + molar mass calculator." />
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="glass-card rounded-2xl p-5">
          <h2 className="font-semibold">Elements</h2>
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
            {table.map((item) => (
              <div key={item.symbol} className="rounded-xl bg-slate-100 p-2 dark:bg-slate-800">
                <p className="font-semibold">{item.symbol}</p>
                <p>{item.name}</p>
                <p className="text-xs text-slate-500">{item.mass}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-card rounded-2xl p-5 space-y-3">
          <h2 className="font-semibold">Molar mass</h2>
          <input className="input" value={formula} onChange={(e) => setFormula(e.target.value)} placeholder="e.g. H2O" />
          <div className="flex flex-wrap gap-2">
            {examples.map((item) => <button key={item} type="button" className="btn-secondary" onClick={() => setFormula(item)}>{item}</button>)}
          </div>
          <p className="rounded-xl bg-slate-100 p-3 text-sm dark:bg-slate-800">
            {molarMass.total ? `${formula} = ${molarMass.total.toFixed(3)} g/mol` : 'Unknown symbol in formula.'}
          </p>
          <p className="text-xs text-slate-500">{molarMass.breakdown.join(' + ')}</p>
        </div>
      </div>
    </PageShell>
  );
}
