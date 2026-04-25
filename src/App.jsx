import { lazy } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';

const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const FlashcardsApp = lazy(() => import('./pages/Flashcards/FlashcardsApp'));
const PomodoroApp = lazy(() => import('./pages/Pomodoro/PomodoroApp'));
const NotesApp = lazy(() => import('./pages/Notes/NotesApp'));
const QuizApp = lazy(() => import('./pages/Quiz/QuizApp'));
const PlannerApp = lazy(() => import('./pages/Planner/PlannerApp'));
const HabitsApp = lazy(() => import('./pages/Habits/HabitsApp'));
const MindMapApp = lazy(() => import('./pages/MindMap/MindMapApp'));
const FocusApp = lazy(() => import('./pages/Focus/FocusApp'));
const FormulaViewerApp = lazy(() => import('./pages/Formula/FormulaViewerApp'));
const ExamCountdownApp = lazy(() => import('./pages/Countdown/ExamCountdownApp'));
const EquationSolverApp = lazy(() => import('./pages/Equation/EquationSolverApp'));
const GraphVisualizerApp = lazy(() => import('./pages/Graph/GraphVisualizerApp'));
const UnitConverterApp = lazy(() => import('./pages/UnitConverter/UnitConverterApp'));
const ChemistryHelperApp = lazy(() => import('./pages/Chemistry/ChemistryHelperApp'));
const PhysicsCalculatorApp = lazy(() => import('./pages/Physics/PhysicsCalculatorApp'));
const VocabularyTrainerApp = lazy(() => import('./pages/Vocabulary/VocabularyTrainerApp'));
const GrammarCheckerApp = lazy(() => import('./pages/Grammar/GrammarCheckerApp'));
const ReadingPracticeApp = lazy(() => import('./pages/Reading/ReadingPracticeApp'));
const TextHighlighterApp = lazy(() => import('./pages/Highlighter/TextHighlighterApp'));
const AnalyticsApp = lazy(() => import('./pages/Analytics/AnalyticsApp'));
const GoalsApp = lazy(() => import('./pages/Goals/GoalsApp'));
const DistractionApp = lazy(() => import('./pages/Distraction/DistractionApp'));

const AdvancedSmartToolsApp = lazy(() => import('./pages/AdvancedSmart/AdvancedSmartToolsApp'));
const AnalyticsMetaLearningApp = lazy(() => import('./pages/AnalyticsMeta/AnalyticsMetaLearningApp'));
const MathToolsMegaApp = lazy(() => import('./pages/MathLab/MathToolsMegaApp'));
const ScienceToolsMegaApp = lazy(() => import('./pages/ScienceLab/ScienceToolsMegaApp'));
const LanguageToolsMegaApp = lazy(() => import('./pages/LanguageLab/LanguageToolsMegaApp'));
const ReadingWritingToolsApp = lazy(() => import('./pages/ReadingWriting/ReadingWritingToolsApp'));
const ProductivityToolsApp = lazy(() => import('./pages/Productivity/ProductivityToolsApp'));
const MotivationGamificationApp = lazy(() => import('./pages/Motivation/MotivationGamificationApp'));
const CreativeToolsApp = lazy(() => import('./pages/Creative/CreativeToolsApp'));
const AISpecificToolsApp = lazy(() => import('./pages/AITools/AISpecificToolsApp'));

export default function App() {
  const location = useLocation();

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
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
          <Route path="/equation-solver" element={<EquationSolverApp />} />
          <Route path="/graph-visualizer" element={<GraphVisualizerApp />} />
          <Route path="/unit-converter" element={<UnitConverterApp />} />
          <Route path="/chemistry-helper" element={<ChemistryHelperApp />} />
          <Route path="/physics-calculator" element={<PhysicsCalculatorApp />} />
          <Route path="/vocabulary-trainer" element={<VocabularyTrainerApp />} />
          <Route path="/grammar-checker" element={<GrammarCheckerApp />} />
          <Route path="/reading-practice" element={<ReadingPracticeApp />} />
          <Route path="/text-highlighter" element={<TextHighlighterApp />} />
          <Route path="/analytics" element={<AnalyticsApp />} />
          <Route path="/goals" element={<GoalsApp />} />
          <Route path="/distraction-tracker" element={<DistractionApp />} />

          <Route path="/advanced-smart-tools" element={<AdvancedSmartToolsApp />} />
          <Route path="/analytics-meta-learning" element={<AnalyticsMetaLearningApp />} />
          <Route path="/math-tools-pack" element={<MathToolsMegaApp />} />
          <Route path="/science-tools-pack" element={<ScienceToolsMegaApp />} />
          <Route path="/language-tools-pack" element={<LanguageToolsMegaApp />} />
          <Route path="/reading-writing-tools" element={<ReadingWritingToolsApp />} />
          <Route path="/productivity-tools-pack" element={<ProductivityToolsApp />} />
          <Route path="/motivation-gamification-pack" element={<MotivationGamificationApp />} />
          <Route path="/creative-tools-pack" element={<CreativeToolsApp />} />
          <Route path="/ai-specific-tools-pack" element={<AISpecificToolsApp />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
}
