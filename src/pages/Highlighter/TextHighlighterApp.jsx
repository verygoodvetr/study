import { useMemo, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import PageShell from '../../components/ui/PageShell';

export default function TextHighlighterApp() {
  const [text, setText] = useState('');
  const [keyword, setKeyword] = useState('');

  const highlighted = useMemo(() => {
    if (!keyword.trim()) return text;
    const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return text.replace(new RegExp(`(${escaped})`, 'gi'), '<mark>$1</mark>');
  }, [text, keyword]);

  return (
    <PageShell>
      <PageTitle title="Text Highlighter + Notes" description="Highlight important concepts by keyword and annotate quickly." />
      <div className="glass-card rounded-2xl p-5 space-y-3">
        <input className="input" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Keyword to highlight" />
        <textarea className="input min-h-36" value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste article or textbook excerpt" />
        <article className="prose prose-sm max-w-none rounded-xl bg-slate-100 p-3 dark:prose-invert dark:bg-slate-800" dangerouslySetInnerHTML={{ __html: highlighted.replace(/\n/g, '<br/>') }} />
      </div>
    </PageShell>
  );
}
