import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon, SparklesIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

function DashboardIllustration() {
  return (
    <svg
      viewBox="0 0 900 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* Background */}
      <rect width="900" height="500" rx="16" fill="#f8fafc" />

      {/* Sidebar */}
      <rect width="180" height="500" rx="0" fill="#1e293b" />
      <rect x="16" y="20" width="148" height="36" rx="8" fill="#0f172a" />
      <circle cx="34" cy="38" r="10" fill="#14b8a6" />
      <rect x="50" y="31" width="60" height="8" rx="4" fill="#94a3b8" />
      <rect x="50" y="43" width="40" height="5" rx="2.5" fill="#475569" />

      {/* Sidebar nav items */}
      {[100, 140, 180, 220, 280].map((y, i) => (
        <g key={i}>
          <rect x="16" y={y} width="148" height="32" rx="6" fill={i === 0 ? '#14b8a6' : 'transparent'} opacity={i === 0 ? 1 : 0.4} />
          <rect x="32" y={y + 10} width="12" height="12" rx="3" fill={i === 0 ? '#fff' : '#64748b'} />
          <rect x="52" y={y + 13} width={[60, 80, 70, 65, 55][i]} height="6" rx="3" fill={i === 0 ? '#fff' : '#475569'} />
        </g>
      ))}

      {/* Main content area */}
      <rect x="196" y="0" width="704" height="500" fill="#f1f5f9" />

      {/* Top bar */}
      <rect x="196" y="0" width="704" height="56" fill="#fff" />
      <rect x="220" y="18" width="200" height="20" rx="5" fill="#f1f5f9" />
      <rect x="230" y="24" width="100" height="8" rx="4" fill="#cbd5e1" />
      <circle cx="860" cy="28" r="14" fill="#e2e8f0" />
      <circle cx="830" cy="28" r="14" fill="#e2e8f0" />

      {/* Stat cards row */}
      {[
        { x: 220, color: '#14b8a6', label: 'Total Balance', value: '₹1,24,500', sub: '+8.2%' },
        { x: 408, color: '#6366f1', label: 'Monthly Income', value: '₹42,000', sub: '+3.1%' },
        { x: 596, color: '#f43f5e', label: 'Total Expenses', value: '₹18,340', sub: '-2.4%' },
        { x: 784, color: '#f59e0b', label: 'Savings Rate', value: '56.3%', sub: '+1.8%' },
      ].map((card) => (
        <g key={card.x}>
          <rect x={card.x} y="72" width="172" height="84" rx="10" fill="#fff" />
          <rect x={card.x + 12} y="86" width="28" height="28" rx="7" fill={card.color} opacity="0.15" />
          <rect x={card.x + 18} y="96" width="16" height="3" rx="1.5" fill={card.color} />
          <rect x={card.x + 18} y="102" width="10" height="3" rx="1.5" fill={card.color} />
          <rect x={card.x + 12} y="122" width="90" height="8" rx="4" fill="#1e293b" />
          <rect x={card.x + 12} y="136" width="60" height="6" rx="3" fill="#94a3b8" />
          <rect x={card.x + 12} y="110" width="50" height="6" rx="3" fill="#94a3b8" />
        </g>
      ))}

      {/* Bar chart card */}
      <rect x="220" y="172" width="390" height="200" rx="10" fill="#fff" />
      <rect x="236" y="186" width="120" height="8" rx="4" fill="#1e293b" />
      <rect x="236" y="200" width="80" height="5" rx="2.5" fill="#94a3b8" />

      {/* Bars */}
      {[
        { x: 248, h: 80, color: '#14b8a6' },
        { x: 296, h: 110, color: '#14b8a6' },
        { x: 344, h: 65, color: '#14b8a6' },
        { x: 392, h: 130, color: '#14b8a6' },
        { x: 440, h: 90, color: '#14b8a6' },
        { x: 488, h: 115, color: '#6366f1' },
        { x: 536, h: 75, color: '#14b8a6' },
      ].map((bar, i) => (
        <g key={i}>
          <rect x={bar.x} y={340 - bar.h} width="32" height={bar.h} rx="5" fill={bar.color} opacity="0.85" />
        </g>
      ))}

      {/* Grid lines */}
      {[220, 260, 300, 340].map((y) => (
        <line key={y} x1="236" y1={y} x2="590" y2={y} stroke="#f1f5f9" strokeWidth="1" />
      ))}

      {/* Donut chart card */}
      <rect x="626" y="172" width="258" height="200" rx="10" fill="#fff" />
      <rect x="642" y="186" width="100" height="8" rx="4" fill="#1e293b" />
      <rect x="642" y="200" width="70" height="5" rx="2.5" fill="#94a3b8" />

      {/* Donut */}
      <circle cx="755" cy="295" r="55" fill="none" stroke="#f1f5f9" strokeWidth="22" />
      <circle cx="755" cy="295" r="55" fill="none" stroke="#14b8a6" strokeWidth="22"
        strokeDasharray="138 207" strokeDashoffset="52" strokeLinecap="round" />
      <circle cx="755" cy="295" r="55" fill="none" stroke="#6366f1" strokeWidth="22"
        strokeDasharray="82 263" strokeDashoffset="-86" strokeLinecap="round" />
      <circle cx="755" cy="295" r="55" fill="none" stroke="#f43f5e" strokeWidth="22"
        strokeDasharray="45 300" strokeDashoffset="-168" strokeLinecap="round" />
      <rect x="734" y="286" width="42" height="8" rx="4" fill="#1e293b" />
      <rect x="740" y="298" width="30" height="5" rx="2.5" fill="#94a3b8" />

      {/* Legend dots */}
      {[
        { x: 642, color: '#14b8a6', label: 'Food' },
        { x: 700, color: '#6366f1', label: 'Bills' },
        { x: 642, color: '#f43f5e', label: 'Travel', dy: 20 },
      ].map((l, i) => (
        <g key={i}>
          <circle cx={l.x + 5} cy={i < 2 ? 374 : 374 + (l.dy || 0)} r="5" fill={l.color} />
          <rect x={l.x + 14} y={i < 2 ? 369 : 369 + (l.dy || 0)} width="30" height="5" rx="2.5" fill="#94a3b8" />
        </g>
      ))}

      {/* Bottom transaction list */}
      <rect x="220" y="386" width="664" height="96" rx="10" fill="#fff" />
      <rect x="236" y="398" width="100" height="7" rx="3.5" fill="#1e293b" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <circle cx={252} cy={422 + i * 22} r="10" fill={['#14b8a6', '#6366f1', '#f43f5e'][i]} opacity="0.15" />
          <rect x={268} cy={422 + i * 22} width="90" height="5" rx="2.5" fill="#475569" y={418 + i * 22} />
          <rect x={268} width="55" height="4" rx="2" fill="#cbd5e1" y={426 + i * 22} />
          <rect x={790} y={418 + i * 22} width="50" height="5" rx="2.5" fill={['#14b8a6', '#6366f1', '#f43f5e'][i]} />
        </g>
      ))}
    </svg>
  )
}

