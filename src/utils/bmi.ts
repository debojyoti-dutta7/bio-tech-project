export function calculateBMI(weightKg: number, heightCm: number): number {
  const heightM = heightCm / 100;
  return Math.round((weightKg / (heightM * heightM)) * 10) / 10;
}

export function getBMICategory(bmi: number): { category: string; color: string } {
  if (bmi < 18.5) return { category: 'Underweight', color: '#3B82F6' };
  if (bmi < 25) return { category: 'Normal', color: '#22C55E' };
  if (bmi < 30) return { category: 'Overweight', color: '#F59E0B' };
  return { category: 'Obese', color: '#EF4444' };
}

export function calculateHealthScore(
  bmi: number,
  age: number,
  conditions: string[]
): number {
  const categoryScores: Record<string, number> = {
    Underweight: 55,
    Normal: 90,
    Overweight: 65,
    Obese: 40,
  };
  const { category } = getBMICategory(bmi);
  let score = categoryScores[category] ?? 70;

  if (age > 60) score -= 5;
  else if (age > 45) score -= 3;

  const penalties: Record<string, number> = {
    diabetes: 15,
    hypertension: 12,
    thyroid: 8,
  };

  conditions.forEach((c) => {
    if (penalties[c]) score -= penalties[c];
  });

  return Math.max(20, Math.min(100, Math.round(score)));
}
