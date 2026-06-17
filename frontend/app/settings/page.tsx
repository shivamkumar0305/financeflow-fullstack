'use client'

import { Header } from '@/components/layout/header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card-modern'
import { Bell, Lock, Eye, Palette, Database, HelpCircle } from 'lucide-react'
import { useState } from 'react'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyReport: true,
    monthlyReport: true,
    darkMode: false,
    autoLogout: true,
  })

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings({ ...settings, [key]: !settings[key] })
  }

  const settingGroups = [
    {
      title: 'Notifications',
      icon: Bell,
      settings: [
        {
          key: 'emailNotifications',
          label: 'Email Notifications',
          description: 'Receive email updates about your transactions',
        },
        {
          key: 'pushNotifications',
          label: 'Push Notifications',
          description: 'Get push notifications on your devices',
        },
        {
          key: 'weeklyReport',
          label: 'Weekly Report',
          description: 'Receive a summary of your weekly spending',
        },
        {
          key: 'monthlyReport',
          label: 'Monthly Report',
          description: 'Get detailed monthly financial insights',
        },
      ],
    },
    {
      title: 'Privacy & Security',
      icon: Lock,
      settings: [
        {
          key: 'autoLogout',
          label: 'Auto Logout',
          description: 'Automatically log out after 30 minutes of inactivity',
        },
      ],
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-display font-bold text-foreground mb-2">Settings</h1>
          <p className="text-foreground/60">Customize your FinanceFlow experience</p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-8">
          {settingGroups.map((group, groupIndex) => {
            const Icon = group.icon
            return (
              <Card key={groupIndex}>
                <CardHeader className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle>{group.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {group.settings.map((setting, settingIndex) => (
                      <div
                        key={settingIndex}
                        className={`flex items-center justify-between py-4 ${
                          settingIndex !== group.settings.length - 1 ? 'border-b border-border/20' : ''
                        }`}
                      >
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{setting.label}</p>
                          <p className="text-sm text-foreground/60 mt-1">{setting.description}</p>
                        </div>
                        <button
                          onClick={() => toggleSetting(setting.key as keyof typeof settings)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            settings[setting.key as keyof typeof settings]
                              ? 'bg-primary'
                              : 'bg-secondary border border-border'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              settings[setting.key as keyof typeof settings] ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}

          {/* Appearance Settings */}
          <Card>
            <CardHeader className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Palette className="w-5 h-5 text-primary" />
              </div>
              <CardTitle>Appearance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-4 border-b border-border/20">
                  <div>
                    <p className="font-medium text-foreground">Dark Mode</p>
                    <p className="text-sm text-foreground/60 mt-1">Use dark theme for the application</p>
                  </div>
                  <button
                    onClick={() => toggleSetting('darkMode')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.darkMode ? 'bg-primary' : 'bg-secondary border border-border'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.darkMode ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card>
            <CardHeader className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Database className="w-5 h-5 text-primary" />
              </div>
              <CardTitle>Data Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between py-3 px-4 bg-secondary/50 hover:bg-secondary rounded-xl transition-all">
                  <span className="font-medium text-foreground">Export Your Data</span>
                  <span className="text-foreground/40">&rarr;</span>
                </button>
                <button className="w-full flex items-center justify-between py-3 px-4 bg-secondary/50 hover:bg-secondary rounded-xl transition-all">
                  <span className="font-medium text-foreground">Download Statement</span>
                  <span className="text-foreground/40">&rarr;</span>
                </button>
                <button className="w-full flex items-center justify-between py-3 px-4 bg-danger/5 hover:bg-danger/10 rounded-xl transition-all text-danger">
                  <span className="font-medium">Clear All Data</span>
                  <span className="text-foreground/40">&rarr;</span>
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Help & Support */}
          <Card>
            <CardHeader className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-primary" />
              </div>
              <CardTitle>Help & Support</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <a href="#" className="w-full flex items-center justify-between py-3 px-4 bg-secondary/50 hover:bg-secondary rounded-xl transition-all">
                  <span className="font-medium text-foreground">Documentation</span>
                  <span className="text-foreground/40">&rarr;</span>
                </a>
                <a href="#" className="w-full flex items-center justify-between py-3 px-4 bg-secondary/50 hover:bg-secondary rounded-xl transition-all">
                  <span className="font-medium text-foreground">Contact Support</span>
                  <span className="text-foreground/40">&rarr;</span>
                </a>
                <a href="#" className="w-full flex items-center justify-between py-3 px-4 bg-secondary/50 hover:bg-secondary rounded-xl transition-all">
                  <span className="font-medium text-foreground">Report a Bug</span>
                  <span className="text-foreground/40">&rarr;</span>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* App Version */}
        <div className="mt-12 text-center">
          <p className="text-sm text-foreground/60">
            FinanceFlow <span className="font-semibold">v1.0.0</span>
          </p>
        </div>
      </div>
    </main>
  )
}
