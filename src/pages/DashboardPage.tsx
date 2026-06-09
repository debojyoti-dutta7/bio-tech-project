import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Activity,
  Utensils,
  MessageCircle,
  TrendingUp,
  ArrowRight,
  Clock,
  FileText,
  Leaf,
} from 'lucide-react';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { AnimatedCounter } from '../components/ui/AnimatedCounter';
import { getAnalyses, getProfile } from '../utils/storage';
import { formatDate, formatLabel } from '../utils/format';

export function DashboardPage() {
  const analyses = getAnalyses();
  const profile = getProfile();
  const latest = analyses[0];

  const stats = [
    {
      label: 'Total Analyses',
      value: analyses.length,
      icon: FileText,
      color: 'bg-primary/10 text-primary',
    },
    {
      label: 'Health Score',
      value: latest?.healthScore ?? '--',
      icon: TrendingUp,
      color: 'bg-secondary/10 text-secondary',
    },
    {
      label: 'Current BMI',
      value: latest?.bmi ?? '--',
      icon: Activity,
      color: 'bg-accent/10 text-accent',
      suffix: latest ? '' : '',
    },
    {
      label: 'Daily Calories',
      value: latest?.analysis?.calorie_requirement?.daily_calories ?? '--',
      icon: Utensils,
      color: 'bg-primary/10 text-primary',
    },
  ];

  const quickActions = [
    { to: '/dashboard/health', icon: Activity, label: 'New Health Analysis', desc: 'Run a comprehensive health assessment' },
    { to: '/dashboard/diet', icon: Utensils, label: 'View Diet Plan', desc: 'See your AI-generated meal plans' },
    { to: '/dashboard/chat', icon: MessageCircle, label: 'Chat with AI', desc: 'Ask nutrition questions instantly' },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl overflow-hidden gradient-primary shadow-glow"
      >
        <div className="absolute inset-0 bg-dots opacity-20" />
        <div className="pointer-events-none absolute -top-10 -right-10 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-12 right-24 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex items-center justify-between gap-4 px-6 sm:px-9 py-7 sm:py-9">
          <div>
            <p className="text-xs font-semibold text-white/80 mb-1 tracking-wide">DASHBOARD</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              {profile ? `Welcome back, ${profile.name.split(' ')[0]}` : 'Welcome to BioGuide AI'}
            </h1>
            <p className="text-white/85 text-sm mt-1 max-w-md">
              {profile
                ? 'Track your health journey and explore your AI-powered nutrition insights.'
                : 'Complete a health analysis to unlock your personalized nutrition plan.'}
            </p>
          </div>
          <div className="hidden sm:flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 border border-white/25 shrink-0">
            <Leaf className="h-8 w-8 text-white" />
          </div>
        </div>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card padding="sm" hover>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted">{stat.label}</p>
                  <p className="text-2xl font-bold text-text mt-1">
                    {typeof stat.value === 'number' ? (
                      <AnimatedCounter value={stat.value} decimals={stat.label === 'Current BMI' ? 1 : 0} />
                    ) : (
                      stat.value
                    )}
                  </p>
                </div>
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-text">Quick Actions</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {quickActions.map((action, i) => (
              <motion.div
                key={action.to}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
              >
                <Link to={action.to}>
                  <Card hover className="h-full">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary mb-3">
                      <action.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-text text-sm">{action.label}</h3>
                    <p className="text-xs text-muted mt-1">{action.desc}</p>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader title="Recent Analyses" icon={<Clock className="h-5 w-5" />} />
          {analyses.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-sm text-muted mb-4">No analyses yet</p>
              <Link to="/dashboard/health">
                <Button size="sm">Start Analysis</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {analyses.slice(0, 5).map((a) => (
                <div
                  key={a.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-background"
                >
                  <div>
                    <p className="text-sm font-medium text-text">{a.user.name}</p>
                    <p className="text-xs text-muted">{formatDate(a.generatedAt)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary">BMI {a.bmi}</p>
                    <p className="text-xs text-muted">{formatLabel(a.user.healthGoal)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {!profile && (
        <Card className="gradient-hero border-primary/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-text">Get started with your first analysis</h3>
              <p className="text-sm text-muted mt-1">
                Enter your health profile to receive AI-powered nutrition recommendations.
              </p>
            </div>
            <Link to="/dashboard/health">
              <Button icon={<ArrowRight className="h-4 w-4" />}>Begin Health Analysis</Button>
            </Link>
          </div>
        </Card>
      )}
    </div>
  );
}
