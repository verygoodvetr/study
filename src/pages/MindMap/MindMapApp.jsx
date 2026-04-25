import { useState } from 'react';
import PageTitle from '../../components/PageTitle';
import PageShell from '../../components/ui/PageShell';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { uuid } from '../../utils/helpers';

export default function MindMapApp() {
  const [nodes, setNodes] = useLocalStorage('study_mindmap_nodes', []);
  const [text, setText] = useState('');
  const [parentId, setParentId] = useState('');

  const addNode = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setNodes([...nodes, { id: uuid(), text, parentId: parentId || null }]);
    setText('');
    setParentId('');
  };

  return (
    <PageShell>
      <div>
      <PageTitle title="Mind Map Tool" description="Create simple linked nodes to map concepts and dependencies." />
      <form className="glass-card rounded-2xl p-5 grid gap-3 sm:grid-cols-3" onSubmit={addNode}>
        <input className="input sm:col-span-2" value={text} onChange={(e) => setText(e.target.value)} placeholder="Node text" />
        <select className="input" value={parentId} onChange={(e) => setParentId(e.target.value)}>
          <option value="">No parent (root)</option>
          {nodes.map((node) => <option key={node.id} value={node.id}>{node.text}</option>)}
        </select>
        <button type="submit" className="btn-primary sm:col-span-3">Add node</button>
      </form>
      <div className="glass-card rounded-2xl p-5 mt-4 overflow-x-auto">
        {nodes.length === 0 ? (
          <p className="text-sm text-slate-500">No nodes yet.</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {nodes.map((node) => {
              const parent = nodes.find((n) => n.id === node.parentId);
              return (
                <li key={node.id} className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
                  <span className="font-medium">{node.text}</span>
                  <span className="ml-2 text-xs text-slate-500">{parent ? `↳ linked to ${parent.text}` : 'Root node'}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      </div>
    </PageShell>
  );
}
