import { useRef, useState } from 'react';
import AnimatedButton from './ui/AnimatedButton';
import AnimatedCard from './ui/AnimatedCard';

const STORAGE_KEYS = [
  'study_flashcards',
  'study_pomodoro_stats',
  'study_notes',
  'study_quiz_questions',
  'study_planner_tasks',
  'study_habits',
  'study_mindmap_nodes',
  'study_exam_countdowns',
  'study_goals',
  'study_distraction_log',
  'study_theme',
];

export default function DataTools() {
  const inputRef = useRef(null);
  const [message, setMessage] = useState('');

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
    setMessage('Export complete.');
  };

  const importData = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      STORAGE_KEYS.forEach((key) => {
        if (parsed[key] !== undefined) localStorage.setItem(key, parsed[key]);
      });
      setMessage('Import complete. Reloading...');
      setTimeout(() => window.location.reload(), 700);
    } catch {
      setMessage('Invalid JSON file.');
    }
  };

  const sendNotification = async () => {
    if (!('Notification' in window)) {
      setMessage('Browser notifications unavailable.');
      return;
    }
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      new Notification('Study Suite', { body: 'Great work — time for your next focused block.' });
      setMessage('Notification sent.');
    } else {
      setMessage('Notification permission denied.');
    }
  };

  return (
    <AnimatedCard className="mt-6">
      <h2 className="font-semibold">Backup, import & reminders</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        <AnimatedButton type="button" className="btn-secondary" onClick={exportData}>Export JSON</AnimatedButton>
        <AnimatedButton type="button" className="btn-secondary" onClick={() => inputRef.current?.click()}>Import JSON</AnimatedButton>
        <AnimatedButton type="button" className="btn-secondary" onClick={sendNotification}>Test reminder</AnimatedButton>
      </div>
      <input ref={inputRef} type="file" accept="application/json" className="hidden" onChange={importData} />
      {message && <p className="mt-2 text-xs text-slate-500">{message}</p>}
    </AnimatedCard>
  );
}
