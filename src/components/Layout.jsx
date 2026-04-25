import { Suspense } from 'react';
import Header from './Header';
import AIAssistantPanel from './ai/AIAssistantPanel';
import Skeleton from './ui/Skeleton';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-slate-100 transition-colors duration-300 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-6">
        <Suspense fallback={<Skeleton className="h-80 w-full" />}>{children}</Suspense>
      </main>
      <AIAssistantPanel />
    </div>
  );
}
