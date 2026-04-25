import { useMemo, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import PageShell from '../../components/ui/PageShell';

export default function LanguageToolsMegaApp() {
  const [recording, setRecording] = useState(false);
  const [words, setWords] = useState(['I', 'am', 'learning', 'daily']);
  const [target, setTarget] = useState('resilient');
  const [sentence, setSentence] = useState('I am resilient during challenges.');
  const [input, setInput] = useState('i has many book');

  const vocabContext = sentence.replace(target, '_____');
  const grammarExplanation = useMemo(() => {
    const fixes = [];
    if (/\bi\b/.test(input)) fixes.push('Capitalize "I".');
    if (/\bhas\b/.test(input) && /\bbook\b/.test(input)) fixes.push('Use "have" with "I" and pluralize "books".');
    return fixes;
  }, [input]);

  const reorder = (i, dir) => {
    const copy = [...words];
    const j = i + dir;
    if (j < 0 || j >= copy.length) return;
    [copy[i], copy[j]] = [copy[j], copy[i]];
    setWords(copy);
  };

  return (
    <PageShell>
      <PageTitle title="Language Learning Tools" description="Pronunciation, sentence building, contextual vocab, mini conversation, and grammar fixes." />
      <div className="grid gap-3 lg:grid-cols-2">
        <div className="glass-card rounded-2xl p-5"><h3 className="font-semibold">Pronunciation Trainer</h3><button className="btn-secondary mt-2" type="button" onClick={() => setRecording((r) => !r)}>{recording ? 'Stop (simulated)' : 'Record (simulated)'}</button><p className="mt-2 text-sm">Status: {recording ? 'Recording...' : 'Idle'} | Compare with native sample manually.</p></div>
        <div className="glass-card rounded-2xl p-5"><h3 className="font-semibold">Sentence Builder</h3><div className="mt-2 flex flex-wrap gap-2">{words.map((w, i) => <span key={`${w}-${i}`} className="rounded bg-slate-100 px-2 py-1 text-sm dark:bg-slate-800">{w}<button className="ml-1" onClick={() => reorder(i, -1)} type="button">←</button><button className="ml-1" onClick={() => reorder(i, 1)} type="button">→</button></span>)}</div><p className="mt-2 text-sm">Built sentence: {words.join(' ')}.</p></div>
        <div className="glass-card rounded-2xl p-5"><h3 className="font-semibold">Context Vocabulary Trainer</h3><input className="input mt-2" value={target} onChange={(e) => setTarget(e.target.value)} /><textarea className="input mt-2" value={sentence} onChange={(e) => setSentence(e.target.value)} /><p className="mt-2 text-sm">Cloze: {vocabContext}</p></div>
        <div className="glass-card rounded-2xl p-5"><h3 className="font-semibold">Mini Conversation Simulator (AI-powered)</h3><p className="text-sm mt-2">Prompt AI panel with: "Roleplay a café conversation in Spanish and correct me."</p></div>
        <div className="glass-card rounded-2xl p-5 lg:col-span-2"><h3 className="font-semibold">Grammar Fixer + Explanation Tool</h3><textarea className="input mt-2" value={input} onChange={(e) => setInput(e.target.value)} /><ul className="mt-2 list-disc pl-5 text-sm">{grammarExplanation.length ? grammarExplanation.map((f) => <li key={f}>{f}</li>) : <li>No obvious issues.</li>}</ul></div>
      </div>
    </PageShell>
  );
}
