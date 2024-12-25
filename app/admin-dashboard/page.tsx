"use client";
import { Suspense } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UsersList } from "@/components/users-list"
import { JobsList } from "@/components/jobs-list"
import { PaymentsList } from "@/components/payments-list"
import { ReviewsList } from "@/components/reviews-list"
import { AnalyticsChart } from "@/components/analytics-chart"
import { ErrorMessage } from "@/components/error-message"
import { LoadingSpinner } from "@/components/loading-spinner"
import { fetchWithAuth } from '@/lib/api'

async function getAdminDashboardData() {
  const [usersResponse, jobsResponse, paymentsResponse, reviewsResponse, analyticsResponse] = await Promise.all([
    fetchWithAuth('/api/users'),
    fetchWithAuth('/api/bookings'),
    fetchWithAuth('/api/payments'),
    fetchWithAuth('/api/reviews'),
    fetchWithAuth('/api/analytics'),
  ]);

  const users = await usersResponse.json();
  const jobs = await jobsResponse.json();
  const payments = await paymentsResponse.json();
  const reviews = await reviewsResponse.json();
  const analytics = await analyticsResponse.json();

  return { users, jobs, payments, reviews, analytics };
}

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-foreground">Admin Dashboard</h1>
        <Suspense fallback={<LoadingSpinner />}>
          <AdminDashboardContent />
        </Suspense>
      </div>
    </div>
  )
}

async function AdminDashboardContent() {
  try {
    const { users, jobs, payments, reviews, analytics } = await getAdminDashboardData();

    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{users.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Active Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{jobs.filter(job => job.status === 'active').length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">KES {payments.reduce((sum, payment) => sum + payment.amount, 0).toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Avg. Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {(reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)}
              </p>
            </CardContent>
          </Card>
        </div>

        <AnalyticsChart data={analytics} />

        <Tabs defaultValue="users" className="mt-8">
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="users">
            <UsersList users={users} />
          </TabsContent>
          <TabsContent value="jobs">
            <JobsList jobs={jobs} />
          </TabsContent>
          <TabsContent value="payments">
            <PaymentsList payments={payments} />
          </TabsContent>
          <TabsContent value="reviews">
            <ReviewsList reviews={reviews} />
          </TabsContent>
        </Tabs>
      </>
    );
  } catch (error) {
    return <ErrorMessage message="Failed to load admin dashboard data. Please try again later." />;
  }
}

