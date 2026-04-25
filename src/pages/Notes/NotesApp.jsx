import { useMemo, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import PageShell from '../../components/ui/PageShell';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { uuid } from '../../utils/helpers';

export default function NotesApp() {
  const [notes, setNotes] = useLocalStorage('study_notes', []);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [filter, setFilter] = useState('all');

  const availableTags = useMemo(() => [...new Set(notes.flatMap((n) => n.tags))], [notes]);
  const visible = useMemo(() => notes.filter((n) => filter === 'all' || n.tags.includes(filter)), [notes, filter]);

  const saveNote = (event) => {
    event.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setNotes([{ id: uuid(), title, content, tags: tags.split(',').map((t) => t.trim()).filter(Boolean), updatedAt: Date.now() }, ...notes]);
    setTitle(''); setContent(''); setTags('');
  };

  return (
    <PageShell>
      <div>
      <PageTitle title="Notes App" description="Auto-saved notes with tags for quick study organization." />
      <form className="glass-card rounded-2xl p-5 space-y-3" onSubmit={saveNote}>
        <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Note title" />
        <textarea className="input min-h-28" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your note" />
        <input className="input" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Tags (comma separated)" />
        <button className="btn-primary" type="submit">Save note</button>
      </form>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" className={`btn-secondary ${filter === 'all' ? 'ring-2 ring-indigo-500' : ''}`} onClick={() => setFilter('all')}>All</button>
        {availableTags.map((tag) => (
          <button key={tag} type="button" className={`btn-secondary ${filter === tag ? 'ring-2 ring-indigo-500' : ''}`} onClick={() => setFilter(tag)}>{tag}</button>
        ))}
      </div>
      <div className="mt-4 space-y-3">
        {visible.length === 0 && <div className="glass-card rounded-2xl p-5 text-sm text-slate-500">No notes found for this filter.</div>}
        {visible.map((note) => (
          <article key={note.id} className="glass-card rounded-2xl p-5">
            <h2 className="font-semibold">{note.title}</h2>
            <p className="mt-2 whitespace-pre-wrap text-sm">{note.content}</p>
            <p className="mt-3 text-xs text-slate-500">{new Date(note.updatedAt).toLocaleString()}</p>
          </article>
        ))}
      </div>
      </div>
    </PageShell>
  );
}
