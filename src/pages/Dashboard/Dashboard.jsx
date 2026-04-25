import { Link } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import DataTools from '../../components/DataTools';
import StatCard from '../../components/StatCard';
import PageShell from '../../components/ui/PageShell';
import { appGroups } from '../../data/apps';

function countItems(key) {
  const raw = localStorage.getItem(key);
  if (!raw) return 0;
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.length : Object.keys(parsed || {}).length;
  } catch {
    return 0;
  }
}

export default function Dashboard() {
  const stats = {
    notes: countItems('study_notes'),
    cards: countItems('study_flashcards'),
    tasks: countItems('study_planner_tasks'),
    exams: countItems('study_exam_countdowns'),
  };

  return (
    <PageShell>
      <PageTitle title="Study Dashboard" description="A premium, unified study operating system with AI copilot and deep analytics." />
      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Notes" value={stats.notes} subValue="Knowledge base" />
        <StatCard label="Flashcards" value={stats.cards} subValue="Review queue" />
        <StatCard label="Tasks" value={stats.tasks} subValue="Execution plan" />
        <StatCard label="Exams" value={stats.exams} subValue="Deadlines" />
      </div>
      <div className="space-y-6">
        {appGroups.map((group) => (
          <section key={group.title}>
            <h2 className="mb-3 text-lg font-semibold">{group.title}</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {group.apps.map(({ path, name, purpose, icon: Icon }) => (
                <Link key={path} to={path} className="glass-card group block rounded-2xl p-4 transition">
                  <div className="flex items-center gap-3">
                    <span className="rounded-xl bg-indigo-100 p-2 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300">
                      <Icon size={18} />
                    </span>
                    <h3 className="font-semibold">{name}</h3>
                  </div>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{purpose}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
      <DataTools />
    </PageShell>
  );
}
