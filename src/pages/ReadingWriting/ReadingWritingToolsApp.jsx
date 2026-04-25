import { useMemo, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import PageShell from '../../components/ui/PageShell';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export default function ReadingWritingToolsApp() {
  const [text, setText] = useState('Paste an article paragraph here.');
  const [essay, setEssay] = useState({ intro: '', points: '', conclusion: '' });
  const [minutes, setMinutes] = useState(10);
  const [highlight, setHighlight] = useState('');
  const [cards, setCards] = useLocalStorage('study_flashcards', []);

  const summary = useMemo(() => text.split('.').slice(0, 2).join('.').trim(), [text]);
  const paraphrase = useMemo(() => text.replace(/important/gi, 'significant').replace(/good/gi, 'beneficial'), [text]);
  const question = 'What is the main argument of the passage?';

  return (
    <PageShell>
      <PageTitle title="Reading & Writing Tools" description="Summarization, essay planning, paraphrasing, comprehension checks, and flashcard extraction." />
      <div className="grid gap-3 lg:grid-cols-2">
        <div className="glass-card rounded-2xl p-5"><h3 className="font-semibold">Smart Text Summarizer</h3><textarea className="input mt-2" value={text} onChange={(e) => setText(e.target.value)} /><p className="mt-2 text-sm">Summary: {summary || 'N/A'}</p></div>
        <div className="glass-card rounded-2xl p-5 space-y-2"><h3 className="font-semibold">Essay Planner</h3><input className="input" placeholder="Intro thesis" value={essay.intro} onChange={(e) => setEssay({ ...essay, intro: e.target.value })} /><textarea className="input" placeholder="Arguments" value={essay.points} onChange={(e) => setEssay({ ...essay, points: e.target.value })} /><input className="input" placeholder="Conclusion" value={essay.conclusion} onChange={(e) => setEssay({ ...essay, conclusion: e.target.value })} /></div>
        <div className="glass-card rounded-2xl p-5"><h3 className="font-semibold">Paraphrasing Tool</h3><p className="mt-2 text-sm">{paraphrase}</p></div>
        <div className="glass-card rounded-2xl p-5"><h3 className="font-semibold">Reading Timer + Comprehension Check</h3><input className="input mt-2" type="number" value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} /><p className="mt-2 text-sm">Read for {minutes} min then answer:</p><p className="text-sm font-medium">{question}</p></div>
        <div className="glass-card rounded-2xl p-5 lg:col-span-2"><h3 className="font-semibold">Highlight → Flashcard Generator</h3><input className="input mt-2" value={highlight} onChange={(e) => setHighlight(e.target.value)} placeholder="Highlighted text" /><button className="btn-primary mt-2" type="button" onClick={() => setCards([{ id: Date.now(), front: highlight, back: 'Define/explain this concept', mastered: false }, ...cards])}>Create flashcard</button><p className="mt-2 text-sm">Flashcards total: {cards.length}</p></div>
      </div>
    </PageShell>
  );
}
