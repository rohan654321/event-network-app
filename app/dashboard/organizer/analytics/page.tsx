"use client"

import { DashboardShell } from "@/components/layout/dashboard-shell"
import { AnalyticsOverview } from "@/components/charts/analytics-overview"

export default function AnalyticsPage() {
  return (
    <DashboardShell role="organizer" title="Analytics">
      <AnalyticsOverview />
    </DashboardShell>
  )
}
