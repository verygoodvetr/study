import { useRef } from 'react';

const STORAGE_KEYS = [
  'study_flashcards',
  'study_pomodoro_stats',
  'study_notes',
  'study_quiz_questions',
  'study_planner_tasks',
  'study_habits',
  'study_mindmap_nodes',
  'study_exam_countdowns',
  'study_theme',
];

export default function DataTools() {
  const inputRef = useRef(null);

  const exportData = () => {
    const payload = STORAGE_KEYS.reduce((acc, key) => {
      acc[key] = localStorage.getItem(key);
      return acc;
    }, {});
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `study-suite-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importData = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    const parsed = JSON.parse(text);
    STORAGE_KEYS.forEach((key) => {
      if (parsed[key] !== undefined) localStorage.setItem(key, parsed[key]);
    });
    window.location.reload();
  };

  const sendNotification = async () => {
    if (!('Notification' in window)) return;
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      new Notification('Study Suite', { body: 'Great work — time for your next focused block.' });
    }
  };

  return (
    <div className="card mt-6">
      <h2 className="font-semibold">Backup & utilities</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" className="btn-secondary" onClick={exportData}>Export JSON</button>
        <button type="button" className="btn-secondary" onClick={() => inputRef.current?.click()}>Import JSON</button>
        <button type="button" className="btn-secondary" onClick={sendNotification}>Test notification</button>
      </div>
      <input ref={inputRef} type="file" accept="application/json" className="hidden" onChange={importData} />
    </div>
  );
}