export function HeroSection() {
  return (
    <section className="mx-auto w-full max-w-5xl overflow-hidden pt-16 px-4">
      {/* Gradient background */}
      <div aria-hidden="true" className="absolute inset-0 size-full overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 isolate -z-10"
          style={{
            background:
              'radial-gradient(20% 80% at 20% 0%, hsl(var(--foreground) / 0.08) 0%, transparent 100%)',
          }}
        />
      </div>

      {/* Hero text */}
      <div className="relative z-10 flex max-w-2xl flex-col gap-5">
        <a
          className={cn(
            'group flex w-fit items-center gap-3 rounded-sm border bg-card p-1 shadow-sm',
            'animate-in fade-in slide-in-from-bottom-10 fill-mode-backwards transition-all delay-500 duration-500 ease-out',
          )}
          href="#features"
        >
          <div className="rounded-sm border bg-primary/10 px-1.5 py-0.5 shadow-sm">
            <p className="font-mono text-xs text-primary font-semibold">NEW</p>
          </div>
          <span className="text-xs text-muted-foreground">Smart insights & budget alerts are live</span>
          <span className="block h-5 border-l" />
          <div className="pr-1">
            <ArrowRightIcon className="size-3 -translate-x-0.5 duration-150 ease-out group-hover:translate-x-0.5 text-muted-foreground" />
          </div>
        </a>

        <h1
          className={cn(
            'text-balance font-medium text-4xl text-foreground leading-tight md:text-5xl',
            'animate-in fade-in slide-in-from-bottom-10 fill-mode-backwards delay-100 duration-500 ease-out',
          )}
        >
          Track Smarter.{' '}
          <span className="text-primary">Save Better.</span>{' '}
          Grow Faster.
        </h1>

        <p
          className={cn(
            'text-muted-foreground text-sm tracking-wide sm:text-lg md:text-xl',
            'animate-in fade-in slide-in-from-bottom-10 fill-mode-backwards delay-200 duration-500 ease-out',
          )}
        >
          Take full control of your finances with beautiful charts,
          <br className="hidden sm:block" /> smart insights, and automatic categorization.
        </p>

        <div className="animate-in fade-in slide-in-from-bottom-10 flex w-fit items-center justify-center gap-3 fill-mode-backwards pt-2 delay-300 duration-500 ease-out">
          <Button variant="outline" asChild>
            <Link to="/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link to="/register">
              Get Started Free{' '}
              <ArrowRightIcon className="size-4 ml-2" />
            </Link>
          </Button>
        </div>

        <p
          className={cn(
            'text-xs text-muted-foreground',
            'animate-in fade-in slide-in-from-bottom-10 fill-mode-backwards delay-500 duration-500 ease-out',
          )}
        >
          <SparklesIcon className="inline size-3 mr-1 text-primary" />
          Join thousands already tracking smarter — no credit card required
        </p>
      </div>

      {/* Dashboard illustration */}
      <div className="relative mt-16">
        <div
          className="absolute -inset-x-20 inset-y-0 -translate-y-1/3 rounded-full opacity-40 blur-3xl pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, hsl(var(--primary) / 0.15) 0%, transparent 70%)',
            transform: 'translateY(-33%) scaleX(1.2)',
          }}
          aria-hidden="true"
        />
        <div
          className={cn(
            'relative -mr-4 sm:mr-0 overflow-hidden px-2',
            'animate-in fade-in slide-in-from-bottom-5 fill-mode-backwards delay-100 duration-1000 ease-out',
            'app-screenshot-mask',
          )}
        >
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-xl border bg-background p-2 shadow-2xl ring-1 ring-border/50">
            <div className="aspect-video rounded-lg border overflow-hidden w-full">
              <DashboardIllustration />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
