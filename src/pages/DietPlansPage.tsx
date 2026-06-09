import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Utensils,
  Download,
  FileText,
  Sun,
  Moon,
  Coffee,
  Apple,
  Droplets,
  CheckCircle,
  XCircle,
  Lightbulb,
  ArrowRight,
} from 'lucide-react';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { AnimatedCounter } from '../components/ui/AnimatedCounter';
import { MacroChart } from '../components/charts/MacroChart';
import { getAnalyses } from '../utils/storage';
import { exportDietPlanPDF, exportHealthReportPDF } from '../utils/pdf';
import { formatLabel } from '../utils/format';
import { images } from '../assets/images';
import type { AnalysisResult } from '../types';

type SavedAnalysis = AnalysisResult & { id?: string };

export function DietPlansPage() {
  const analyses = getAnalyses();
  const [selected, setSelected] = useState<SavedAnalysis | null>(analyses[0] || null);

  if (!selected) {
    return (
      <EmptyState
        icon={<Utensils className="h-8 w-8" />}
        title="No Diet Plan Available"
        description="Complete a health analysis first to generate your personalized AI diet plan."
        action={
          <Link to="/dashboard/health">
            <Button icon={<ArrowRight className="h-4 w-4" />}>Start Health Analysis</Button>
          </Link>
        }
      />
    );
  }

  const { analysis, bmi, bmiCategory, healthScore, user } = selected;
  const cal = analysis.calorie_requirement;

  const meals = [
    { key: 'breakfast', plan: analysis.breakfast_plan, icon: Sun },
    { key: 'lunch', plan: analysis.lunch_plan, icon: Coffee },
    { key: 'dinner', plan: analysis.dinner_plan, icon: Moon },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="relative rounded-3xl overflow-hidden border border-border shadow-card">
        <img
          src={images.vegetables}
          alt="Fresh whole foods"
          className="w-full h-32 sm:h-40 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-text/80 via-text/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-9">
          <p className="text-xs font-semibold text-primary mb-1">AI DIET PLAN</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Nutrition plan for {user.name.split(' ')[0]}
          </h1>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-text">Your Personalized Plan</h2>
          <p className="text-muted text-sm mt-1">
            Goal: {formatLabel(user.healthGoal)} · {formatLabel(user.dietaryPreference)}
          </p>
        </div>
        <div className="flex gap-2">
          {analyses.length > 1 && (
            <select
              className="rounded-xl border border-border bg-card px-3 py-2 text-sm"
              onChange={(e) => {
                const found = analyses.find((a) => a.id === e.target.value);
                if (found) setSelected(found);
              }}
              value={selected.id}
            >
              {analyses.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.user.name} — {new Date(a.generatedAt).toLocaleDateString()}
                </option>
              ))}
            </select>
          )}
          <Button variant="outline" size="sm" onClick={() => exportDietPlanPDF(selected)} icon={<Download className="h-4 w-4" />}>
            Export Diet Plan
          </Button>
          <Button variant="outline" size="sm" onClick={() => exportHealthReportPDF(selected)} icon={<FileText className="h-4 w-4" />}>
            Health Report
          </Button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Daily Calories', value: cal.daily_calories, suffix: ' kcal', color: 'text-primary' },
          { label: 'BMI', value: bmi, suffix: ` (${bmiCategory})`, color: 'text-accent', decimals: 1 },
          { label: 'Health Score', value: healthScore, suffix: '/100', color: 'text-secondary' },
          { label: 'Hydration', value: analysis.hydration.daily_liters, suffix: ' L/day', color: 'text-primary', decimals: 1 },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card padding="sm">
              <p className="text-xs text-muted">{stat.label}</p>
              <p className={`text-xl font-bold mt-1 ${stat.color}`}>
                <AnimatedCounter value={stat.value as number} decimals={stat.decimals ?? 0} suffix={stat.suffix} />
              </p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader title="Health Assessment" subtitle="AI-generated comprehensive analysis" icon={<FileText className="h-5 w-5" />} />
          <p className="text-sm text-muted leading-relaxed mb-4">{analysis.health_assessment}</p>
          <div className="p-4 bg-background rounded-xl">
            <p className="text-xs font-medium text-text mb-1">BMI Interpretation</p>
            <p className="text-sm text-muted">{analysis.bmi_interpretation}</p>
          </div>
        </Card>

        <Card>
          <CardHeader title="Macro Breakdown" subtitle={cal.explanation} />
          <MacroChart protein={cal.protein_g} carbs={cal.carbs_g} fats={cal.fats_g} />
          <div className="grid grid-cols-3 gap-2 mt-4">
            {[
              { label: 'Protein', value: `${cal.protein_g}g`, color: 'bg-primary/10 text-primary' },
              { label: 'Carbs', value: `${cal.carbs_g}g`, color: 'bg-accent/10 text-accent' },
              { label: 'Fats', value: `${cal.fats_g}g`, color: 'bg-amber-500/10 text-amber-600' },
            ].map((m) => (
              <div key={m.label} className={`rounded-xl p-3 text-center ${m.color}`}>
                <p className="text-xs">{m.label}</p>
                <p className="font-bold text-sm mt-0.5">{m.value}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-text mb-4">Daily Meal Plan</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {meals.map(({ key, plan, icon: Icon }, i) => (
            <motion.div key={key} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }}>
              <Card hover className="h-full">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text capitalize">{key}</p>
                    <p className="text-xs text-muted">{plan.calories} kcal</p>
                  </div>
                </div>
                <p className="text-sm font-medium text-text mb-2">{plan.meal}</p>
                <ul className="space-y-1.5">
                  {plan.items.map((item) => (
                    <li key={item} className="text-xs text-muted flex items-start gap-2">
                      <CheckCircle className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader title="Snacks" icon={<Apple className="h-5 w-5" />} />
        <div className="grid sm:grid-cols-2 gap-3">
          {analysis.snacks.map((snack) => (
            <div key={snack.name} className="flex items-center justify-between p-3 rounded-xl bg-background">
              <span className="text-sm text-text">{snack.name}</span>
              <span className="text-xs font-medium text-primary">{snack.calories} kcal</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid sm:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="Recommended Foods" icon={<CheckCircle className="h-5 w-5 text-primary" />} />
          <div className="flex flex-wrap gap-2">
            {analysis.recommended_foods.map((food) => (
              <span key={food} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                {food}
              </span>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Foods to Avoid" icon={<XCircle className="h-5 w-5 text-red-500" />} />
          <div className="flex flex-wrap gap-2">
            {analysis.foods_to_avoid.map((food) => (
              <span key={food} className="px-3 py-1.5 rounded-full bg-red-50 text-red-600 text-xs font-medium">
                {food}
              </span>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="Hydration" icon={<Droplets className="h-5 w-5 text-accent" />} />
          <p className="text-2xl font-bold text-accent mb-3">
            <AnimatedCounter value={analysis.hydration.daily_liters} decimals={1} suffix=" L/day" />
          </p>
          <ul className="space-y-2">
            {analysis.hydration.tips.map((tip) => (
              <li key={tip} className="text-sm text-muted flex items-start gap-2">
                <Droplets className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                {tip}
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <CardHeader title="Lifestyle Tips" icon={<Lightbulb className="h-5 w-5 text-amber-500" />} />
          <ul className="space-y-2">
            {analysis.lifestyle_tips.map((tip, i) => (
              <li key={tip} className="text-sm text-muted flex items-start gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 text-xs font-bold shrink-0">
                  {i + 1}
                </span>
                {tip}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="p-4 bg-background rounded-xl text-xs text-muted">
        Goal: {formatLabel(user.healthGoal)} | Diet: {formatLabel(user.dietaryPreference)} | Activity: {formatLabel(user.activityLevel)}
      </div>
    </div>
  );
}
