import { motion } from 'framer-motion';
import {
  BookOpen,
  Target,
  FlaskConical,
  Brain,
  Layers,
  Globe,
  CheckCircle,
} from 'lucide-react';
import { Card, CardHeader } from '../components/ui/Card';
import { images } from '../assets/images';

const sections = [
  {
    icon: Target,
    title: 'Problem Statement',
    content: `Modern lifestyles have led to a global rise in diet-related health issues including obesity, diabetes, and cardiovascular diseases. Generic dietary advice fails to account for individual differences in age, gender, body composition, activity levels, dietary preferences, and existing health conditions. There is a critical need for intelligent, personalized nutrition guidance that leverages biotechnology principles and artificial intelligence to deliver safe, evidence-based health recommendations at scale.`,
  },
  {
    icon: CheckCircle,
    title: 'Objectives',
    items: [
      'Develop an AI-powered platform for personalized nutrition and health recommendations',
      'Implement automated BMI calculation and health scoring algorithms',
      'Integrate Google Gemini 2.5 Flash for generative health analysis and diet planning',
      'Create an interactive AI nutrition chatbot for real-time health guidance',
      'Design a professional, accessible web application supporting diverse user profiles',
      'Align the project with UN Sustainable Development Goal 3: Good Health and Well-being',
    ],
  },
  {
    icon: Layers,
    title: 'Methodology',
    items: [
      'Requirements Analysis: Identified user inputs, health metrics, and AI output requirements',
      'System Design: Architected a full-stack application with React frontend and Express backend',
      'BMI Algorithm: Implemented WHO-standard BMI calculation with category classification and health scoring',
      'AI Integration: Engineered structured prompts for Gemini API with JSON response parsing and retry logic',
      'UI/UX Design: Created a modern SaaS dashboard with responsive design and Framer Motion animations',
      'Testing & Validation: Verified API endpoints, form validation, error handling, and data persistence',
    ],
  },
  {
    icon: FlaskConical,
    title: 'Biotechnology Relevance',
    content: `BioGuide AI sits at the intersection of biotechnology and digital health. The application applies biotechnological principles including metabolic rate estimation, macronutrient distribution analysis, condition-aware dietary modification, and evidence-based nutritional biochemistry. By processing biological parameters (BMI, age, gender, health conditions) through AI models, the system demonstrates how biotechnology data can be transformed into actionable health interventions — a core application of bioinformatics and computational biology in modern healthcare.`,
  },
  {
    icon: Brain,
    title: 'AI Integration',
    content: `The platform leverages Google Gemini 2.5 Flash, a state-of-the-art large language model, for two core functions: (1) Structured Health Analysis — generating comprehensive nutrition plans, calorie requirements, meal schedules, and lifestyle recommendations from user health profiles via engineered prompts with JSON schema enforcement; (2) Conversational Nutrition Assistant — providing contextual, multi-turn health guidance with conversation history. The integration includes prompt engineering, response parsing, error handling, rate limiting, and retry logic for production reliability.`,
  },
];

export function ProjectInfoPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-text">Project Information</h1>
        <p className="text-muted text-sm mt-1">
          Biotechnology Engineering Academic Project Documentation
        </p>
      </div>

      <div className="relative rounded-3xl overflow-hidden border border-border shadow-card">
        <img
          src={images.foodMedicine}
          alt="Nutrition as medicine"
          className="w-full h-48 sm:h-56 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-text/85 via-text/55 to-text/20" />
        <div className="absolute inset-0 flex items-center px-6 sm:px-9">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl glass border border-white/40 shrink-0">
              <BookOpen className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">BioGuide AI</h2>
              <p className="text-sm text-white/90">
                Intelligent Nutrition & Health Recommendation System
              </p>
              <p className="text-xs text-white/70 mt-1">
                Demonstrating practical Generative AI in personalized nutrition
              </p>
            </div>
          </div>
        </div>
        <img
          src={images.hero}
          alt=""
          aria-hidden="true"
          className="absolute -bottom-6 right-6 h-28 w-28 object-contain hidden md:block animate-float-slow drop-shadow-xl"
        />
      </div>

      {sections.map((section, i) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
        >
          <Card>
            <CardHeader title={section.title} icon={<section.icon className="h-5 w-5" />} />
            {'content' in section && (
              <p className="text-sm text-muted leading-relaxed">{section.content}</p>
            )}
            {'items' in section && (
              <ul className="space-y-2">
                {section.items!.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </motion.div>
      ))}

      <Card>
        <CardHeader title="SDG Mapping" icon={<Globe className="h-5 w-5 text-accent" />} />
        <div className="flex items-start gap-4 p-4 bg-background rounded-xl mb-4">
          <div className="flex flex-col items-center justify-center rounded-2xl bg-accent/10 text-accent shrink-0 h-16 w-16 leading-none">
            <span className="text-[10px] font-semibold tracking-wide">SDG</span>
            <span className="text-2xl font-bold">3</span>
          </div>
          <div>
            <h3 className="font-semibold text-text text-lg">Good Health and Well-being</h3>
            <p className="text-sm text-muted mt-1">
              Ensure healthy lives and promote well-being for all at all ages
            </p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            'Personalized nutrition reduces preventable diet-related diseases',
            'AI health scoring enables early awareness of health risks',
            'Condition-aware diet plans support chronic disease management',
            'Accessible digital health tool promotes wellness equity',
            'Hydration and lifestyle guidance supports holistic well-being',
            'Educational chatbot democratizes nutrition knowledge',
          ].map((item) => (
            <div key={item} className="flex items-start gap-2 text-sm text-muted p-3 rounded-xl bg-background">
              <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              {item}
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader title="Technology Stack" />
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { category: 'Frontend', tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion'] },
            { category: 'Backend', tech: ['Node.js', 'Express.js', 'REST API'] },
            { category: 'AI & Tools', tech: ['Gemini 2.5 Flash', 'React Hook Form', 'Recharts', 'jsPDF'] },
          ].map((group) => (
            <div key={group.category} className="p-4 rounded-xl bg-background">
              <p className="text-xs font-semibold text-text mb-2">{group.category}</p>
              <div className="flex flex-wrap gap-1.5">
                {group.tech.map((t) => (
                  <span key={t} className="px-2 py-1 rounded-lg bg-card border border-border text-xs text-muted">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
