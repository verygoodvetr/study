import { useEffect, useMemo, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import PageShell from '../../components/ui/PageShell';
import StatCard from '../../components/StatCard';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const WORK_SECONDS = 25 * 60;

export default function PomodoroApp() {
  const [secondsLeft, setSecondsLeft] = useState(WORK_SECONDS);
  const [running, setRunning] = useState(false);
  const [stats, setStats] = useLocalStorage('study_pomodoro_stats', { sessions: 0, focusedMinutes: 0 });

  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => setSecondsLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [running]);

  useEffect(() => {
    if (secondsLeft > 0) return;
    setRunning(false);
    setSecondsLeft(WORK_SECONDS);
    setStats((prev) => ({ sessions: prev.sessions + 1, focusedMinutes: prev.focusedMinutes + 25 }));
  }, [secondsLeft, setStats]);

  const mmss = useMemo(() => {
    const m = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
    const s = String(secondsLeft % 60).padStart(2, '0');
    return `${m}:${s}`;
  }, [secondsLeft]);

  return (
    <PageShell>
      <div>
      <PageTitle title="Pomodoro Timer" description="Run focused 25-minute sessions and track your consistency." />
      <div className="glass-card rounded-2xl p-5 text-center">
        <p className="text-6xl font-bold tracking-tight">{mmss}</p>
        <div className="mt-4 flex justify-center gap-2">
          <button type="button" className="btn-primary" onClick={() => setRunning((prev) => !prev)}>{running ? 'Pause' : 'Start'}</button>
          <button type="button" className="btn-secondary" onClick={() => { setRunning(false); setSecondsLeft(WORK_SECONDS); }}>Reset</button>
        </div>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <StatCard label="Completed sessions" value={stats.sessions} />
        <StatCard label="Focused minutes" value={stats.focusedMinutes} />
      </div>
      </div>
    </PageShell>
  );
}
