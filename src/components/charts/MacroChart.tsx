import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface MacroChartProps {
  protein: number;
  carbs: number;
  fats: number;
}

const COLORS = ['#22C55E', '#3B82F6', '#F59E0B'];

export function MacroChart({ protein, carbs, fats }: MacroChartProps) {
  const data = [
    { name: 'Protein', value: protein, unit: 'g' },
    { name: 'Carbs', value: carbs, unit: 'g' },
    { name: 'Fats', value: fats, unit: 'g' },
  ];

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} barSize={40}>
        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
        <Tooltip
          contentStyle={{
            borderRadius: '12px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          }}
          formatter={(value) => [`${value}g`, 'Amount']}
        />
        <Bar dataKey="value" radius={[8, 8, 0, 0]}>
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
