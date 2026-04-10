import { Header } from '@/components/ui/header-3'
import { HeroSection } from '@/components/ui/hero-3'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  BarChart3,
  PieChart,
  Wallet,
  BellRing,
  Tags,
  Download,
  TrendingUp,
  ArrowRightIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const features = [
  {
    icon: BarChart3,
    title: 'Visual Dashboard',
    description: 'See your income, expenses, and savings at a glance with beautiful, interactive charts.',
  },
  {
    icon: Wallet,
    title: 'Expense & Income Tracking',
    description: 'Effortlessly log every transaction with smart category detection.',
  },
  {
    icon: PieChart,
    title: 'Spending Insights',
    description: 'Understand where your money goes with detailed category breakdowns.',
  },
  {
    icon: BellRing,
    title: 'Budget Alerts',
    description: 'Set budgets and get notified before you overspend.',
  },
  {
    icon: Tags,
    title: 'Auto Categorization',
    description: 'Transactions are automatically tagged and organized for you.',
  },
  {
    icon: Download,
    title: 'Export Reports',
    description: 'Download your financial data anytime in multiple formats.',
  },
]


export default function Landing() {
  return (
    <div className="flex w-full flex-col min-h-screen bg-background text-foreground">
      <Header />

      <main className="grow relative">
        {/* Hero */}
        <HeroSection />

        {/* Features Section */}
        <section id="features" className="mx-auto w-full max-w-5xl px-4 py-24 mt-8">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-3">Features</p>
            <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4">
              Everything you need to manage money
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              SmartExpense gives you the tools to understand your spending, plan your budget, and grow your savings.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="size-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="mx-auto w-full max-w-5xl px-4 pb-24">
          <div className="rounded-2xl bg-primary/5 border border-primary/20 p-12 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="size-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-medium text-foreground mb-3">
              Ready to take control of your finances?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Join thousands of users who track smarter and save better with SmartExpense.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Button size="lg" asChild>
                <Link to="/register">
                  Get Started Free <ArrowRightIcon className="size-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="mx-auto w-full max-w-5xl px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl flex items-center justify-center shadow-sm"
              style={{ background: 'linear-gradient(135deg, #14b8a6 0%, #6366f1 100%)' }}>
              <TrendingUp size={13} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-bold tracking-tight">
              <span className="text-foreground">Smart</span><span className="text-primary">Expense</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SmartExpense · Track smarter. Save better.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Help</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
