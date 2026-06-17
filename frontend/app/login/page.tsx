'use client'

import Link from 'next/link'
import { useState, useEffect, Suspense } from 'react'
import { Card, CardContent } from '@/components/ui/card-modern'
import { ArrowLeft, UserCircle2, CheckCircle2 } from 'lucide-react'
import { login } from '@/lib/api'
import { useRouter, useSearchParams } from 'next/navigation'

function LoginContent() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.get('signup') === 'success') {
      setSuccess('Account created successfully! Please sign in.')
    }
  }, [searchParams])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    try {
      const result = await login(email, password)
      if (result.success) {
        router.push('/dashboard')
      } else {
        setError(typeof result.error === 'string' ? result.error : 'Invalid credentials')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await login('analyst@example.com', 'password123')
      if (result.success) {
        router.push('/dashboard')
      } else {
        setError('Demo account not available')
      }
    } catch (err) {
      setError('Demo login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-sm">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-foreground/40 hover:text-primary mb-8 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to home
      </Link>

      <Card className="border-border/60 shadow-xl shadow-primary/5">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <UserCircle2 className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Welcome back</h1>
            <p className="text-xs text-foreground/50 mt-1 font-medium">Sign in to your FinanceFlow account</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-danger/5 border border-danger/10 rounded-xl text-danger text-[10px] font-bold text-center uppercase tracking-wide">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-3 bg-success/5 border border-success/10 rounded-xl text-success text-[10px] font-bold text-center uppercase tracking-wide flex items-center justify-center gap-2">
              <CheckCircle2 className="w-3 h-3" />
              {success}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 ml-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full px-4 py-2.5 bg-secondary/50 border border-border/60 rounded-xl text-xs text-foreground placeholder:text-foreground/20 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 ml-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-secondary/50 border border-border/60 rounded-xl text-xs text-foreground placeholder:text-foreground/20 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                required
              />
            </div>

            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-3.5 h-3.5 rounded-sm border-border accent-primary cursor-pointer" />
                <span className="text-[10px] font-bold text-foreground/40 group-hover:text-foreground transition-colors uppercase tracking-tight">Remember me</span>
              </label>
              <Link href="#" className="text-[10px] font-bold text-primary hover:text-primary/80 uppercase tracking-tight">
                Forgot?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-primary text-surface rounded-full font-bold text-xs uppercase tracking-widest hover:bg-primary/90 transition-all disabled:opacity-50 shadow-lg shadow-primary/20"
            >
              {isLoading ? 'Processing...' : 'Sign In'}
            </button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/20"></span>
              </div>
              <div className="relative flex justify-center text-[8px] uppercase font-black tracking-[0.2em]">
                <span className="bg-surface px-3 text-foreground/20">Instant Access</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={isLoading}
              className="w-full py-3 bg-secondary border border-border/60 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-secondary/80 hover:border-primary/20 transition-all disabled:opacity-50 text-foreground/60"
            >
              Try Demo
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-border/20 text-center">
            <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-tight">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-primary hover:text-primary/80 font-black">
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <Suspense fallback={
        <div className="w-full max-w-sm text-center">
          <p className="text-xs text-foreground/50 animate-pulse uppercase font-bold tracking-widest">Loading secure login...</p>
        </div>
      }>
        <LoginContent />
      </Suspense>
    </main>
  )
}
