import {
  Utensils,
  Plane,
  Zap,
  ShoppingBag,
  HeartPulse,
  GraduationCap,
  Clapperboard,
  MoreHorizontal,
  Briefcase,
  Code2,
  TrendingUp,
  Gift,
  Banknote,
} from 'lucide-react'

export const EXPENSE_CATEGORIES = [
  'Food',
  'Travel',
  'Bills',
  'Shopping',
  'Health',
  'Education',
  'Entertainment',
  'Other',
]

export const INCOME_CATEGORIES = [
  'Salary',
  'Freelance',
  'Investment',
  'Bonus',
  'Gift',
  'Other',
]

export const EXPENSE_ICONS = {
  Food: Utensils,
  Travel: Plane,
  Bills: Zap,
  Shopping: ShoppingBag,
  Health: HeartPulse,
  Education: GraduationCap,
  Entertainment: Clapperboard,
  Other: MoreHorizontal,
}

export const INCOME_ICONS = {
  Salary: Briefcase,
  Freelance: Code2,
  Investment: TrendingUp,
  Bonus: Banknote,
  Gift: Gift,
  Other: MoreHorizontal,
}
