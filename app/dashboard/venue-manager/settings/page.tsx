"use client"

import { DashboardShell } from "@/components/layout/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, Bell, Shield, CreditCard, Users, Globe } from "lucide-react"

export default function SettingsPage() {
  return (
    <DashboardShell role="venue-manager" title="Settings">
      <div className="space-y-6">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Venue Information</CardTitle>
                <CardDescription>Manage your venue details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="venue-name">Venue Name</Label>
                    <Input id="venue-name" defaultValue="San Francisco Convention Center" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="venue-type">Venue Type</Label>
                    <Select defaultValue="convention">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="convention">Convention Center</SelectItem>
                        <SelectItem value="ballroom">Ballroom</SelectItem>
                        <SelectItem value="conference">Conference Center</SelectItem>
                        <SelectItem value="outdoor">Outdoor Venue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" defaultValue="747 Howard St, San Francisco, CA 94103" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue="+1 (555) 123-4567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue="info@sfconvention.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" defaultValue="https://sfconvention.com" />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button className="gap-2">
                    <Save className="w-4 h-4" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Booking Preferences</CardTitle>
                <CardDescription>Configure how bookings work for your venues</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require Deposit</Label>
                    <p className="text-sm text-muted-foreground">Require a deposit for all bookings</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-Confirm Bookings</Label>
                    <p className="text-sm text-muted-foreground">Automatically confirm bookings that meet criteria</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Send Reminders</Label>
                    <p className="text-sm text-muted-foreground">Send automatic reminders to clients</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Choose how you want to be notified about venue activities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Booking Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="new-bookings">New Booking Requests</Label>
                      <Switch id="new-bookings" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="booking-updates">Booking Updates</Label>
                      <Switch id="booking-updates" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="cancellations">Cancellations</Label>
                      <Switch id="cancellations" defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Payment Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="payments-received">Payments Received</Label>
                      <Switch id="payments-received" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="invoices-sent">Invoices Sent</Label>
                      <Switch id="invoices-sent" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="overdue-payments">Overdue Payments</Label>
                      <Switch id="overdue-payments" defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="gap-2">
                    <Save className="w-4 h-4" />
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>Manage your account security and privacy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Password</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                  </div>
                  <Button>Update Password</Button>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Two-Factor Authentication</h4>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable 2FA</Label>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Login Activity</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Current Session</span>
                      <span className="text-green-600">Active now</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Login</span>
                      <span>2 hours ago • San Francisco, CA</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Device</span>
                      <span>Chrome on Windows</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing */}
          <TabsContent value="billing" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Billing Information
                </CardTitle>
                <CardDescription>Manage your billing details and payment methods</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Current Plan</h4>
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">Professional Plan</p>
                        <p className="text-sm text-muted-foreground">$99/month • 5 venues included</p>
                      </div>
                      <Button variant="outline">Change Plan</Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Payment Method</h4>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                          <CreditCard className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold">Visa ending in 4242</p>
                          <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                        </div>
                      </div>
                      <Button variant="outline">Edit</Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Billing History</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 border rounded">
                      <div>
                        <p className="font-semibold">May 2025</p>
                        <p className="text-sm text-muted-foreground">Professional Plan</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">$99.00</p>
                        <p className="text-sm text-green-600">Paid</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded">
                      <div>
                        <p className="font-semibold">April 2025</p>
                        <p className="text-sm text-muted-foreground">Professional Plan</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">$99.00</p>
                        <p className="text-sm text-green-600">Paid</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}