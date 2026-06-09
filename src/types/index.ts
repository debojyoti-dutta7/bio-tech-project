export type Gender = 'male' | 'female' | 'other';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
export type DietaryPreference = 'vegetarian' | 'non_vegetarian' | 'vegan';
export type HealthGoal = 'weight_loss' | 'weight_gain' | 'muscle_building' | 'healthy_lifestyle';
export type HealthCondition = 'diabetes' | 'hypertension' | 'thyroid' | 'none';

export interface UserProfile {
  name: string;
  age: number;
  gender: Gender;
  height: number;
  weight: number;
  activityLevel: ActivityLevel;
  dietaryPreference: DietaryPreference;
  healthGoal: HealthGoal;
  conditions: HealthCondition[];
}

export interface CalorieRequirement {
  daily_calories: number;
  protein_g: number;
  carbs_g: number;
  fats_g: number;
  explanation: string;
}

export interface MealPlan {
  meal: string;
  items: string[];
  calories: number;
}

export interface Snack {
  name: string;
  calories: number;
}

export interface Hydration {
  daily_liters: number;
  tips: string[];
}

export interface HealthAnalysis {
  health_assessment: string;
  bmi_interpretation: string;
  calorie_requirement: CalorieRequirement;
  recommended_foods: string[];
  foods_to_avoid: string[];
  breakfast_plan: MealPlan;
  lunch_plan: MealPlan;
  dinner_plan: MealPlan;
  snacks: Snack[];
  hydration: Hydration;
  lifestyle_tips: string[];
}

export interface AnalysisResult {
  user: UserProfile;
  bmi: number;
  bmiCategory: string;
  bmiColor: string;
  healthScore: number;
  analysis: HealthAnalysis;
  generatedAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface BMIResult {
  bmi: number;
  category: string;
  color: string;
  healthScore: number | null;
}
