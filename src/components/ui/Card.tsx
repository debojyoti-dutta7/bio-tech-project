import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

const paddings = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({ children, className = '', hover = false, padding = 'md' }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={hover ? { y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.08)' } : undefined}
      className={`bg-card rounded-2xl border border-border shadow-sm ${paddings[padding]} ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function CardHeader({ title, subtitle, icon }: { title: string; subtitle?: string; icon?: ReactNode }) {
  return (
    <div className="flex items-start gap-3 mb-4">
      {icon && (
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
          {icon}
        </div>
      )}
      <div>
        <h3 className="text-lg font-semibold text-text">{title}</h3>
        {subtitle && <p className="text-sm text-muted mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}
