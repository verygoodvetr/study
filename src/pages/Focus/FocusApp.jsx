import { useEffect, useState } from 'react';
import PageTitle from '../../components/PageTitle';

export default function FocusApp() {
  const [seconds, setSeconds] = useState(15 * 60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((prev) => (prev > 0 ? prev - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [running]);

  const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
  const sec = String(seconds % 60).padStart(2, '0');

  return (
    <div>
      <PageTitle title="Focus Mode" description="Distraction-free minimalist page with a study countdown." />
      <div className="card flex min-h-[60vh] flex-col items-center justify-center bg-gradient-to-b from-indigo-200 to-indigo-50 text-center dark:from-slate-800 dark:to-slate-900">
        <p className="text-7xl font-bold">{minutes}:{sec}</p>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Keep only one task open and stay present.</p>
        <div className="mt-4 flex gap-2">
          <button className="btn-primary" type="button" onClick={() => setRunning((prev) => !prev)}>{running ? 'Pause' : 'Start'}</button>
          <button className="btn-secondary" type="button" onClick={() => { setRunning(false); setSeconds(15 * 60); }}>Reset</button>
        </div>
      </div>
    </div>
  );
}
