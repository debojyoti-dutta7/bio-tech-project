import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, Sparkles, AlertCircle } from 'lucide-react';
import { Card, CardHeader } from '../components/ui/Card';
import { Input, Select } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { BMIGauge } from '../components/charts/BMIGauge';
import { HealthScoreRing } from '../components/charts/HealthScoreRing';
import { MacroChart } from '../components/charts/MacroChart';
import { CardSkeleton } from '../components/ui/Skeleton';
import { useAnalysis } from '../hooks/useAnalysis';
import { getProfile } from '../utils/storage';
import { calculateBMI, getBMICategory, calculateHealthScore } from '../utils/bmi';
import { images } from '../assets/images';
import type { UserProfile, HealthCondition } from '../types';

const defaultValues: UserProfile = {
  name: '',
  age: 25,
  gender: 'male',
  height: 170,
  weight: 70,
  activityLevel: 'moderate',
  dietaryPreference: 'non_vegetarian',
  healthGoal: 'healthy_lifestyle',
  conditions: ['none'],
};

export function HealthAnalysisPage() {
  const navigate = useNavigate();
  const { result, loading, error, runAnalysis } = useAnalysis();
  const savedProfile = getProfile();
  const [liveBMI, setLiveBMI] = useState<number | null>(null);
  const [liveCategory, setLiveCategory] = useState('');
  const [liveColor, setLiveColor] = useState('#22C55E');
  const [liveScore, setLiveScore] = useState<number | null>(null);

  const { register, handleSubmit, watch, setValue } = useForm<UserProfile>({
    defaultValues: savedProfile || defaultValues,
  });

  const watched = watch(['height', 'weight', 'age', 'conditions']);

  useEffect(() => {
    const [height, weight, age, conditions] = watched;
    if (height && weight) {
      const bmi = calculateBMI(Number(weight), Number(height));
      const { category, color } = getBMICategory(bmi);
      setLiveBMI(bmi);
      setLiveCategory(category);
      setLiveColor(color);
      if (age) {
        setLiveScore(calculateHealthScore(bmi, Number(age), conditions || []));
      }
    }
  }, [watched]);

  const onSubmit = async (data: UserProfile) => {
    await runAnalysis(data);
    navigate('/dashboard/diet');
  };

  const toggleCondition = (condition: HealthCondition) => {
    const current = watch('conditions') || [];
    if (condition === 'none') {
      setValue('conditions', ['none']);
      return;
    }
    const filtered = current.filter((c) => c !== 'none');
    const updated = filtered.includes(condition)
      ? filtered.filter((c) => c !== condition)
      : [...filtered, condition];
    setValue('conditions', updated.length ? updated : ['none']);
  };

  const conditions = watch('conditions') || ['none'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Health Analysis</h1>
        <p className="text-muted text-sm mt-1">
          Enter your health profile for AI-powered assessment and recommendations
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader
              title="Health Profile"
              subtitle="All fields are required for accurate analysis"
              icon={<Activity className="h-5 w-5" />}
            />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Full Name" placeholder="John Doe" {...register('name', { required: true })} />
                <Input label="Age" type="number" min={1} max={120} {...register('age', { required: true, valueAsNumber: true })} />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Select
                  label="Gender"
                  options={[
                    { value: 'male', label: 'Male' },
                    { value: 'female', label: 'Female' },
                    { value: 'other', label: 'Other' },
                  ]}
                  {...register('gender')}
                />
                <Select
                  label="Activity Level"
                  options={[
                    { value: 'sedentary', label: 'Sedentary' },
                    { value: 'light', label: 'Lightly Active' },
                    { value: 'moderate', label: 'Moderately Active' },
                    { value: 'active', label: 'Very Active' },
                    { value: 'very_active', label: 'Extremely Active' },
                  ]}
                  {...register('activityLevel')}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Height (cm)" type="number" min={100} max={250} {...register('height', { required: true, valueAsNumber: true })} />
                <Input label="Weight (kg)" type="number" min={30} max={300} {...register('weight', { required: true, valueAsNumber: true })} />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Select
                  label="Dietary Preference"
                  options={[
                    { value: 'vegetarian', label: 'Vegetarian' },
                    { value: 'non_vegetarian', label: 'Non-Vegetarian' },
                    { value: 'vegan', label: 'Vegan' },
                  ]}
                  {...register('dietaryPreference')}
                />
                <Select
                  label="Health Goal"
                  options={[
                    { value: 'weight_loss', label: 'Weight Loss' },
                    { value: 'weight_gain', label: 'Weight Gain' },
                    { value: 'muscle_building', label: 'Muscle Building' },
                    { value: 'healthy_lifestyle', label: 'Healthy Lifestyle' },
                  ]}
                  {...register('healthGoal')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">Existing Conditions</label>
                <div className="flex flex-wrap gap-2">
                  {(['none', 'diabetes', 'hypertension', 'thyroid'] as HealthCondition[]).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => toggleCondition(c)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        conditions.includes(c)
                          ? 'bg-primary text-white'
                          : 'bg-background text-muted hover:text-text border border-border'
                      }`}
                    >
                      {c === 'none' ? 'None' : c.charAt(0).toUpperCase() + c.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {error}
                </div>
              )}

              <Button type="submit" loading={loading} size="lg" className="w-full sm:w-auto" icon={<Sparkles className="h-4 w-4" />}>
                Generate AI Analysis
              </Button>
            </form>
          </Card>
        </div>

        <div className="space-y-4">
          {liveBMI ? (
            <>
              <Card>
                <CardHeader title="BMI Overview" subtitle="Real-time calculation" />
                <BMIGauge bmi={liveBMI} category={liveCategory} color={liveColor} />
              </Card>

              {liveScore !== null && (
                <Card>
                  <CardHeader title="Health Score" subtitle="Based on your profile" />
                  <HealthScoreRing score={liveScore} />
                </Card>
              )}
            </>
          ) : (
            <Card padding="sm">
              <div className="rounded-xl overflow-hidden mb-4">
                <img
                  src={images.femaleSize}
                  alt="Body measurement and health tracking"
                  className="w-full h-40 object-cover"
                />
              </div>
              <p className="text-sm text-muted text-center pb-2">
                Enter your height and weight to see a live BMI preview and health score.
              </p>
            </Card>
          )}
        </div>
      </div>

      {loading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      )}

      {result && !loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <h2 className="text-lg font-semibold text-text">Analysis Preview</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader title="Macro Distribution" />
              <MacroChart
                protein={result.analysis.calorie_requirement.protein_g}
                carbs={result.analysis.calorie_requirement.carbs_g}
                fats={result.analysis.calorie_requirement.fats_g}
              />
            </Card>
            <Card className="sm:col-span-1 lg:col-span-2">
              <CardHeader title="Health Assessment" />
              <p className="text-sm text-muted leading-relaxed line-clamp-6">
                {result.analysis.health_assessment}
              </p>
            </Card>
          </div>
        </motion.div>
      )}
    </div>
  );
}
