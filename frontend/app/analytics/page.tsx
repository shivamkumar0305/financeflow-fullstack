'use client'

import { Header } from '@/components/layout/header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card-modern'
import { TrendingUp, TrendingDown, Calendar } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, Legend, ComposedChart, Area } from 'recharts'

const monthlyData = [
  { month: 'Jan', income: 4000, expenses: 2400, savings: 1600 },
  { month: 'Feb', income: 3000, expenses: 1398, savings: 1602 },
  { month: 'Mar', income: 2000, expenses: 9800, savings: -7800 },
  { month: 'Apr', income: 2780, expenses: 3908, savings: -1128 },
  { month: 'May', income: 1890, expenses: 4800, savings: -2910 },
  { month: 'Jun', income: 2390, expenses: 3800, savings: -1410 },
  { month: 'Jul', income: 3490, expenses: 4300, savings: -810 },
]

const categoryTrendData = [
  { month: 'Jan', food: 800, transport: 400, utilities: 300, entertainment: 200, shopping: 700 },
  { month: 'Feb', food: 920, transport: 380, utilities: 280, entertainment: 220, shopping: 600 },
  { month: 'Mar', food: 1200, transport: 500, utilities: 320, entertainment: 300, shopping: 1500 },
  { month: 'Apr', food: 950, transport: 420, utilities: 300, entertainment: 250, shopping: 888 },
  { month: 'May', food: 1100, transport: 450, utilities: 310, entertainment: 280, shopping: 1200 },
  { month: 'Jun', food: 1050, transport: 480, utilities: 330, entertainment: 240, shopping: 950 },
  { month: 'Jul', food: 1150, transport: 420, utilities: 340, entertainment: 220, shopping: 870 },
]

const spendingPatternData = [
  { month: 'Week 1', amount: 450 },
  { month: 'Week 2', amount: 620 },
  { month: 'Week 3', amount: 380 },
  { month: 'Week 4', amount: 750 },
]

const statsCards = [
  {
    title: 'Average Monthly Income',
    value: '$2,934',
    change: '+2.5%',
    icon: TrendingUp,
    color: 'text-success',
  },
  {
    title: 'Average Monthly Expense',
    value: '$4,227',
    change: '+8.2%',
    icon: TrendingDown,
    color: 'text-danger',
  },
  {
    title: 'Total Savings',
    value: '$3,892',
    change: '-15.3%',
    icon: TrendingDown,
    color: 'text-primary',
  },
  {
    title: 'Expense Trend',
    value: '+12.5%',
    change: 'vs last month',
    icon: TrendingUp,
    color: 'text-danger',
  },
]

export default function AnalyticsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
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
                      <p className={`text-xs mt-1 ${stat.color}`}>{stat.change}</p>
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
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={monthlyData}>
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
            </CardContent>
          </Card>

          {/* Spending by Category Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Category Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={categoryTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px' }}
                    labelStyle={{ color: '#0F0F0F' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="food" stroke="#CBAE82" strokeWidth={2} />
                  <Line type="monotone" dataKey="transport" stroke="#D4BFA0" strokeWidth={2} />
                  <Line type="monotone" dataKey="shopping" stroke="#EF4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Spending Pattern */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Weekly Spending Pattern</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={spendingPatternData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px' }}
                  labelStyle={{ color: '#0F0F0F' }}
                />
                <Bar dataKey="amount" fill="#CBAE82" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Key Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-foreground/80">Your spending increased by 12.5% compared to last month</p>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-foreground/80">Food expenses are your largest spending category</p>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-danger rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-foreground/80">Shopping expenses peaked in March with $1,500</p>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-foreground/80">Average weekly spending is $550</p>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-foreground/80">Consider reducing shopping expenses by 15% next month</p>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-foreground/80">You could save $200 by meal planning</p>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-danger rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-foreground/80">Utilities are consistent - no action needed</p>
                </li>
                <li className="flex gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-foreground/80">Set a monthly budget goal of $4,000</p>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
