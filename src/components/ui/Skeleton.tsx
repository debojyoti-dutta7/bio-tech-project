import { motion } from 'framer-motion';

export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className={`rounded-xl bg-border/60 ${className}`}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/6" />
    </div>
  );
}
