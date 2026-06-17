'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/layout/header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card-modern'
import { BarChart3, TrendingDown, TrendingUp, Loader2, ArrowUpRight, ArrowDownRight, Wallet } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { getDashboardSummary, getDashboardTrends, getDashboardByCategory, apiFetch } from '@/lib/api'

export default function DashboardPage() {
  const [summary, setSummary] = useState<any>(null)
  const [trends, setTrends] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [recent, setRecent] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const [summaryData, trendsData, categoriesData, recentRes] = await Promise.all([
          getDashboardSummary(),
          getDashboardTrends(),
          getDashboardByCategory(),
          apiFetch('/api/dashboard/recent/'),
        ])

        if (!recentRes.ok) {
          throw new Error('Failed to fetch recent activity')
        }

        const recentData = await recentRes.json()

        setSummary(summaryData)
        setTrends((trendsData || []).map((d: any) => ({
          ...d,
          month: new Date(d.month).toLocaleString('default', { month: 'short' }),
          income: parseFloat(d.income || 0),
          expenses: parseFloat(d.expenses || 0),
        })))
        setCategories((categoriesData || []).map((c: any) => ({
          name: c.category.charAt(0).toUpperCase() + c.category.slice(1),
          value: parseFloat(c.total || 0),
        })))
        setRecent(recentData || [])
      } catch (err) {
        console.error('Dashboard data fetch error:', err)
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-primary animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6 text-center">
        <div className="max-w-xs">
          <h2 className="text-xl font-bold text-foreground mb-2">Error</h2>
          <p className="text-xs text-foreground/60 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-5 py-2 bg-primary text-surface rounded-full font-semibold text-xs transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  const summaryCards = [
    { label: 'Total Income', value: summary?.total_income || 0, icon: ArrowUpRight, color: 'text-success', bg: 'bg-success/10' },
    { label: 'Total Expenses', value: summary?.total_expenses || 0, icon: ArrowDownRight, color: 'text-danger', bg: 'bg-danger/10' },
    { label: 'Net Balance', value: summary?.net_balance || 0, icon: Wallet, color: 'text-primary', bg: 'bg-primary/10' },
  ]

  const COLORS = ['#CBAE82', '#D4BFA0', '#DDD0C0', '#E8E0D8', '#F0EAE0']

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-foreground mb-1">Dashboard</h1>
          <p className="text-xs text-foreground/60 tracking-wide uppercase font-bold">Financial Overview</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {summaryCards.map((item, index) => {
            const Icon = item.icon
            return (
              <Card key={index} className="overflow-hidden border-border/60">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-extrabold text-foreground/40 mb-1">{item.label}</p>
                      <p className="text-2xl font-bold text-foreground tracking-tight">
                        ${(item.value || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-10">
          {/* Income vs Expenses Trend */}
          <Card className="lg:col-span-2 border-border/60">
            <CardHeader className="p-5 pb-0">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-foreground/60">Monthly Trends</CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-2">
              <div className="h-[260px] w-full">
                {trends.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#CBAE82" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#CBAE82" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#EF4444" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#9CA3AF' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#9CA3AF' }} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', fontSize: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                      />
                      <Area type="monotone" dataKey="income" stroke="#CBAE82" strokeWidth={2} fillOpacity={1} fill="url(#colorIncome)" name="Income" />
                      <Area type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={2} fillOpacity={1} fill="url(#colorExpense)" name="Expenses" />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-foreground/40 text-xs">
                    No activity recorded yet
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Category Spending Pie */}
          <Card className="border-border/60">
            <CardHeader className="p-5 pb-0">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-foreground/60">Distribution</CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0 flex justify-center">
              <div className="h-[260px] w-full">
                {categories.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categories}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={4}
                        dataKey="value"
                        stroke="none"
                      >
                        {categories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="outline-none" />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', fontSize: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-foreground/40 text-xs text-center p-4">
                    Categorized expenses will appear here
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card className="border-border/60">
          <CardHeader className="p-5 pb-0">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-foreground/60">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-4">
            <div className="space-y-1">
              {recent.length > 0 ? recent.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between py-2.5 px-3 hover:bg-secondary/30 rounded-lg transition-colors group">
                  <div className="flex-1">
                    <p className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">{transaction.notes || 'No notes'}</p>
                    <p className="text-[10px] text-foreground/40 font-bold uppercase tracking-tight">{transaction.category}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-bold ${transaction.transaction_type === 'income' ? 'text-success' : 'text-foreground'}`}>
                      {transaction.transaction_type === 'income' ? '+' : '-'}${parseFloat(transaction.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-[10px] text-foreground/40 font-medium">{transaction.date}</p>
                  </div>
                </div>
              )) : (
                <p className="text-center py-10 text-xs text-foreground/40">No transactions found</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
