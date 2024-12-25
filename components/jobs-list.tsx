import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Job {
  id: string;
  clientName: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  description: string;
}

interface JobsListProps {
  jobs: Job[];
}

export function JobsList({ jobs }: JobsListProps) {
  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <Card key={job.id}>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>{job.clientName}</span>
              <Badge
                variant={
                  job.status === "pending"
                    ? "default"
                    : job.status === "confirmed"
                    ? "secondary"
                    : job.status === "completed"
                    ? "success"
                    : "destructive"
                }
              >
                {job.status}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Date: {job.date} at {job.time}</p>
            <p className="mt-2">{job.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

