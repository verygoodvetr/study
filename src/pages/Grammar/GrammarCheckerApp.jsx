import { useMemo, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import PageShell from '../../components/ui/PageShell';

function checkGrammar(text) {
  const suggestions = [];
  if (!/[.?!]$/.test(text.trim())) suggestions.push('Sentence should usually end with punctuation.');
  if (/\bi\b/.test(text)) suggestions.push('Capitalize "I" when used as pronoun.');
  if (/\s{2,}/.test(text)) suggestions.push('Remove double spaces.');
  if (/\bteh\b/i.test(text)) suggestions.push('Possible typo: "teh" → "the".');
  return suggestions;
}

export default function GrammarCheckerApp() {
  const [text, setText] = useState('');
  const suggestions = useMemo(() => checkGrammar(text), [text]);

  return (
    <PageShell>
      <PageTitle title="Grammar Checker" description="Lightweight grammar and style checks for quick writing polish." />
      <div className="glass-card rounded-2xl p-5 space-y-3">
        <textarea className="input min-h-44" value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste text to check grammar" />
        <div className="rounded-xl bg-slate-100 p-3 dark:bg-slate-800">
          <p className="font-medium">Suggestions ({suggestions.length})</p>
          <ul className="mt-2 list-disc pl-4 text-sm">
            {suggestions.length ? suggestions.map((item) => <li key={item}>{item}</li>) : <li>Looks clean.</li>}
          </ul>
        </div>
      </div>
    </PageShell>
  );
}
