import { useMemo, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import PageShell from '../../components/ui/PageShell';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export default function MotivationGamificationApp() {
  const [xp, setXp] = useLocalStorage('study_xp', 0);
  const [streak, setStreak] = useLocalStorage('study_streak', { days: 0, recoveries: 2 });
  const [missions, setMissions] = useState([{ t: 'Solve 20 problems', done: false }, { t: '1 Pomodoro', done: false }]);

  const level = Math.floor(xp / 100) + 1;
  const unlocked = xp >= 300;
  const bossProgress = useMemo(() => Math.round((missions.filter((m) => m.done).length / missions.length) * 100), [missions]);

  return (
    <PageShell>
      <PageTitle title="Motivation & Gamification" description="XP systems, streaks, missions, rewards, and boss-battle completion loops." />
      <div className="grid gap-3 lg:grid-cols-2">
        <div className="glass-card rounded-2xl p-5"><h3 className="font-semibold">XP / Level System</h3><p className="mt-2 text-sm">XP: {xp} | Level: {level}</p><button className="btn-primary mt-2" type="button" onClick={() => setXp(xp + 25)}>+25 XP</button></div>
        <div className="glass-card rounded-2xl p-5"><h3 className="font-semibold">Daily Streak Tracker</h3><p className="mt-2 text-sm">Streak: {streak.days} days | Recoveries: {streak.recoveries}</p><button className="btn-secondary mt-2" type="button" onClick={() => setStreak({ ...streak, days: streak.days + 1 })}>Mark today</button><button className="btn-secondary mt-2 ml-2" type="button" onClick={() => streak.recoveries > 0 && setStreak({ days: Math.max(1, streak.days), recoveries: streak.recoveries - 1 })}>Use recovery</button></div>
        <div className="glass-card rounded-2xl p-5"><h3 className="font-semibold">Challenge Mode</h3>{missions.map((m, i) => <label key={m.t} className="mt-2 block text-sm"><input type="checkbox" checked={m.done} onChange={() => setMissions(missions.map((x, idx) => idx === i ? { ...x, done: !x.done } : x))} /> {m.t}</label>)}</div>
        <div className="glass-card rounded-2xl p-5"><h3 className="font-semibold">Reward Unlock System</h3><p className="mt-2 text-sm">Reward status: {unlocked ? 'Unlocked 🎉' : 'Reach 300 XP to unlock'}</p></div>
        <div className="glass-card rounded-2xl p-5 lg:col-span-2"><h3 className="font-semibold">Study Boss Battle</h3><p className="mt-2 text-sm">Defeat boss by finishing all missions: {bossProgress}%</p><div className="mt-2 h-3 rounded-full bg-slate-200 dark:bg-slate-700"><div className="h-3 rounded-full bg-emerald-500" style={{ width: `${bossProgress}%` }} /></div></div>
      </div>
    </PageShell>
  );
}
