import { motion } from 'framer-motion';

export default function PageTitle({ title, description }) {
  return (
    <motion.div className="mb-6" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{description}</p>
    </motion.div>
  );
}
