'use client'

import { Header } from '@/components/layout/header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card-modern'
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save, Loader2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getProfile } from '@/lib/api'

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: 'Not provided',
    location: 'Not provided',
    joinDate: '',
    role: ''
  })

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const data = await getProfile()
      if (data) {
        setProfile({
          name: data.full_name || '',
          email: data.email || '',
          phone: 'Not provided',
          location: 'Not provided',
          joinDate: data.date_joined ? new Date(data.date_joined).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) : '',
          role: data.role || ''
        })
      }
    } catch (err) {
      console.error('Failed to fetch profile', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = () => {
    setIsEditing(false)
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-display font-bold text-foreground mb-2">Profile</h1>
          <p className="text-foreground/60">Manage your account information</p>
        </div>

        {/* Profile Card */}
        <Card className="mb-8">
          <CardContent className="pt-8 pb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gradient-to-br from-primary/40 to-primary/20 rounded-2xl flex items-center justify-center">
                  <User className="w-12 h-12 text-primary" />
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Full Name</label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="w-full px-4 py-2 bg-secondary border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="w-full px-4 py-2 bg-secondary border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Phone</label>
                        <input
                          type="tel"
                          value={profile.phone}
                          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                          className="w-full px-4 py-2 bg-secondary border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Location</label>
                        <input
                          type="text"
                          value={profile.location}
                          onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                          className="w-full px-4 py-2 bg-secondary border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>
                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-primary text-surface rounded-full font-semibold hover:bg-primary/90 transition-all flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        Save Changes
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-2 bg-secondary border border-border rounded-full font-semibold hover:bg-secondary/70 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-3xl font-display font-bold text-foreground mb-1">{profile.name}</h2>
                      <p className="text-foreground/60">{profile.email} • <span className="capitalize">{profile.role}</span></p>
                    </div>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-primary/10 text-primary rounded-full font-semibold hover:bg-primary/20 transition-all flex items-center gap-2"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Details */}
        {!isEditing && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6 pb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60 mb-1">Email</p>
                    <p className="font-medium text-foreground">{profile.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 pb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60 mb-1">Phone</p>
                    <p className="font-medium text-foreground">{profile.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 pb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60 mb-1">Location</p>
                    <p className="font-medium text-foreground">{profile.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 pb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60 mb-1">Member Since</p>
                    <p className="font-medium text-foreground">{profile.joinDate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Account Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Account Security</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between py-3 px-4 bg-secondary/50 hover:bg-secondary rounded-xl transition-all">
                <span className="font-medium text-foreground">Change Password</span>
                <span className="text-foreground/40">&rarr;</span>
              </button>
              <button className="w-full flex items-center justify-between py-3 px-4 bg-secondary/50 hover:bg-secondary rounded-xl transition-all">
                <span className="font-medium text-foreground">Two-Factor Authentication</span>
                <span className="text-success">Enabled</span>
              </button>
              <button className="w-full flex items-center justify-between py-3 px-4 bg-secondary/50 hover:bg-secondary rounded-xl transition-all">
                <span className="font-medium text-foreground">Active Sessions</span>
                <span className="text-foreground/40">&rarr;</span>
              </button>
              <button className="w-full flex items-center justify-between py-3 px-4 bg-danger/5 hover:bg-danger/10 rounded-xl transition-all text-danger">
                <span className="font-medium">Delete Account</span>
                <span className="text-foreground/40">&rarr;</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
