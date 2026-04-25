import { useMemo, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import PageShell from '../../components/ui/PageShell';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { uuid } from '../../utils/helpers';

export default function QuizApp() {
  const [questions, setQuestions] = useLocalStorage('study_quiz_questions', []);
  const [prompt, setPrompt] = useState('');
  const [answer, setAnswer] = useState('');
  const [mode, setMode] = useState('build');
  const [cursor, setCursor] = useState(0);
  const [score, setScore] = useState(0);
  const [guess, setGuess] = useState('');

  const finished = cursor >= questions.length;
  const accuracy = useMemo(() => (questions.length ? Math.round((score / questions.length) * 100) : 0), [score, questions.length]);

  const addQuestion = (e) => {
    e.preventDefault();
    if (!prompt.trim() || !answer.trim()) return;
    setQuestions([...questions, { id: uuid(), prompt, answer: answer.trim().toLowerCase() }]);
    setPrompt(''); setAnswer('');
  };

  const submitAnswer = (e) => {
    e.preventDefault();
    if (!guess.trim() || finished) return;
    if (guess.trim().toLowerCase() === questions[cursor].answer) setScore((s) => s + 1);
    setGuess('');
    setCursor((c) => c + 1);
  };

  return (
    <PageShell>
      <div>
      <PageTitle title="Quiz App" description="Create your own question bank and run quick self-tests." />
      <div className="mb-4 flex gap-2">
        <button className={`btn-secondary ${mode === 'build' ? 'ring-2 ring-indigo-500' : ''}`} onClick={() => setMode('build')} type="button">Create</button>
        <button className={`btn-secondary ${mode === 'take' ? 'ring-2 ring-indigo-500' : ''}`} onClick={() => { setMode('take'); setCursor(0); setScore(0); setGuess(''); }} type="button">Take Quiz</button>
      </div>

      {mode === 'build' ? (
        <form className="glass-card rounded-2xl p-5 space-y-3" onSubmit={addQuestion}>
          <input className="input" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Question prompt" />
          <input className="input" value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Correct answer" />
          <button className="btn-primary" type="submit">Add question</button>
          <p className="text-sm text-slate-500">{questions.length} question(s) saved.</p>
        </form>
      ) : (
        <div className="glass-card rounded-2xl p-5">
          {questions.length === 0 ? (
            <p className="text-sm text-slate-500">No questions yet. Create some first.</p>
          ) : finished ? (
            <div>
              <p className="text-xl font-semibold">Quiz Complete</p>
              <p className="mt-2">Score: {score}/{questions.length} ({accuracy}%)</p>
            </div>
          ) : (
            <form onSubmit={submitAnswer} className="space-y-3">
              <p className="text-sm text-slate-500">Question {cursor + 1} of {questions.length}</p>
              <p className="text-lg font-semibold">{questions[cursor].prompt}</p>
              <input className="input" value={guess} onChange={(e) => setGuess(e.target.value)} placeholder="Your answer" />
              <button className="btn-primary" type="submit">Submit</button>
            </form>
          )}
        </div>
      )}
      </div>
    </PageShell>
  );
}
