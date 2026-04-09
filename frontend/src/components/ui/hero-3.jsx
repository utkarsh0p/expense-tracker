import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon, SparklesIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

export function HeroSection() {
  return (
    <section className="mx-auto w-full max-w-5xl overflow-hidden pt-16 px-4">
      {/* Gradient background shades */}
      <div aria-hidden="true" className="absolute inset-0 size-full overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 isolate -z-10"
          style={{
            background:
              'radial-gradient(20% 80% at 20% 0%, hsl(var(--foreground) / 0.08) 0%, transparent 100%)',
          }}
        />
      </div>

      {/* Hero text content */}
      <div className="relative z-10 flex max-w-2xl flex-col gap-5">
        {/* Badge */}
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

        {/* Headline */}
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

        {/* Subtitle */}
        <p
          className={cn(
            'text-muted-foreground text-sm tracking-wide sm:text-lg md:text-xl',
            'animate-in fade-in slide-in-from-bottom-10 fill-mode-backwards delay-200 duration-500 ease-out',
          )}
        >
          Take full control of your finances with beautiful charts,
          <br className="hidden sm:block" /> AI-powered insights, and automatic categorization.
        </p>

        {/* CTA Buttons */}
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

        {/* Social proof */}
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

      {/* App Screenshot */}
      <div className="relative mt-16">
        {/* Glow behind screenshot */}
        <div
          className="absolute -inset-x-20 inset-y-0 -translate-y-1/3 rounded-full opacity-40 blur-3xl pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, hsl(var(--primary) / 0.15) 0%, transparent 70%)',
            transform: 'translateY(-33%) scaleX(1.2)',
          }}
          aria-hidden="true"
        />

        {/* Screenshot frame */}
        <div
          className={cn(
            'relative -mr-4 sm:mr-0 overflow-hidden px-2',
            'animate-in fade-in slide-in-from-bottom-5 fill-mode-backwards delay-100 duration-1000 ease-out',
            'app-screenshot-mask',
          )}
        >
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-xl border bg-background p-2 shadow-2xl ring-1 ring-border/50">
            <img
              alt="SmartExpense Dashboard"
              className="aspect-video rounded-lg border w-full object-cover"
              height="1080"
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop&q=80"
              width="1920"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
