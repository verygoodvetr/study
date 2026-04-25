import { motion } from 'framer-motion';

export default function AnimatedCard({ className = '', children }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      whileHover={{ y: -2 }}
      className={`glass-card ${className}`}
    >
      {children}
    </motion.div>
  );
}
