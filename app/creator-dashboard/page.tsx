import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { JobsList } from "@/components/jobs-list"
import { MessagesList } from "@/components/messages-list"
import { ReviewsList } from "@/components/reviews-list"
import { EarningsChart } from "@/components/earnings-chart"
import { fetchWithAuth } from '@/lib/api'

async function getCreatorDashboardData() {
  const [bookingsResponse, messagesResponse, reviewsResponse, earningsResponse] = await Promise.all([
    fetchWithAuth('/api/bookings'),
    fetchWithAuth('/api/messages'),
    fetchWithAuth('/api/reviews'),
    fetchWithAuth('/api/earnings'),
  ]);

  const bookings = await bookingsResponse.json();
  const messages = await messagesResponse.json();
  const reviews = await reviewsResponse.json();
  const earnings = await earningsResponse.json();

  return { bookings, messages, reviews, earnings };
}

export default async function CreatorDashboard() {
  const { bookings, messages, reviews, earnings } = await getCreatorDashboardData();

  return (
    <div className="min-h-screen bg-background py-<div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-foreground">Creator Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{bookings.filter(b => b.status === 'pending').length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">KES {earnings.total.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Pending Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{messages.filter(m => m.status === 'unread').length}</p>
            </CardContent>
          </Card>
        </div>

        <EarningsChart data={earnings.monthly} currency="KES" />

        <Tabs defaultValue="jobs" className="mt-8">
          <TabsList>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="jobs">
            <JobsList jobs={bookings} />
          </TabsContent>
          <TabsContent value="messages">
            <MessagesList messages={messages} />
          </TabsContent>
          <TabsContent value="reviews">
            <ReviewsList reviews={reviews} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

