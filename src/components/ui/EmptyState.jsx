import { motion } from 'framer-motion';

export default function EmptyState({ icon: Icon, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-700"
    >
      {Icon && <Icon className="mb-3 text-indigo-500" size={28} />}
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-1 max-w-md text-sm text-slate-500 dark:text-slate-400">{description}</p>
    </motion.div>
  );
}
