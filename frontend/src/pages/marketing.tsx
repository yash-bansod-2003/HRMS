import { Link } from "react-router";
import {
  IconUsers,
  IconCalendarStats,
  IconChartBar,
  IconShieldCheck,
  IconBuildingSkyscraper,
  IconClockHour4,
  IconArrowRight,
  IconCheck,
} from "@tabler/icons-react";

import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
            <IconBuildingSkyscraper className="size-4 text-primary-foreground" />
          </div>
          <span className="font-semibold tracking-tight">HRMS</span>
        </div>

        <nav className="hidden items-center gap-6 text-sm text-muted-foreground sm:flex">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#stats" className="hover:text-foreground transition-colors">Stats</a>
          <a href="#how-it-works" className="hover:text-foreground transition-colors">How it works</a>
        </nav>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <Link to="/dashboard" className={cn(buttonVariants({ size: "sm" }))}>
            Go to Dashboard
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 pb-20 pt-24 text-center sm:px-6">
      {/* subtle radial glow behind headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,hsl(var(--primary)/0.15),transparent)]"
      />

      <Badge variant="outline" className="gap-1.5 rounded-full px-3 py-1 text-xs">
        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>{" "}
        Human Resource Management System
      </Badge>

      <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
        Manage your workforce{" "}
        <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          with clarity
        </span>
      </h1>

      <p className="max-w-xl text-balance text-lg text-muted-foreground">
        HRMS brings employee records and attendance tracking into one clean
        dashboard — so HR teams spend less time on admin and more time on people.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link to="/dashboard" className={cn(buttonVariants({ size: "lg" }), "gap-2")}>
          Open Dashboard <IconArrowRight className="size-4" />
        </Link>
        <a
          href="#features"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
        >
          See features
        </a>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
        {["No credit card required", "Open source", "Self-hostable"].map((t) => (
          <span key={t} className="flex items-center gap-1.5">
            <IconCheck className="size-3.5 text-primary" />
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}

const FEATURES = [
  {
    icon: IconUsers,
    title: "Employee Management",
    description:
      "Create, update, and organise employee profiles including contact details, role, and department — all in one place.",
  },
  {
    icon: IconCalendarStats,
    title: "Attendance Tracking",
    description:
      "Log check-in / check-out records, monitor daily presence, and surface absence patterns instantly.",
  },
  {
    icon: IconChartBar,
    title: "Live Dashboard",
    description:
      "See today's headcount, absent employees, and monthly attendance rate at a glance from an auto-refreshing dashboard.",
  },
  {
    icon: IconClockHour4,
    title: "Shift & Date Aware",
    description:
      "Every attendance record stores precise timestamps and is linked to the correct employee automatically.",
  },
  {
    icon: IconShieldCheck,
    title: "Role-based Access",
    description:
      "Built on a Django REST backend with token-based auth, keeping sensitive HR data secure and auditable.",
  },
  {
    icon: IconBuildingSkyscraper,
    title: "Multi-department Ready",
    description:
      "Designed to scale — add any number of employees across departments without performance trade-offs.",
  },
];

function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mb-12 text-center">
        <Badge variant="outline" className="mb-3 rounded-full">Features</Badge>
        <h2 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Everything HR needs
        </h2>
        <p className="mx-auto max-w-md text-muted-foreground">
          A focused set of tools built around the real day-to-day workflows of
          an HR team — nothing more, nothing less.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map(({ icon: Icon, title, description }) => (
          <Card
            key={title}
            className="group transition-shadow hover:shadow-md bg-linear-to-t from-primary/5 to-card"
          >
            <CardHeader className="gap-3 pb-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-5" />
              </div>
              <CardTitle className="text-base">{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="leading-relaxed">{description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

const STATS = [
  { value: "100%", label: "Open source & self-hostable" },
  { value: "REST", label: "Clean API-first architecture" },
  { value: "2 min", label: "Average time to onboard an employee" },
];

function Stats() {
  return (
    <section id="stats" className="border-y border-border bg-muted/40">
      <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {STATS.map(({ value, label }) => (
          <div key={label} className="flex flex-col items-center gap-1 px-6 py-12">
            <span className="text-4xl font-bold text-primary">{value}</span>
            <span className="text-center text-sm text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

const STEPS = [
  {
    step: "01",
    title: "Add employees",
    description:
      "Fill in the employee form with name, email, phone, and department details. Records are persisted instantly.",
  },
  {
    step: "02",
    title: "Record attendance",
    description:
      "Create an attendance entry per employee per day — the system stores the exact date and status automatically.",
  },
  {
    step: "03",
    title: "Review the dashboard",
    description:
      "The home dashboard aggregates today's attendance and monthly rates in real time so managers stay informed.",
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mb-12 text-center">
        <Badge variant="outline" className="mb-3 rounded-full">Workflow</Badge>
        <h2 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Up and running in minutes
        </h2>
        <p className="mx-auto max-w-md text-muted-foreground">
          Three steps is all it takes to go from zero to a fully tracked workforce.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {STEPS.map(({ step, title, description }) => (
          <div key={step} className="flex flex-col gap-3">
            <span className="text-5xl font-black text-primary/20 leading-none">{step}</span>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CtaBanner() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      <div className="relative overflow-hidden rounded-2xl bg-primary px-8 py-16 text-center text-primary-foreground">
        {/* decorative circles */}
        <div aria-hidden className="pointer-events-none absolute -left-12 -top-12 h-48 w-48 rounded-full bg-white/5" />
        <div aria-hidden className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-white/5" />

        <Badge className="mb-4 border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground">
          Get started today
        </Badge>
        <h2 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Ready to simplify HR?
        </h2>
        <p className="mx-auto mb-8 max-w-md text-primary-foreground/80">
          Head straight to the dashboard — no sign-up friction, no paywalls.
          Your workforce data is waiting.
        </p>
        <Link
          to="/dashboard"
          className={cn(
            buttonVariants({ size: "lg" }),
            "bg-background text-foreground hover:bg-background/90 gap-2"
          )}
        >
          Open Dashboard <IconArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded bg-primary">
            <IconBuildingSkyscraper className="size-3 text-primary-foreground" />
          </div>
          <span className="font-medium text-foreground">HRMS</span>
        </div>
        <p>© {new Date().getFullYear()} HRMS. Built with Django &amp; React.</p>
        <Link to="/dashboard" className="hover:text-foreground transition-colors underline underline-offset-4">
          Dashboard →
        </Link>
      </div>
    </footer>
  );
}

export default function MarketingPage() {
  return (
    <div className="min-h-svh bg-background font-sans text-foreground antialiased">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Stats />
        <HowItWorks />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
