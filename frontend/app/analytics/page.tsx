'use client'

import { Header } from '@/components/layout/header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card-modern'
import { TrendingUp, TrendingDown, Loader2 } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ComposedChart } from 'recharts'
import { useState, useEffect } from 'react'
import { getDashboardSummary, getDashboardTrends, getDashboardByCategory } from '@/lib/api'

export default function AnalyticsPage() {
  const [summary, setSummary] = useState<any>(null)
  const [trends, setTrends] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const [summaryData, trendsData, categoriesData] = await Promise.all([
        getDashboardSummary(),
        getDashboardTrends(),
        getDashboardByCategory()
      ])
      setSummary(summaryData)
      
      // Format trends data for recharts
      const formattedTrends = (trendsData || []).map((t: any) => {
        // Safe date parsing: "2023-01-01" -> "Jan"
        const [year, month, day] = t.month.split('-').map(Number);
        const dateObj = new Date(year, month - 1, day);
        return {
          month: dateObj.toLocaleString('default', { month: 'short' }),
          income: parseFloat(t.income || 0),
          expenses: parseFloat(t.expenses || 0),
          savings: parseFloat(t.income || 0) - parseFloat(t.expenses || 0)
        }
      })
      setTrends(formattedTrends)
      
      setCategories((categoriesData || []).map((c: any) => ({
        category: c.category.charAt(0).toUpperCase() + c.category.slice(1),
        amount: parseFloat(c.total || 0)
      })))

    } catch (err) {
      console.error('Failed to fetch analytics data', err)
    } finally {
      setIsLoading(false)
    }
  }

  const statsCards = [
    {
      title: 'Total Income',
      value: summary ? `$${summary.total_income.toLocaleString()}` : '$0',
      icon: TrendingUp,
      color: 'text-success',
    },
    {
      title: 'Total Expenses',
      value: summary ? `$${summary.total_expenses.toLocaleString()}` : '$0',
      icon: TrendingDown,
      color: 'text-danger',
    },
    {
      title: 'Net Balance',
      value: summary ? `$${summary.net_balance.toLocaleString()}` : '$0',
      icon: summary?.net_balance >= 0 ? TrendingUp : TrendingDown,
      color: summary?.net_balance >= 0 ? 'text-success' : 'text-danger',
    },
    {
      title: 'Transactions',
      value: summary ? summary.record_count.toString() : '0',
      icon: TrendingUp,
      color: 'text-primary',
    },
  ]

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-display font-bold text-foreground mb-2">Analytics</h1>
          <p className="text-foreground/60">Deep insights into your spending and income patterns</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index}>
                <CardContent className="pt-6 pb-6">
                  <p className="text-sm text-foreground/60 mb-2">{stat.title}</p>
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-3xl font-display font-bold text-foreground">{stat.value}</p>
                    </div>
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Income vs Expenses vs Savings */}
          <Card>
            <CardHeader>
              <CardTitle>Income vs Expenses vs Savings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                {trends.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={trends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="month" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px' }}
                        labelStyle={{ color: '#0F0F0F' }}
                      />
                      <Legend />
                      <Bar dataKey="income" fill="#22C55E" radius={[8, 8, 0, 0]} />
                      <Bar dataKey="expenses" fill="#EF4444" radius={[8, 8, 0, 0]} />
                      <Line type="monotone" dataKey="savings" stroke="#CBAE82" strokeWidth={2} />
                    </ComposedChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-foreground/40">
                    No trend data available
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Spending by Category */}
          <Card>
            <CardHeader>
              <CardTitle>Spending by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                {categories.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categories} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis type="number" stroke="#6B7280" />
                      <YAxis dataKey="category" type="category" stroke="#6B7280" width={100} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px' }}
                        labelStyle={{ color: '#0F0F0F' }}
                      />
                      <Bar dataKey="amount" fill="#CBAE82" radius={[0, 8, 8, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-foreground/40">
                    No category data available
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Insights & Recommendations - Now based on real data or placeholders if data is low */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Key Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {summary && summary.record_count > 0 ? (
                  <>
                    <li className="flex gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-foreground/80">You have recorded {summary.record_count} transactions so far.</p>
                    </li>
                    <li className="flex gap-3">
                      <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-foreground/80">
                        {summary.net_balance >= 0 
                          ? `Your net balance is positive: $${summary.net_balance.toLocaleString()}` 
                          : `Your net balance is negative: $${Math.abs(summary.net_balance).toLocaleString()}`}
                      </p>
                    </li>
                    {categories.length > 0 && (
                      <li className="flex gap-3">
                        <div className="w-2 h-2 bg-danger rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-foreground/80">Your top spending category is {categories[0].category}.</p>
                      </li>
                    )}
                  </>
                ) : (
                  <li className="flex gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-foreground/80">Start adding transactions to see your financial insights.</p>
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {summary && summary.total_expenses > summary.total_income ? (
                  <li className="flex gap-3">
                    <div className="w-2 h-2 bg-danger rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-foreground/80">Your expenses exceed your income. Consider reviewing your top spending categories.</p>
                  </li>
                ) : summary && summary.record_count > 0 ? (
                  <li className="flex gap-3">
                    <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-foreground/80">You're maintaining a positive balance. Keep it up!</p>
                  </li>
                ) : null}
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-foreground/80">Regularly categorizing your transactions helps in better analysis.</p>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
