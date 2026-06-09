import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { AnimatedCounter } from '../ui/AnimatedCounter';

interface BMIGaugeProps {
  bmi: number;
  category: string;
  color: string;
}

export function BMIGauge({ bmi, category, color }: BMIGaugeProps) {
  const maxBMI = 40;
  const percentage = Math.min((bmi / maxBMI) * 100, 100);
  const data = [
    { value: percentage },
    { value: 100 - percentage },
  ];

  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="80%"
            startAngle={180}
            endAngle={0}
            innerRadius={70}
            outerRadius={95}
            paddingAngle={0}
            dataKey="value"
            stroke="none"
          >
            <Cell fill={color} />
            <Cell fill="#E2E8F0" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
        <AnimatedCounter value={bmi} decimals={1} className="text-3xl font-bold text-text" />
        <span className="text-sm font-medium mt-1" style={{ color }}>
          {category}
        </span>
      </div>
    </div>
  );
}
