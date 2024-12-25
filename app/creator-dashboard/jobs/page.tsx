"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from 'lucide-react'

const jobs = [
  {
    id: 1,
    client: "Alice Johnson",
    date: "2023-06-15",
    status: "New",
    description: "Wedding photoshoot at Sunset Beach Resort",
    details: "Outdoor ceremony and indoor reception. 6 hours of coverage required.",
  },
  {
    id: 2,
    client: "Bob Smith",
    date: "2023-06-18",
    status: "In Progress",
    description: "Corporate event coverage for Tech Summit 2023",
    details: "Full day event with keynote speakers and networking sessions. Both photo and video coverage needed.",
  },
  {
    id: 3,
    client: "Carol Williams",
    date: "2023-06-20",
    status: "Completed",
    description: "Family portrait session at City Park",
    details: "2-hour outdoor session for a family of five. Include individual and group shots.",
  },
]

export default function JobManagement() {
  const [expandedJob, setExpandedJob] = useState<number | null>(null)

  const toggleJobExpansion = (jobId: number) => {
    setExpandedJob(expandedJob === jobId ? null : jobId)
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Job Management</h1>
        <div className="space-y-4">
          {jobs.map((job) => (
            <Card key={job.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{job.client}</span>
                  <Badge
                    variant={
                      job.status === "New"
                        ? "default"
                        : job.status === "In Progress"
                        ? "secondary"
                        : "success"
                    }
                  >
                    {job.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Date: {job.date}</p>
                    <p className="mt-2">{job.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleJobExpansion(job.id)}
                  >
                    {expandedJob === job.id ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {expandedJob === job.id && (
                  <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                    <h4 className="font-semibold mb-2">Job Details</h4>
                    <p>{job.details}</p>
                    <div className="mt-4 space-x-2">
                      <Button size="sm">Update Status</Button>
                      <Button size="sm" variant="outline">
                        Contact Client
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

