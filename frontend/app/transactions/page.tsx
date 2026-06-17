'use client'

import { Header } from '@/components/layout/header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card-modern'
import { ArrowUpRight, ArrowDownLeft, Search, Plus, Filter, Loader2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getTransactions, createTransaction } from '@/lib/api'

const backendCategories = [
  { value: 'salary', label: 'Salary', type: 'income' },
  { value: 'freelance', label: 'Freelance', type: 'income' },
  { value: 'investment', label: 'Investment', type: 'income' },
  { value: 'food', label: 'Food', type: 'expense' },
  { value: 'transport', label: 'Transport', type: 'expense' },
  { value: 'utilities', label: 'Utilities', type: 'expense' },
  { value: 'entertainment', label: 'Entertainment', type: 'expense' },
  { value: 'healthcare', label: 'Healthcare', type: 'expense' },
  { value: 'education', label: 'Education', type: 'expense' },
  { value: 'other', label: 'Other', type: 'expense' },
]

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showNewTransactionForm, setShowNewTransactionForm] = useState(false)

  // Form state
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('food')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      const data = await getTransactions()
      setTransactions(data)
    } catch (err) {
      console.error('Failed to fetch transactions', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddTransaction = async () => {
    if (!title || !amount || !category || !date) {
      alert('Please fill all fields')
      return
    }

    setIsSubmitting(true)
    try {
      const selectedCat = backendCategories.find(c => c.value === category)
      const type = selectedCat?.type || 'expense'
      
      await createTransaction({
        notes: title,
        amount: parseFloat(amount),
        category,
        transaction_type: type,
        date
      })
      
      // Reset form and refresh
      setTitle('')
      setAmount('')
      setShowNewTransactionForm(false)
      fetchTransactions()
    } catch (err) {
      console.error('Failed to create transaction', err)
      alert('Failed to create transaction')
    } finally {
      setIsSubmitting(false)
    }
  }

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.notes?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || tx.category === selectedCategory.toLowerCase()
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
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Transaction title"
                      className="w-full px-4 py-2 bg-secondary border border-border rounded-xl text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Amount</label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full px-4 py-2 bg-secondary border border-border rounded-xl text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                    <select 
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-2 bg-secondary border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      {backendCategories.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Date</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-2 bg-secondary border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <button 
                    onClick={handleAddTransaction}
                    disabled={isSubmitting}
                    className="flex-1 py-2 bg-primary text-surface rounded-full font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
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
                {['All', ...backendCategories.map(c => c.label)].map(catLabel => (
                  <button
                    key={catLabel}
                    onClick={() => setSelectedCategory(catLabel)}
                    className={`px-4 py-2 rounded-full font-medium transition-all ${
                      selectedCategory === catLabel
                        ? 'bg-primary text-surface'
                        : 'bg-secondary text-foreground hover:bg-secondary/70'
                    }`}
                  >
                    {catLabel}
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
              {isLoading ? (
                <div className="py-12 text-center">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary mb-4" />
                  <p className="text-foreground/60">Loading transactions...</p>
                </div>
              ) : filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction, index) => (
                  <div
                    key={transaction.id}
                    className={`flex items-center justify-between py-4 ${
                      index !== filteredTransactions.length - 1 ? 'border-b border-border/20' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        transaction.transaction_type === 'income'
                          ? 'bg-success/10'
                          : 'bg-danger/10'
                      }`}>
                        {transaction.transaction_type === 'income' ? (
                          <ArrowDownLeft className="w-6 h-6 text-success" />
                        ) : (
                          <ArrowUpRight className="w-6 h-6 text-danger" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{transaction.notes || 'Untitled'}</p>
                        <p className="text-sm text-foreground/60 capitalize">{transaction.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        transaction.transaction_type === 'income'
                          ? 'text-success'
                          : 'text-danger'
                      }`}>
                        {transaction.transaction_type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
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
