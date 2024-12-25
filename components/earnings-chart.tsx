"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  { month: "Jan", earnings: 120000 },
  { month: "Feb", earnings: 180000 },
  { month: "Mar", earnings: 220000 },
  { month: "Apr", earnings: 260000 },
  { month: "May", earnings: 300000 },
  { month: "Jun", earnings: 340000 },
]

export function EarningsChart({ currency = "KES" }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Earnings Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => [`${currency} ${value.toLocaleString()}`, "Earnings"]}
              />
              <Line type="monotone" dataKey="earnings" stroke="hsl(var(--primary))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

