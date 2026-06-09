import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Brain,
  Activity,
  Heart,
  MessageCircle,
  Target,
  Sparkles,
  Shield,
  Dna,
  CheckCircle2,
  FlaskConical,
  Quote,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Logo } from '../components/ui/Logo';
import { images } from '../assets/images';

const features = [
  {
    icon: Brain,
    title: 'AI Diet Planning',
    description: 'Personalized meal plans powered by Gemini AI, tailored to your goals and dietary preferences.',
    accent: 'from-emerald-400/20 to-green-500/10',
    iconColor: 'text-primary',
  },
  {
    icon: Activity,
    title: 'BMI Analysis',
    description: 'Real-time BMI calculation with intelligent health scoring and beautiful visual analytics.',
    accent: 'from-sky-400/20 to-blue-500/10',
    iconColor: 'text-accent',
  },
  {
    icon: Heart,
    title: 'Health Monitoring',
    description: 'Comprehensive assessments that consider age, conditions, and your unique lifestyle.',
    accent: 'from-teal-400/20 to-teal-500/10',
    iconColor: 'text-secondary',
  },
  {
    icon: MessageCircle,
    title: 'Nutrition Chatbot',
    description: 'Chat with an AI nutrition assistant for instant, evidence-based guidance anytime.',
    accent: 'from-violet-400/20 to-purple-500/10',
    iconColor: 'text-violet-500',
  },
];

