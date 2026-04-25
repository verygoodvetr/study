import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import FlashcardsApp from './pages/Flashcards/FlashcardsApp';
import PomodoroApp from './pages/Pomodoro/PomodoroApp';
import NotesApp from './pages/Notes/NotesApp';
import QuizApp from './pages/Quiz/QuizApp';
import PlannerApp from './pages/Planner/PlannerApp';
import HabitsApp from './pages/Habits/HabitsApp';
import MindMapApp from './pages/MindMap/MindMapApp';
import FocusApp from './pages/Focus/FocusApp';
import FormulaViewerApp from './pages/Formula/FormulaViewerApp';
import ExamCountdownApp from './pages/Countdown/ExamCountdownApp';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/flashcards" element={<FlashcardsApp />} />
        <Route path="/pomodoro" element={<PomodoroApp />} />
        <Route path="/notes" element={<NotesApp />} />
        <Route path="/quiz" element={<QuizApp />} />
        <Route path="/planner" element={<PlannerApp />} />
        <Route path="/habits" element={<HabitsApp />} />
        <Route path="/mind-map" element={<MindMapApp />} />
        <Route path="/focus" element={<FocusApp />} />
        <Route path="/formulas" element={<FormulaViewerApp />} />
        <Route path="/countdown" element={<ExamCountdownApp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
