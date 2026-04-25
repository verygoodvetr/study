import { useMemo, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { uuid } from '../../utils/helpers';

export default function ExamCountdownApp() {
  const [exams, setExams] = useLocalStorage('study_exam_countdowns', []);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');

  const upcoming = useMemo(
    () => exams.map((exam) => {
      const days = Math.ceil((new Date(exam.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
      return { ...exam, days };
    }).sort((a, b) => a.days - b.days),
    [exams],
  );

  const addExam = (e) => {
    e.preventDefault();
    if (!name.trim() || !date) return;
    setExams([...exams, { id: uuid(), name, date }]);
    setName('');
    setDate('');
  };

  return (
    <div>
      <PageTitle title="Exam Countdown" description="Add upcoming exams and track days remaining." />
      <form className="card grid gap-3 sm:grid-cols-3" onSubmit={addExam}>
        <input className="input sm:col-span-2" value={name} onChange={(e) => setName(e.target.value)} placeholder="Exam name" />
        <input className="input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <button className="btn-primary sm:col-span-3" type="submit">Add exam</button>
      </form>
      <div className="mt-4 space-y-2">
        {upcoming.length === 0 && <div className="card text-sm text-slate-500">No exams scheduled yet.</div>}
        {upcoming.map((exam) => (
          <div key={exam.id} className="card flex items-center justify-between">
            <div>
              <p className="font-medium">{exam.name}</p>
              <p className="text-xs text-slate-500">{exam.date}</p>
            </div>
            <p className={`text-sm font-semibold ${exam.days < 0 ? 'text-rose-500' : 'text-indigo-600'}`}>
              {exam.days < 0 ? `${Math.abs(exam.days)} days ago` : `${exam.days} days left`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
