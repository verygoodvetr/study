import {
  Atom,
  BarChart3,
  Beaker,
  BookOpenCheck,
  Brain,
  CalendarClock,
  FileText,
  Flame,
  Goal,
  Languages,
  LineChart,
  ListChecks,
  Map,
  Sigma,
  Target,
  Timer,
  Waves,
  PencilRuler,
  BookText,
  AlarmClock,
  Lightbulb,
} from 'lucide-react';

export const appGroups = [
  {
    title: 'Core Study',
    apps: [
      { path: '/flashcards', name: 'Flashcards', purpose: 'Flip cards and track mastery.', icon: BookOpenCheck },
      { path: '/pomodoro', name: 'Pomodoro Timer', purpose: 'Timed deep-work sessions with stats.', icon: Timer },
      { path: '/notes', name: 'Notes', purpose: 'Tag notes with autosave.', icon: FileText },
      { path: '/quiz', name: 'Quiz Builder', purpose: 'Create and take quizzes.', icon: Brain },
      { path: '/planner', name: 'Study Planner', purpose: 'Tasks + deadlines.', icon: ListChecks },
      { path: '/habits', name: 'Habit Tracker', purpose: 'Daily consistency tracking.', icon: Flame },
      { path: '/mind-map', name: 'Mind Map', purpose: 'Node linking for concepts.', icon: Map },
      { path: '/focus', name: 'Focus Mode', purpose: 'Fullscreen-like minimal mode.', icon: Goal },
      { path: '/formulas', name: 'Formula Viewer', purpose: 'Quick formula reference.', icon: Sigma },
      { path: '/countdown', name: 'Exam Countdown', purpose: 'Multiple exam timers.', icon: CalendarClock },
    ],
  },
  {
    title: 'Math & Science',
    apps: [
      { path: '/equation-solver', name: 'Equation Solver', purpose: 'Linear/quadratic step solver.', icon: PencilRuler },
      { path: '/graph-visualizer', name: 'Graph Visualizer', purpose: 'Function plotter.', icon: LineChart },
      { path: '/unit-converter', name: 'Unit Converter', purpose: 'Fast scientific conversions.', icon: Waves },
      { path: '/chemistry-helper', name: 'Chemistry Helper', purpose: 'Periodic table + molar mass.', icon: Beaker },
      { path: '/physics-calculator', name: 'Physics Calculator', purpose: 'Core physics equations.', icon: Atom },
    ],
  },
  {
    title: 'Languages',
    apps: [
      { path: '/vocabulary-trainer', name: 'Vocabulary Trainer', purpose: 'Spaced repetition sessions.', icon: Languages },
      { path: '/grammar-checker', name: 'Grammar Checker', purpose: 'Heuristic grammar cleanup.', icon: BookText },
      { path: '/reading-practice', name: 'Reading Practice', purpose: 'WPM, comprehension and pacing.', icon: BookOpenCheck },
    ],
  },
  {
    title: 'Advanced Insights',
    apps: [
      { path: '/text-highlighter', name: 'Text Highlighter', purpose: 'Annotate pasted text with highlights.', icon: Lightbulb },
      { path: '/analytics', name: 'Session Analytics', purpose: 'Cross-app progress snapshots.', icon: BarChart3 },
      { path: '/goals', name: 'Goal Tracker', purpose: 'Long-term goal roadmap.', icon: Target },
      { path: '/distraction-tracker', name: 'Distraction Tracker', purpose: 'Focused vs wasted time.', icon: AlarmClock },
    ],
  },
];

export const flatApps = appGroups.flatMap((group) => group.apps);
