'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ChevronDown, LogOut, Settings, User, LayoutDashboard, ReceiptText, BarChart2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { logout } from '@/lib/api'

export function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
    setIsLoggedIn(!!token)
  }, [])

  const handleLogout = () => {
    logout()
    setIsLoggedIn(false)
    setIsDropdownOpen(false)
    router.push('/login')
  }

  return (
    <header className="sticky top-0 z-50 bg-surface/70 backdrop-blur-lg border-b border-border/40">
      <nav className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center group-hover:rotate-6 transition-transform">
            <span className="text-surface font-black text-[10px]">FF</span>
          </div>
          <span className="font-bold text-sm tracking-tight text-foreground">FinanceFlow</span>
        </Link>

        {/* Navigation Links */}
        {isLoggedIn && (
          <div className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="flex items-center gap-1.5 text-foreground/60 hover:text-primary text-[11px] font-bold uppercase tracking-wider transition-colors">
              <LayoutDashboard className="w-3.5 h-3.5" />
              Dashboard
            </Link>
            <Link href="/transactions" className="flex items-center gap-1.5 text-foreground/60 hover:text-primary text-[11px] font-bold uppercase tracking-wider transition-colors">
              <ReceiptText className="w-3.5 h-3.5" />
              Transactions
            </Link>
            <Link href="/analytics" className="flex items-center gap-1.5 text-foreground/60 hover:text-primary text-[11px] font-bold uppercase tracking-wider transition-colors">
              <BarChart2 className="w-3.5 h-3.5" />
              Analytics
            </Link>
          </div>
        )}

        {/* Right Side - Auth/Profile */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full bg-secondary/50 border border-border/40 hover:border-primary/40 transition-all"
              >
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-3 h-3 text-primary" />
                </div>
                <ChevronDown className={`w-3 h-3 text-foreground/40 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-surface rounded-xl shadow-xl border border-border/40 py-1.5 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                  <Link href="/profile" className="flex items-center gap-2.5 px-4 py-2 text-[11px] font-bold text-foreground/70 hover:text-primary hover:bg-secondary/50 transition-colors">
                    <User className="w-3.5 h-3.5" />
                    Profile
                  </Link>
                  <Link href="/settings" className="flex items-center gap-2.5 px-4 py-2 text-[11px] font-bold text-foreground/70 hover:text-primary hover:bg-secondary/50 transition-colors">
                    <Settings className="w-3.5 h-3.5" />
                    Settings
                  </Link>
                  <div className="my-1.5 border-t border-border/20" />
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-[11px] font-bold text-danger hover:bg-danger/5 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="px-5 py-2 bg-primary text-surface rounded-full font-bold text-[11px] uppercase tracking-wider hover:bg-primary/90 transition-all shadow-md shadow-primary/10">
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}
