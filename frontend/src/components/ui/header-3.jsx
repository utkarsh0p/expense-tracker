import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon'
import { createPortal } from 'react-dom'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import {
  BarChart3,
  PieChart,
  Wallet,
  BellRing,
  Tags,
  Download,
  Users,
  Star,
  FileText,
  Shield,
  HelpCircle,
  TrendingUp,
} from 'lucide-react'

const productLinks = [
  {
    title: 'Dashboard',
    href: '#features',
    description: 'Beautiful financial overview at a glance',
    icon: BarChart3,
  },
  {
    title: 'Expense Tracking',
    href: '#features',
    description: 'Log and categorize every transaction',
    icon: Wallet,
  },
  {
    title: 'Smart Insights',
    href: '#features',
    description: 'AI-powered spending analysis',
    icon: PieChart,
  },
  {
    title: 'Budget Alerts',
    href: '#features',
    description: 'Get notified before you overspend',
    icon: BellRing,
  },
  {
    title: 'Categories',
    href: '#features',
    description: 'Auto-tag and organize your spending',
    icon: Tags,
  },
  {
    title: 'Export & Reports',
    href: '#features',
    description: 'Download your data anytime',
    icon: Download,
  },
]

const companyLinks = [
  {
    title: 'About Us',
    href: '#',
    description: 'Our story and the team behind SmartExpense',
    icon: Users,
  },
  {
    title: 'Testimonials',
    href: '#',
    description: 'See how others are saving smarter',
    icon: Star,
  },
]

const companyLinks2 = [
  { title: 'Terms of Service', href: '#', icon: FileText },
  { title: 'Privacy Policy', href: '#', icon: Shield },
  { title: 'Help Center', href: '#', icon: HelpCircle },
]

function useScroll(threshold) {
  const [scrolled, setScrolled] = React.useState(false)

  const onScroll = React.useCallback(() => {
    setScrolled(window.scrollY > threshold)
  }, [threshold])

  React.useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  React.useEffect(() => {
    onScroll()
  }, [onScroll])

  return scrolled
}

function ListItem({ title, description, icon: Icon, className, href, ...props }) {
  return (
    <NavigationMenuLink
      className={cn(
        'w-full flex flex-row gap-x-2 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground rounded-sm p-2',
        className,
      )}
      {...props}
      asChild
    >
      <a href={href}>
        <div className="bg-background/40 flex aspect-square size-12 items-center justify-center rounded-md border shadow-sm flex-shrink-0">
          <Icon className="text-foreground size-5" />
        </div>
        <div className="flex flex-col items-start justify-center">
          <span className="font-medium">{title}</span>
          {description && <span className="text-muted-foreground text-xs">{description}</span>}
        </div>
      </a>
    </NavigationMenuLink>
  )
}

function MobileMenu({ open, children, className, ...props }) {
  if (!open || typeof window === 'undefined') return null

  return createPortal(
    <div
      id="mobile-menu"
      className={cn(
        'bg-background/95 backdrop-blur-lg',
        'fixed top-14 right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-y md:hidden',
      )}
    >
      <div
        data-slot={open ? 'open' : 'closed'}
        className={cn('data-[slot=open]:animate-in data-[slot=open]:zoom-in-97 ease-out', 'size-full p-4', className)}
        {...props}
      >
        {children}
      </div>
    </div>,
    document.body,
  )
}

export function Header() {
  const [open, setOpen] = React.useState(false)
  const scrolled = useScroll(10)

  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header
      className={cn('sticky top-0 z-50 w-full border-b border-transparent', {
        'bg-background/95 backdrop-blur-lg border-border': scrolled,
      })}
    >
      <nav className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4">
        <div className="flex items-center gap-5">
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shadow-sm"
              style={{ background: 'linear-gradient(135deg, #14b8a6 0%, #6366f1 100%)' }}>
              <TrendingUp size={15} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold tracking-tight">
              <span className="text-foreground">Smart</span><span className="text-primary">Expense</span>
            </span>
          </a>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">Features</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-background p-1 pr-1.5">
                  <ul className="bg-popover grid w-[520px] grid-cols-2 gap-2 rounded-md border p-2 shadow">
                    {productLinks.map((item, i) => (
                      <li key={i}>
                        <ListItem {...item} />
                      </li>
                    ))}
                  </ul>
                  <div className="p-2">
                    <p className="text-muted-foreground text-sm">
                      Ready to take control?{' '}
                      <Link to="/register" className="text-foreground font-medium hover:underline">
                        Start for free
                      </Link>
                    </p>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">Company</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-background p-1 pr-1.5 pb-1.5">
                  <div className="grid w-[420px] grid-cols-2 gap-2">
                    <ul className="bg-popover space-y-2 rounded-md border p-2 shadow">
                      {companyLinks.map((item, i) => (
                        <li key={i}>
                          <ListItem {...item} />
                        </li>
                      ))}
                    </ul>
                    <ul className="space-y-2 p-3">
                      {companyLinks2.map((item, i) => (
                        <li key={i}>
                          <NavigationMenuLink
                            href={item.href}
                            className="flex p-2 hover:bg-accent flex-row rounded-md items-center gap-x-2"
                          >
                            <item.icon className="text-foreground size-4" />
                            <span className="font-medium text-sm">{item.title}</span>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuLink className="px-4" asChild>
                <a href="#features" className="hover:bg-accent rounded-md p-2 text-sm">
                  Features
                </a>
              </NavigationMenuLink>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="outline" asChild>
            <Link to="/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link to="/register">Get Started</Link>
          </Button>
        </div>

        <Button
          size="icon"
          variant="outline"
          onClick={() => setOpen(!open)}
          className="md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          <MenuToggleIcon open={open} className="size-5" duration={300} />
        </Button>
      </nav>

      <MobileMenu open={open} className="flex flex-col justify-between gap-2 overflow-y-auto">
        <NavigationMenu className="max-w-full">
          <div className="flex w-full flex-col gap-y-2">
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-2">Features</span>
            {productLinks.slice(0, 4).map((link) => (
              <ListItem key={link.title} {...link} />
            ))}
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-2 mt-2">Company</span>
            {companyLinks.map((link) => (
              <ListItem key={link.title} {...link} />
            ))}
          </div>
        </NavigationMenu>
        <div className="flex flex-col gap-2">
          <Button variant="outline" className="w-full bg-transparent" asChild>
            <Link to="/login">Sign In</Link>
          </Button>
          <Button className="w-full" asChild>
            <Link to="/register">Get Started Free</Link>
          </Button>
        </div>
      </MobileMenu>
    </header>
  )
}
