import { useMemo, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import PageShell from '../../components/ui/PageShell';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export default function AISpecificToolsApp() {
  const [text, setText] = useState('Paste notes for AI generation.');
  const [difficulty, setDifficulty] = useState('medium');
  const [deadlines, setDeadlines] = useState('Math exam: 14 days; Physics quiz: 5 days');
  const [cards, setCards] = useLocalStorage('study_flashcards', []);

  const generatedCards = useMemo(() => text.split('.').filter(Boolean).slice(0, 3).map((s) => ({ front: `Explain: ${s.trim().slice(0, 30)}`, back: s.trim() })), [text]);
  const generatedQuiz = useMemo(() => generatedCards.map((c, i) => `Q${i + 1} (${difficulty}): ${c.front}?`), [generatedCards, difficulty]);
  const eli5 = useMemo(() => `ELI5: ${text.slice(0, 120)}... means it is like a simple everyday process.`, [text]);
  const harder = useMemo(() => generatedQuiz.map((q) => q.replace(`(${difficulty})`, '(hard)')), [generatedQuiz, difficulty]);
  const plan = useMemo(() => deadlines.split(';').map((d) => `Plan: ${d.trim()} -> allocate revision blocks.`), [deadlines]);

  return (
    <PageShell>
      <PageTitle title="AI-Specific Tools" description="Auto generation workflows for flashcards, quizzes, explanations, adaptive tests, and plans." />
      <div className="grid gap-3 lg:grid-cols-2">
        <div className="glass-card rounded-2xl p-5"><h3 className="font-semibold">Auto Flashcard Generator</h3><textarea className="input mt-2" value={text} onChange={(e) => setText(e.target.value)} /><button className="btn-primary mt-2" type="button" onClick={() => setCards([...generatedCards.map((c, i) => ({ ...c, id: Date.now() + i, mastered: false })), ...cards])}>Save generated cards</button></div>
        <div className="glass-card rounded-2xl p-5"><h3 className="font-semibold">Quiz Generator</h3><select className="input mt-2" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}><option>easy</option><option>medium</option><option>hard</option></select><ul className="mt-2 list-disc pl-5 text-sm">{generatedQuiz.map((q) => <li key={q}>{q}</li>)}</ul></div>
        <div className="glass-card rounded-2xl p-5"><h3 className="font-semibold">Explain Like I'm 5</h3><p className="mt-2 text-sm">{eli5}</p></div>
        <div className="glass-card rounded-2xl p-5"><h3 className="font-semibold">Test Me Harder Mode</h3><ul className="mt-2 list-disc pl-5 text-sm">{harder.map((q) => <li key={q}>{q}</li>)}</ul></div>
        <div className="glass-card rounded-2xl p-5 lg:col-span-2"><h3 className="font-semibold">Study Plan Generator</h3><textarea className="input mt-2" value={deadlines} onChange={(e) => setDeadlines(e.target.value)} /><ul className="mt-2 list-disc pl-5 text-sm">{plan.map((p) => <li key={p}>{p}</li>)}</ul></div>
      </div>
    </PageShell>
  );
}
