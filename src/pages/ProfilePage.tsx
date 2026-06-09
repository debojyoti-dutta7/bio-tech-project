import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Trash2, Activity, Calendar, Target } from 'lucide-react';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { getProfile, getAnalyses, deleteAnalysis } from '../utils/storage';
import { formatLabel, formatDate } from '../utils/format';
import { BMIGauge } from '../components/charts/BMIGauge';

export function ProfilePage() {
  const profile = getProfile();
  const analyses = getAnalyses();
  const latest = analyses[0];

  if (!profile) {
    return (
      <EmptyState
        icon={<User className="h-8 w-8" />}
        title="No Profile Yet"
        description="Complete a health analysis to create your profile and save your data."
        action={
          <Link to="/dashboard/health">
            <Button>Create Profile</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Profile</h1>
        <p className="text-muted text-sm mt-1">Your health profile and analysis history</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary text-white text-2xl font-bold">
              {profile.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold text-text">{profile.name}</h2>
              <p className="text-sm text-muted">BioGuide AI Member</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: 'Age', value: `${profile.age} years` },
              { label: 'Gender', value: formatLabel(profile.gender) },
              { label: 'Height', value: `${profile.height} cm` },
              { label: 'Weight', value: `${profile.weight} kg` },
              { label: 'Activity Level', value: formatLabel(profile.activityLevel) },
              { label: 'Dietary Preference', value: formatLabel(profile.dietaryPreference) },
              { label: 'Health Goal', value: formatLabel(profile.healthGoal) },
              {
                label: 'Conditions',
                value: profile.conditions.map((c) => formatLabel(c)).join(', '),
              },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-xl bg-background">
                <p className="text-xs text-muted">{item.label}</p>
                <p className="text-sm font-medium text-text mt-0.5">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Link to="/dashboard/health">
              <Button variant="outline" size="sm" icon={<Activity className="h-4 w-4" />}>
                Update Health Profile
              </Button>
            </Link>
          </div>
        </Card>

        {latest && (
          <Card>
            <CardHeader title="Latest BMI" />
            <BMIGauge bmi={latest.bmi} category={latest.bmiCategory} color={latest.bmiColor} />
          </Card>
        )}
      </div>

      <Card>
        <CardHeader
          title="Analysis History"
          subtitle={`${analyses.length} saved ${analyses.length === 1 ? 'analysis' : 'analyses'}`}
          icon={<Calendar className="h-5 w-5" />}
        />

        {analyses.length === 0 ? (
          <p className="text-sm text-muted text-center py-6">No saved analyses</p>
        ) : (
          <div className="space-y-3">
            {analyses.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between p-4 rounded-xl bg-background"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Target className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text">{formatLabel(a.user.healthGoal)}</p>
                    <p className="text-xs text-muted">{formatDate(a.generatedAt)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary">BMI {a.bmi}</p>
                    <p className="text-xs text-muted">Score: {a.healthScore}</p>
                  </div>
                  <button
                    onClick={() => {
                      if (a.id) deleteAnalysis(a.id);
                      window.location.reload();
                    }}
                    className="text-muted hover:text-red-500 transition-colors p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
