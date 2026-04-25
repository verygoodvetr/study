import { Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import AnimatedButton from './ui/AnimatedButton';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 border-b border-white/20 bg-white/70 backdrop-blur-xl dark:border-slate-700/40 dark:bg-slate-950/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Link to="/" className="text-lg font-bold tracking-tight text-indigo-600 dark:text-indigo-300">
            Study Suite Pro
          </Link>
        </motion.div>
        <AnimatedButton className="btn-secondary" onClick={toggleTheme} type="button" aria-label="Toggle color mode">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </AnimatedButton>
      </div>
    </header>
  );
}