const stats = [
  { value: '2.5K+', label: 'Foods analyzed' },
  { value: '99.2%', label: 'Plan accuracy' },
  { value: '24/7', label: 'AI assistant' },
  { value: 'SDG 3', label: 'Aligned goal' },
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* NAV */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-border/60">
        <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <Link to="/">
            <Logo className="h-9" />
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/dashboard/project" className="hidden sm:block text-sm font-medium text-muted hover:text-text px-3 py-2 transition-colors">
              Project Info
            </Link>
            <Link to="/dashboard">
              <Button size="sm" icon={<ArrowRight className="h-4 w-4" />}>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative gradient-mesh pt-36 pb-24 px-6">
        {/* animated decorations */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 left-[8%] h-72 w-72 bg-primary/20 blur-3xl animate-blob" />
          <div className="absolute top-24 right-[6%] h-80 w-80 bg-accent/15 blur-3xl animate-blob" style={{ animationDelay: '3s' }} />
          <div className="absolute bottom-0 left-1/3 h-64 w-64 bg-secondary/15 blur-3xl animate-blob" style={{ animationDelay: '6s' }} />
        </div>

        <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-primary/20 text-primary text-xs font-semibold mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              AI-Powered Health Intelligence
            </div>
            <h1 className="text-[2.6rem] leading-[1.05] sm:text-5xl lg:text-[3.7rem] font-extrabold text-text tracking-tight">
              Intelligent Nutrition
              <br />
              <span className="text-gradient">& Health Guidance</span>
            </h1>
            <p className="mt-6 text-lg text-muted leading-relaxed max-w-lg">
              BioGuide AI turns your body metrics into a personalized nutrition plan, health score, and 24/7 AI assistant — built on biotechnology and generative AI.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/dashboard">
                <Button size="lg" icon={<ArrowRight className="h-5 w-5" />}>Get Started Free</Button>
              </Link>
              <Link to="/dashboard/project">
                <Button variant="outline" size="lg">Learn More</Button>
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-6">
              {['No signup', 'Instant analysis', 'PDF export'].map((t) => (
                <div key={t} className="flex items-center gap-1.5 text-sm text-muted">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  {t}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Floating dashboard preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="absolute -top-6 -left-6 z-20 hidden lg:flex animate-float">
              <div className="glass rounded-2xl border border-border/60 shadow-card px-4 py-3 flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Heart className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] text-muted leading-none">Health Score</p>
                  <p className="text-sm font-bold text-text">87 / 100</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -right-3 z-20 hidden lg:flex animate-float-slow">
              <div className="glass rounded-2xl border border-border/60 shadow-card px-4 py-3 flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Dna className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="text-[10px] text-muted leading-none">AI Plan</p>
                  <p className="text-sm font-bold text-text">Generated</p>
                </div>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden border border-border shadow-card">
              <img
                src={images.vegetables}
                alt="Fresh nutritious vegetables and fruits"
                className="w-full h-[300px] sm:h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-text/70 via-text/10 to-transparent" />

              <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-white/40 text-xs font-semibold text-text">
                <Shield className="h-3.5 w-3.5 text-primary" />
                AI Health Assessment
              </div>
            </div>

          </motion.div>
        </div>

        {/* stats band */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative max-w-5xl mx-auto mt-20 grid grid-cols-2 sm:grid-cols-4 gap-px rounded-3xl overflow-hidden border border-border bg-border shadow-soft"
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-card px-6 py-6 text-center">
              <p className="text-2xl sm:text-3xl font-extrabold text-gradient">{s.value}</p>
              <p className="text-xs text-muted mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* FEATURES — bento */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-sm font-semibold text-primary">FEATURES</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-text mt-2">Everything you need for optimal health</h2>
            <p className="text-muted mt-3 max-w-xl mx-auto">
              A comprehensive platform combining biotechnology principles with cutting-edge AI.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative bg-card rounded-2xl border border-border p-6 shadow-soft hover:shadow-card transition-all overflow-hidden"
              >
                <div className={`absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br ${feature.accent} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className={`relative flex h-12 w-12 items-center justify-center rounded-2xl bg-background border border-border ${feature.iconColor} mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="relative font-semibold text-text mb-2">{feature.title}</h3>
                <p className="relative text-sm text-muted leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOD AS MEDICINE */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative rounded-3xl overflow-hidden border border-border shadow-card">
              <img
                src={images.foodMedicine}
                alt="Nutrition as medicine — food inside a capsule"
                className="w-full h-[340px] object-cover"
              />
            </div>
            <div className="absolute -top-5 -right-5 glass rounded-2xl border border-border/60 shadow-card px-4 py-3 hidden lg:flex items-center gap-2 animate-float">
              <FlaskConical className="h-5 w-5 text-secondary" />
              <span className="text-sm font-semibold text-text">Biotech-driven</span>
            </div>
            <div className="absolute -bottom-7 -left-7 hidden lg:block animate-float-slow">
              <div className="bg-card rounded-2xl border border-border shadow-card p-2.5">
                <img
                  src={images.redBerry}
                  alt="Antioxidant-rich berries"
                  className="h-28 w-28 rounded-xl object-cover"
                />
                <p className="text-[11px] font-semibold text-text text-center mt-2">
                  Antioxidant-rich
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <FlaskConical className="h-5 w-5 text-secondary" />
              <span className="text-sm font-semibold text-secondary">FOOD AS MEDICINE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-text mb-4 leading-tight">
              Where biotechnology meets nutrition
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              Every recommendation blends nutritional biochemistry with generative AI. BioGuide AI translates your biological metrics into precise, condition-aware nutrition — treating food as a tool for prevention and well-being.
            </p>
            <ul className="space-y-3">
              {[
                'Macronutrient analysis tailored to your metabolism',
                'Condition-aware plans for diabetes, hypertension & thyroid',
                'Evidence-based foods to embrace and to avoid',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted">
                  <CheckCircle2 className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* SDG SECTION */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-60" />
        <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <Target className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-primary">SDG ALIGNMENT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-text mb-4 leading-tight">
              Contributing to UN Sustainable Development Goals
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              BioGuide AI directly supports{' '}
              <strong className="text-text">SDG Goal 3: Good Health and Well-being</strong> by leveraging biotechnology and AI to make personalized nutrition accessible, affordable, and evidence-based for everyone.
            </p>
            <div className="flex items-center gap-4 p-4 bg-card rounded-2xl border border-border shadow-soft">
              <div className="flex flex-col items-center justify-center rounded-2xl gradient-primary text-white shrink-0 shadow-glow h-14 w-14 leading-none">
                <span className="text-[9px] font-semibold tracking-wide">SDG</span>
                <span className="text-xl font-bold">3</span>
              </div>
              <div>
                <p className="font-semibold text-text">Good Health and Well-being</p>
                <p className="text-sm text-muted">Ensure healthy lives and promote well-being for all at all ages</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-3xl p-8 border border-border shadow-card"
          >
            <h3 className="font-semibold text-text mb-4">How we contribute</h3>
            <ul className="space-y-3.5">
              {[
                'Personalized nutrition reduces diet-related health risks',
                'AI-powered early health insights promote preventive care',
                'Accessible health guidance for diverse dietary needs',
                'Condition-aware recommendations for chronic disease management',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* MOTIVATIONAL QUOTE BAND */}
      <section className="px-6 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-6xl mx-auto rounded-3xl overflow-hidden border border-border shadow-card"
        >
          <img
            src={images.motivational}
            alt="Eat well — healthy lifestyle"
            className="w-full h-[260px] sm:h-[320px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-text/75 via-text/40 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-xl px-8 sm:px-12">
              <Quote className="h-8 w-8 text-primary mb-3" />
              <p className="text-2xl sm:text-3xl font-bold text-white leading-snug">
                "Let food be thy medicine, and medicine be thy food."
              </p>
              <p className="text-white/80 mt-3 text-sm">
                The philosophy behind every BioGuide AI recommendation.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden gradient-primary p-12 sm:p-16 text-center shadow-glow"
        >
          <div className="absolute inset-0 bg-dots opacity-20" />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to transform your health?</h2>
            <p className="text-white/90 mb-8 max-w-lg mx-auto">
              Start your personalized nutrition journey with BioGuide AI today — no signup required.
            </p>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="!bg-white !text-primary !border-white hover:!bg-white/90" icon={<ArrowRight className="h-5 w-5" />}>
                Launch Dashboard
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10 px-6 mt-12">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/">
            <Logo className="h-8" wordmarkClassName="text-sm" />
          </Link>
          <p className="text-xs text-muted">
            Biotechnology Engineering Academic Project &copy; {new Date().getFullYear()} — SDG 3: Good Health and Well-being
          </p>
        </div>
      </footer>
    </div>
  );
}
