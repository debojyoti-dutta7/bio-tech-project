import jsPDF from 'jspdf';
import type { AnalysisResult } from '../types';

export function exportDietPlanPDF(result: AnalysisResult): void {
  const doc = new jsPDF();
  const { user, analysis, bmi, bmiCategory, healthScore } = result;
  let y = 20;

  const addLine = (text: string, size = 10, bold = false) => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(size);
    doc.setFont('helvetica', bold ? 'bold' : 'normal');
    const lines = doc.splitTextToSize(text, 170);
    doc.text(lines, 20, y);
    y += lines.length * (size * 0.45) + 4;
  };

  doc.setFillColor(34, 197, 94);
  doc.rect(0, 0, 210, 35, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('BioGuide AI – Diet Plan', 20, 22);
  doc.setFontSize(10);
  doc.text(`Generated: ${new Date(result.generatedAt).toLocaleDateString()}`, 20, 30);

  doc.setTextColor(15, 23, 42);
  y = 45;

  addLine('PATIENT PROFILE', 14, true);
  addLine(`Name: ${user.name} | Age: ${user.age} | Gender: ${user.gender}`);
  addLine(`BMI: ${bmi} (${bmiCategory}) | Health Score: ${healthScore}/100`);
  addLine(`Goal: ${user.healthGoal.replace(/_/g, ' ')} | Diet: ${user.dietaryPreference.replace(/_/g, ' ')}`);

  addLine('DAILY CALORIE REQUIREMENT', 14, true);
  const cal = analysis.calorie_requirement;
  addLine(`${cal.daily_calories} kcal | Protein: ${cal.protein_g}g | Carbs: ${cal.carbs_g}g | Fats: ${cal.fats_g}g`);
  addLine(cal.explanation);

  const meals = [
    { label: 'BREAKFAST', plan: analysis.breakfast_plan },
    { label: 'LUNCH', plan: analysis.lunch_plan },
    { label: 'DINNER', plan: analysis.dinner_plan },
  ];

  meals.forEach(({ label, plan }) => {
    addLine(label, 12, true);
    addLine(`${plan.meal} (${plan.calories} kcal)`);
    plan.items.forEach((item) => addLine(`  • ${item}`));
  });

  addLine('SNACKS', 12, true);
  analysis.snacks.forEach((s) => addLine(`  • ${s.name} (${s.calories} kcal)`));

  addLine('RECOMMENDED FOODS', 12, true);
  addLine(analysis.recommended_foods.join(', '));

  addLine('FOODS TO AVOID', 12, true);
  addLine(analysis.foods_to_avoid.join(', '));

  addLine('HYDRATION', 12, true);
  addLine(`Daily: ${analysis.hydration.daily_liters} liters`);
  analysis.hydration.tips.forEach((tip) => addLine(`  • ${tip}`));

  doc.save(`BioGuide_DietPlan_${user.name.replace(/\s/g, '_')}.pdf`);
}

export function exportHealthReportPDF(result: AnalysisResult): void {
  const doc = new jsPDF();
  const { user, analysis, bmi, bmiCategory, healthScore } = result;
  let y = 20;

  const addLine = (text: string, size = 10, bold = false) => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(size);
    doc.setFont('helvetica', bold ? 'bold' : 'normal');
    const lines = doc.splitTextToSize(text, 170);
    doc.text(lines, 20, y);
    y += lines.length * (size * 0.45) + 4;
  };

  doc.setFillColor(20, 184, 166);
  doc.rect(0, 0, 210, 35, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('BioGuide AI – Health Report', 20, 22);

  doc.setTextColor(15, 23, 42);
  y = 45;

  addLine('HEALTH ASSESSMENT', 14, true);
  addLine(analysis.health_assessment);

  addLine('BMI INTERPRETATION', 14, true);
  addLine(`BMI: ${bmi} – ${bmiCategory} | Health Score: ${healthScore}/100`);
  addLine(analysis.bmi_interpretation);

  addLine('LIFESTYLE RECOMMENDATIONS', 14, true);
  analysis.lifestyle_tips.forEach((tip, i) => addLine(`${i + 1}. ${tip}`));

  doc.save(`BioGuide_HealthReport_${user.name.replace(/\s/g, '_')}.pdf`);
}
