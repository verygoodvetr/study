import { useState } from 'react';
import PageTitle from '../../components/PageTitle';
import PageShell from '../../components/ui/PageShell';

const options = {
  length: {
    meter: 1,
    kilometer: 1000,
    mile: 1609.34,
    foot: 0.3048,
  },
  mass: {
    gram: 1,
    kilogram: 1000,
    pound: 453.592,
  },
  temperature: ['celsius', 'fahrenheit', 'kelvin'],
};

export default function UnitConverterApp() {
  const [category, setCategory] = useState('length');
  const [from, setFrom] = useState('meter');
  const [to, setTo] = useState('kilometer');
  const [value, setValue] = useState(1);

  const convertTemp = () => {
    let celsius = Number(value);
    if (from === 'fahrenheit') celsius = (Number(value) - 32) * (5 / 9);
    if (from === 'kelvin') celsius = Number(value) - 273.15;
    if (to === 'fahrenheit') return celsius * (9 / 5) + 32;
    if (to === 'kelvin') return celsius + 273.15;
    return celsius;
  };

  const result = category === 'temperature'
    ? convertTemp()
    : (Number(value) * options[category][from]) / options[category][to];

  const units = category === 'temperature' ? options.temperature : Object.keys(options[category]);

  return (
    <PageShell>
      <PageTitle title="Unit Converter" description="Convert across length, mass, and temperature quickly." />
      <div className="glass-card rounded-2xl p-5 grid gap-3 sm:grid-cols-4">
        <select className="input" value={category} onChange={(e) => { const next = e.target.value; setCategory(next); const list = next === 'temperature' ? options.temperature : Object.keys(options[next]); setFrom(list[0]); setTo(list[1]); }}>
          <option value="length">Length</option>
          <option value="mass">Mass</option>
          <option value="temperature">Temperature</option>
        </select>
        <input className="input" type="number" value={value} onChange={(e) => setValue(e.target.value)} />
        <select className="input" value={from} onChange={(e) => setFrom(e.target.value)}>{units.map((u) => <option key={u}>{u}</option>)}</select>
        <select className="input" value={to} onChange={(e) => setTo(e.target.value)}>{units.map((u) => <option key={u}>{u}</option>)}</select>
        <p className="sm:col-span-4 rounded-xl bg-slate-100 p-3 dark:bg-slate-800">
          {value} {from} = <strong>{Number(result).toFixed(4)}</strong> {to}
        </p>
      </div>
    </PageShell>
  );
}
