import AnimatedCard from './ui/AnimatedCard';

export default function StatCard({ label, value, subValue }) {
  return (
    <AnimatedCard>
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
      {subValue && <p className="mt-1 text-xs text-slate-500">{subValue}</p>}
    </AnimatedCard>
  );
}
