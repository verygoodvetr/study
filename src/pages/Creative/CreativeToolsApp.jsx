import { useMemo, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import PageShell from '../../components/ui/PageShell';

export default function CreativeToolsApp() {
  const [palace, setPalace] = useState([{ room: 'Entrance', concept: 'Cell membrane' }]);
  const [concepts, setConcepts] = useState([{ from: 'Photosynthesis', to: 'ATP' }]);
  const [timeline, setTimeline] = useState([{ year: 1789, event: 'French Revolution' }]);
  const [claim, setClaim] = useState('Homework should be shorter');
  const [teachBack, setTeachBack] = useState('');

  const sortedTimeline = useMemo(() => [...timeline].sort((a, b) => a.year - b.year), [timeline]);
  const aiCounter = `Counterpoint: ${claim} can also reduce long-term retention if too short.`;
  const clarity = teachBack.length > 140 ? 'Good depth' : 'Add examples and causal links.';

  return (
    <PageShell>
      <PageTitle title="Creative / Different Tools" description="Memory systems, idea linking, timelines, debate practice, and teach-back evaluation." />
      <div className="grid gap-3 lg:grid-cols-2">
        <div className="glass-card rounded-2xl p-5"><h3 className="font-semibold">Memory Palace Builder</h3>{palace.map((p) => <p key={p.room} className="text-sm mt-1">{p.room}: {p.concept}</p>)}<button className="btn-secondary mt-2" type="button" onClick={() => setPalace([...palace, { room: `Room ${palace.length + 1}`, concept: 'New concept' }])}>Add room</button></div>
        <div className="glass-card rounded-2xl p-5"><h3 className="font-semibold">Concept Linker</h3>{concepts.map((c, i) => <p key={i} className="text-sm mt-1">{c.from} → {c.to}</p>)}<button className="btn-secondary mt-2" type="button" onClick={() => setConcepts([...concepts, { from: 'Concept A', to: 'Concept B' }])}>Add link</button></div>
        <div className="glass-card rounded-2xl p-5"><h3 className="font-semibold">Timeline Builder</h3>{sortedTimeline.map((t, i) => <p key={i} className="text-sm">{t.year}: {t.event}</p>)}<button className="btn-secondary mt-2" type="button" onClick={() => setTimeline([...timeline, { year: new Date().getFullYear(), event: 'New event' }])}>Add event</button></div>
        <div className="glass-card rounded-2xl p-5"><h3 className="font-semibold">Debate Simulator</h3><input className="input mt-2" value={claim} onChange={(e) => setClaim(e.target.value)} /><p className="mt-2 text-sm">{aiCounter}</p></div>
        <div className="glass-card rounded-2xl p-5 lg:col-span-2"><h3 className="font-semibold">Teach-Back Mode</h3><textarea className="input mt-2" value={teachBack} onChange={(e) => setTeachBack(e.target.value)} placeholder="Explain a concept in your own words" /><p className="mt-2 text-sm">Evaluation: {clarity}</p></div>
      </div>
    </PageShell>
  );
}
