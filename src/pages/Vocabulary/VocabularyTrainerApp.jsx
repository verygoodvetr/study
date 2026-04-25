import { useMemo, useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { uuid } from '../../utils/helpers';
import PageTitle from '../../components/PageTitle';
import PageShell from '../../components/ui/PageShell';
import EmptyState from '../../components/ui/EmptyState';
import { Languages } from 'lucide-react';

export default function VocabularyTrainerApp() {
  const [deck, setDeck] = useLocalStorage('study_vocab', []);
  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);

  const dueCards = useMemo(() => deck.filter((card) => (card.dueAt || 0) <= Date.now()), [deck]);
  const active = dueCards[index];

  const addWord = (e) => {
    e.preventDefault();
    if (!word.trim() || !meaning.trim()) return;
    setDeck([...deck, { id: uuid(), word, meaning, interval: 1, dueAt: Date.now() }]);
    setWord('');
    setMeaning('');
  };

  const review = (quality) => {
    if (!active) return;
    setDeck(deck.map((card) => {
      if (card.id !== active.id) return card;
      const nextInterval = quality === 'good' ? card.interval * 2 : 1;
      return { ...card, interval: nextInterval, dueAt: Date.now() + nextInterval * 24 * 60 * 60 * 1000 };
    }));
    setIndex((prev) => prev + 1);
    setShow(false);
  };

  return (
    <PageShell>
      <PageTitle title="Vocabulary Trainer" description="Spaced repetition deck for language learning." />
      <form className="glass-card rounded-2xl p-5 grid gap-2 sm:grid-cols-3" onSubmit={addWord}>
        <input className="input" value={word} onChange={(e) => setWord(e.target.value)} placeholder="Word" />
        <input className="input" value={meaning} onChange={(e) => setMeaning(e.target.value)} placeholder="Meaning" />
        <button className="btn-primary" type="submit">Add</button>
      </form>
      <div className="glass-card rounded-2xl p-5 mt-4">
        {!active ? (
          <EmptyState icon={Languages} title="No due cards" description="Add words or come back when cards become due." />
        ) : (
          <div>
            <p className="text-xs text-slate-500">Due card {index + 1} / {dueCards.length}</p>
            <p className="mt-3 text-2xl font-semibold">{active.word}</p>
            {show && <p className="mt-2 rounded-xl bg-slate-100 p-3 dark:bg-slate-800">{active.meaning}</p>}
            <div className="mt-3 flex gap-2">
              <button className="btn-secondary" type="button" onClick={() => setShow((s) => !s)}>{show ? 'Hide' : 'Reveal'}</button>
              <button className="btn-secondary" type="button" onClick={() => review('again')}>Again</button>
              <button className="btn-primary" type="button" onClick={() => review('good')}>Good</button>
            </div>
          </div>
        )}
      </div>
    </PageShell>
  );
}
