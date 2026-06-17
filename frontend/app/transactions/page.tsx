'use client'

import { Header } from '@/components/layout/header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card-modern'
import { ArrowUpRight, ArrowDownLeft, Search, Plus, Filter } from 'lucide-react'
import { useState } from 'react'

const allTransactions = [
  { id: 1, title: 'Whole Foods Market', amount: -127.50, date: '2025-06-15', category: 'Food', type: 'expense' },
  { id: 2, title: 'Freelance Project Payment', amount: 1200.00, date: '2025-06-14', category: 'Income', type: 'income' },
  { id: 3, title: 'Electric Bill', amount: -89.00, date: '2025-06-13', category: 'Utilities', type: 'expense' },
  { id: 4, title: 'Restaurant (Dinner)', amount: -45.30, date: '2025-06-12', category: 'Food', type: 'expense' },
  { id: 5, title: 'Shell Gas Station', amount: -52.00, date: '2025-06-11', category: 'Transport', type: 'expense' },
  { id: 6, title: 'Monthly Salary', amount: 5000.00, date: '2025-06-10', category: 'Income', type: 'income' },
  { id: 7, title: 'Netflix Subscription', amount: -15.99, date: '2025-06-09', category: 'Entertainment', type: 'expense' },
  { id: 8, title: 'Coffee Shop', amount: -8.50, date: '2025-06-08', category: 'Food', type: 'expense' },
  { id: 9, title: 'Amazon Purchase', amount: -234.56, date: '2025-06-07', category: 'Shopping', type: 'expense' },
  { id: 10, title: 'Gym Membership', amount: -49.99, date: '2025-06-06', category: 'Health', type: 'expense' },
]

const categories = ['All', 'Food', 'Transport', 'Utilities', 'Entertainment', 'Shopping', 'Health', 'Income']

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showNewTransactionForm, setShowNewTransactionForm] = useState(false)

  const filteredTransactions = allTransactions.filter(tx => {
    const matchesSearch = tx.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || tx.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-display font-bold text-foreground mb-2">Transactions</h1>
            <p className="text-foreground/60">Manage and track all your financial transactions</p>
          </div>
          <button
            onClick={() => setShowNewTransactionForm(!showNewTransactionForm)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-surface rounded-full font-semibold hover:bg-primary/90 transition-all w-fit"
          >
            <Plus className="w-5 h-5" />
            New Transaction
          </button>
        </div>

        {/* New Transaction Form */}
        {showNewTransactionForm && (
          <Card className="mb-8">
            <CardContent className="pt-6 pb-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Title</label>
                    <input
                      type="text"
                      placeholder="Transaction title"
                      className="w-full px-4 py-2 bg-secondary border border-border rounded-xl text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Amount</label>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full px-4 py-2 bg-secondary border border-border rounded-xl text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                    <select className="w-full px-4 py-2 bg-secondary border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20">
                      {categories.filter(c => c !== 'All').map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Date</label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 bg-secondary border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <button className="flex-1 py-2 bg-primary text-surface rounded-full font-semibold hover:bg-primary/90 transition-all">
                    Add Transaction
                  </button>
                  <button
                    onClick={() => setShowNewTransactionForm(false)}
                    className="flex-1 py-2 bg-secondary border border-border rounded-full font-semibold hover:bg-secondary/70 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6 pb-6">
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search transactions..."
                  className="w-full pl-12 pr-4 py-3 bg-secondary border border-border rounded-2xl text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-primary text-surface'
                        : 'bg-secondary text-foreground hover:bg-secondary/70'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transactions List */}
        <Card>
          <CardHeader>
            <CardTitle>All Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-0">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction, index) => (
                  <div
                    key={transaction.id}
                    className={`flex items-center justify-between py-4 ${
                      index !== filteredTransactions.length - 1 ? 'border-b border-border/20' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        transaction.type === 'income'
                          ? 'bg-success/10'
                          : 'bg-danger/10'
                      }`}>
                        {transaction.type === 'income' ? (
                          <ArrowDownLeft className="w-6 h-6 text-success" />
                        ) : (
                          <ArrowUpRight className="w-6 h-6 text-danger" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{transaction.title}</p>
                        <p className="text-sm text-foreground/60">{transaction.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        transaction.type === 'income'
                          ? 'text-success'
                          : 'text-danger'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                      </p>
                      <p className="text-sm text-foreground/60">{transaction.date}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center">
                  <p className="text-foreground/60">No transactions found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
