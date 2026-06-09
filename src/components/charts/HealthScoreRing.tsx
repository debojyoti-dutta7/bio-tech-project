import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { AnimatedCounter } from '../ui/AnimatedCounter';

interface HealthScoreRingProps {
  score: number;
}

function getScoreColor(score: number): string {
  if (score >= 80) return '#22C55E';
  if (score >= 60) return '#F59E0B';
  return '#EF4444';
}

export function HealthScoreRing({ score }: HealthScoreRingProps) {
  const color = getScoreColor(score);
  const data = [
    { value: score },
    { value: 100 - score },
  ];

  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={160}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={65}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            stroke="none"
          >
            <Cell fill={color} />
            <Cell fill="#E2E8F0" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <AnimatedCounter value={score} className="text-2xl font-bold text-text" />
        <span className="text-xs text-muted">/ 100</span>
      </div>
    </div>
  );
}
