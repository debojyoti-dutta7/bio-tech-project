import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-text mb-2">{title}</h3>
      <p className="text-sm text-muted max-w-sm mb-6">{description}</p>
      {action}
    </motion.div>
  );
}
