import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export function AnimatedCounter({ value, suffix = '', decimals = 0, className = '' }: AnimatedCounterProps) {
  const spring = useSpring(0, { stiffness: 50, damping: 20 });
  const display = useTransform(spring, (v) => v.toFixed(decimals));
  const [text, setText] = useState('0');

  useEffect(() => {
    spring.set(value);
    const unsub = display.on('change', (v) => setText(v));
    return unsub;
  }, [value, spring, display]);

  return (
    <motion.span className={className}>
      {text}{suffix}
    </motion.span>
  );
}
