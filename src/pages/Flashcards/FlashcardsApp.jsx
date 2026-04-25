import { useMemo, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import PageShell from '../../components/ui/PageShell';
import StatCard from '../../components/StatCard';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { uuid } from '../../utils/helpers';

export default function FlashcardsApp() {
  const [cards, setCards] = useLocalStorage('study_flashcards', []);
  const [form, setForm] = useState({ front: '', back: '' });
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const progress = useMemo(() => {
    const mastered = cards.filter((card) => card.mastered).length;
    return { mastered, total: cards.length, pct: cards.length ? Math.round((mastered / cards.length) * 100) : 0 };
  }, [cards]);

  const addCard = (event) => {
    event.preventDefault();
    if (!form.front.trim() || !form.back.trim()) return;
    setCards([...cards, { id: uuid(), ...form, mastered: false }]);
    setForm({ front: '', back: '' });
  };

  const active = cards[index];

  const markMastered = () => {
    if (!active) return;
    setCards(cards.map((card) => (card.id === active.id ? { ...card, mastered: !card.mastered } : card)));
  };

  return (
    <PageShell>
      <div>
      <PageTitle title="Flashcards" description="Build cards, flip with animation, and track mastered content." />
      <form onSubmit={addCard} className="glass-card rounded-2xl p-5 grid gap-3 sm:grid-cols-2">
        <input className="input" placeholder="Front (question)" value={form.front} onChange={(e) => setForm({ ...form, front: e.target.value })} />
        <input className="input" placeholder="Back (answer)" value={form.back} onChange={(e) => setForm({ ...form, back: e.target.value })} />
        <button className="btn-primary sm:col-span-2" type="submit">Add card</button>
      </form>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <StatCard label="Total cards" value={progress.total} />
        <StatCard label="Mastered" value={progress.mastered} />
        <StatCard label="Progress" value={`${progress.pct}%`} />
      </div>

      <div className="glass-card rounded-2xl p-5 mt-4 min-h-48">
        {!active ? (
          <p className="text-sm text-slate-500">No flashcards yet. Add one above to begin.</p>
        ) : (
          <>
            <button
              type="button"
              className="mx-auto block h-40 w-full max-w-xl rounded-2xl border border-indigo-400 bg-indigo-50 p-4 text-left transition hover:scale-[1.01] dark:bg-indigo-900/20"
              onClick={() => setFlipped((prev) => !prev)}
            >
              <p className="text-xs text-slate-500">Card {index + 1} / {cards.length}</p>
              <p className="mt-4 text-xl font-semibold">{flipped ? active.back : active.front}</p>
              <p className="mt-4 text-xs text-indigo-600">Tap to flip</p>
            </button>
            <div className="mt-4 flex flex-wrap gap-2">
              <button className="btn-secondary" type="button" onClick={() => { setIndex((prev) => (prev - 1 + cards.length) % cards.length); setFlipped(false); }}>Prev</button>
              <button className="btn-secondary" type="button" onClick={() => { setIndex((prev) => (prev + 1) % cards.length); setFlipped(false); }}>Next</button>
              <button className="btn-primary" type="button" onClick={markMastered}>{active.mastered ? 'Unmark mastered' : 'Mark mastered'}</button>
            </div>
          </>
        )}
      </div>
      </div>
    </PageShell>
  );
}
