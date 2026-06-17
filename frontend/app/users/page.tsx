'use client'

import { Header } from '@/components/layout/header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card-modern'
import { Search, Filter, Plus, MoreVertical, Shield, Trash2 } from 'lucide-react'
import { useState } from 'react'

const allUsers = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah.johnson@example.com', role: 'Admin', status: 'Active', joinDate: '2024-01-15' },
  { id: 2, name: 'Michael Chen', email: 'michael.chen@example.com', role: 'User', status: 'Active', joinDate: '2024-02-20' },
  { id: 3, name: 'Emma Davis', email: 'emma.davis@example.com', role: 'User', status: 'Active', joinDate: '2024-03-10' },
  { id: 4, name: 'James Wilson', email: 'james.wilson@example.com', role: 'Moderator', status: 'Inactive', joinDate: '2024-01-30' },
  { id: 5, name: 'Lisa Anderson', email: 'lisa.anderson@example.com', role: 'User', status: 'Active', joinDate: '2024-04-05' },
  { id: 6, name: 'David Martinez', email: 'david.martinez@example.com', role: 'User', status: 'Active', joinDate: '2024-04-12' },
  { id: 7, name: 'Jessica Brown', email: 'jessica.brown@example.com', role: 'Admin', status: 'Active', joinDate: '2024-01-22' },
  { id: 8, name: 'Robert Taylor', email: 'robert.taylor@example.com', role: 'User', status: 'Inactive', joinDate: '2024-03-18' },
]

const roles = ['All', 'Admin', 'Moderator', 'User']
const statuses = ['All', 'Active', 'Inactive']

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRole, setSelectedRole] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [openMenuId, setOpenMenuId] = useState<number | null>(null)

  const filteredUsers = allUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = selectedRole === 'All' || user.role === selectedRole
    const matchesStatus = selectedStatus === 'All' || user.status === selectedStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-display font-bold text-foreground mb-2">Users</h1>
            <p className="text-foreground/60">Manage and monitor user accounts</p>
          </div>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-surface rounded-full font-semibold hover:bg-primary/90 transition-all w-fit">
            <Plus className="w-5 h-5" />
            Invite User
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="pt-6 pb-6">
              <p className="text-sm text-foreground/60 mb-2">Total Users</p>
              <p className="text-3xl font-display font-bold text-foreground">{allUsers.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 pb-6">
              <p className="text-sm text-foreground/60 mb-2">Active Users</p>
              <p className="text-3xl font-display font-bold text-foreground">{allUsers.filter(u => u.status === 'Active').length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 pb-6">
              <p className="text-sm text-foreground/60 mb-2">Admins</p>
              <p className="text-3xl font-display font-bold text-foreground">{allUsers.filter(u => u.role === 'Admin').length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 pb-6">
              <p className="text-sm text-foreground/60 mb-2">Inactive Users</p>
              <p className="text-3xl font-display font-bold text-foreground">{allUsers.filter(u => u.status === 'Inactive').length}</p>
            </CardContent>
          </Card>
        </div>

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
                  placeholder="Search users by name or email..."
                  className="w-full pl-12 pr-4 py-3 bg-secondary border border-border rounded-2xl text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Role Filter */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Role</label>
                <div className="flex flex-wrap gap-2">
                  {roles.map(role => (
                    <button
                      key={role}
                      onClick={() => setSelectedRole(role)}
                      className={`px-4 py-2 rounded-full font-medium transition-all ${
                        selectedRole === role
                          ? 'bg-primary text-surface'
                          : 'bg-secondary text-foreground hover:bg-secondary/70'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Status</label>
                <div className="flex flex-wrap gap-2">
                  {statuses.map(status => (
                    <button
                      key={status}
                      onClick={() => setSelectedStatus(status)}
                      className={`px-4 py-2 rounded-full font-medium transition-all ${
                        selectedStatus === status
                          ? 'bg-primary text-surface'
                          : 'bg-secondary text-foreground hover:bg-secondary/70'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>User Directory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/20">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Role</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Join Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b border-border/20 hover:bg-secondary/30 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary/40 to-primary/20 rounded-full flex items-center justify-center">
                              <span className="text-sm font-semibold text-primary">{user.name.charAt(0)}</span>
                            </div>
                            <span className="font-medium text-foreground">{user.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-foreground/70">{user.email}</td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                            user.role === 'Admin'
                              ? 'bg-primary/10 text-primary'
                              : user.role === 'Moderator'
                              ? 'bg-primary/5 text-primary/70'
                              : 'bg-secondary text-foreground/70'
                          }`}>
                            {user.role === 'Admin' && <Shield className="w-3 h-3" />}
                            {user.role}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                            user.status === 'Active'
                              ? 'bg-success/10 text-success'
                              : 'bg-foreground/10 text-foreground/60'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-foreground/70">{user.joinDate}</td>
                        <td className="py-4 px-4">
                          <div className="relative">
                            <button
                              onClick={() => setOpenMenuId(openMenuId === user.id ? null : user.id)}
                              className="p-2 hover:bg-secondary rounded-lg transition-colors"
                            >
                              <MoreVertical className="w-5 h-5 text-foreground/60" />
                            </button>
                            {openMenuId === user.id && (
                              <div className="absolute right-0 mt-2 w-48 bg-surface rounded-xl shadow-md border border-border/40 py-2 z-50">
                                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-secondary/50 transition-colors">
                                  <Shield className="w-4 h-4" />
                                  Change Role
                                </button>
                                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-danger hover:bg-danger/5 transition-colors">
                                  <Trash2 className="w-4 h-4" />
                                  Remove User
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-foreground/60">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
