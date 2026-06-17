'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { ArrowRight, BarChart3, TrendingUp, Zap, Wallet, CreditCard, DollarSign } from 'lucide-react'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
    setIsLoggedIn(!!token)
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wide uppercase">
                <Zap className="w-3 h-3" /> Smart Finance
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight tracking-tight">
                Financial intelligence at your fingertips
              </h1>
              <p className="text-base text-foreground/60 leading-relaxed max-w-md">
                Transform your financial data into actionable insights. Track, analyze, and optimize your finances with FinanceFlow&apos;s intelligent platform.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={isLoggedIn ? "/dashboard" : "/login"}
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-surface rounded-full font-semibold text-base hover:bg-primary/90 transition-all hover:shadow-lg ring-4 ring-primary/10"
              >
                {isLoggedIn ? "Go to Dashboard" : "Try Now Free"} <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                href="#features"
                className="inline-flex items-center justify-center px-6 py-3 bg-surface border border-border rounded-full font-semibold text-base text-foreground hover:bg-secondary/50 transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Visual - Replaced blank rectangle with clean financial card */}
          <div className="hidden md:block">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl blur-2xl group-hover:blur-3xl transition-all"></div>
              <div className="relative bg-surface rounded-2xl border border-border/60 p-6 shadow-xl backdrop-blur-sm">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Wallet className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-bold text-foreground/40">Total Balance</p>
                      <p className="text-xl font-bold text-foreground">$45,230.00</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-wider font-bold text-foreground/40">Monthly Savings</p>
                    <p className="text-sm font-bold text-success">+12.5%</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-[10px] uppercase tracking-wider font-bold text-foreground/40 mb-2">Recent Transactions</p>
                  {[
                    { icon: CreditCard, label: 'Apple Store', amount: '-$1,299.00', color: 'bg-blue-500/10 text-blue-500' },
                    { icon: DollarSign, label: 'Freelance Payout', amount: '+$3,400.00', color: 'bg-success/10 text-success' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 border border-border/40">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.color}`}>
                          <item.icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-semibold text-foreground">{item.label}</span>
                      </div>
                      <span className="text-xs font-bold text-foreground">{item.amount}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-border/40 flex justify-between items-center">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-6 h-6 rounded-full border-2 border-surface bg-secondary/80"></div>
                    ))}
                  </div>
                  <p className="text-[10px] font-medium text-foreground/60">Trusted by 10k+ users</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-3">Powerful Features</h2>
          <p className="text-sm text-foreground/60">Everything you need to manage your finances</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: TrendingUp,
              title: 'Real-time Analytics',
              description: 'Monitor your financial metrics with live updates and comprehensive dashboards.',
            },
            {
              icon: BarChart3,
              title: 'Smart Insights',
              description: 'Get AI-powered recommendations based on your spending patterns and trends.',
            },
            {
              icon: Zap,
              title: 'Fast & Reliable',
              description: 'Lightning-fast performance with enterprise-grade security and reliability.',
            },
          ].map((feature, i) => {
            const Icon = feature.icon
            return (
              <div
                key={i}
                className="bg-surface rounded-2xl border border-border/40 p-6 shadow-sm hover:shadow-md transition-all hover:border-primary/30"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-surface rounded-2xl border border-border/40 p-10 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
          <h2 className="text-3xl font-bold text-foreground mb-3">Ready to get started?</h2>
          <p className="text-sm text-foreground/60 mb-6">Join thousands of users managing their finances with FinanceFlow</p>
          <Link
            href={isLoggedIn ? "/dashboard" : "/login"}
            className="inline-flex items-center px-8 py-3 bg-primary text-surface rounded-full font-semibold text-base hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
          >
            {isLoggedIn ? "Go to Dashboard" : "Sign In Now"} <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-surface/50 py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest font-bold text-foreground/40">
            <p>&copy; 2025 FinanceFlow. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
              <Link href="#" className="hover:text-primary transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
