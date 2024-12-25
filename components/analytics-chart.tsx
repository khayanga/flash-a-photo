"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  { month: "Jan", users: 100, jobs: 50, revenue: 500000 },
  { month: "Feb", users: 120, jobs: 60, revenue: 600000 },
  { month: "Mar", users: 150, jobs: 75, revenue: 750000 },
  { month: "Apr", users: 180, jobs: 90, revenue: 900000 },
  { month: "May", users: 220, jobs: 110, revenue: 1100000 },
  { month: "Jun", users: 250, jobs: 125, revenue: 1250000 },
]

export function AnalyticsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Platform Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Bar dataKey="users" fill="hsl(var(--primary))" yAxisId="left" />
              <Bar dataKey="jobs" fill="hsl(var(--secondary))" yAxisId="left" />
              <Bar dataKey="revenue" fill="hsl(var(--accent))" yAxisId="right" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

