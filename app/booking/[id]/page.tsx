"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const steps = ["Details", "Date & Time", "Payment"]

function PaymentForm({ clientSecret, amount }: { clientSecret: string, amount: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/booking-confirmation`,
      },
    });

    if (result.error) {
      setError(result.error.message || 'An error occurred during payment.');
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button type="submit" disabled={!stripe || processing} className="mt-4">
        Pay KES {amount.toLocaleString()}
      </Button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </form>
  );
}

export default function BookingPage({ params }: { params: { id: string } }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [amount, setAmount] = useState(0)
  const router = useRouter()

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
    if (currentStep === 1) {
      // Create booking
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          creatorId: params.id, 
          date: selectedDate?.toISOString(), 
          time: selectedTime 
        }),
      });
      const booking = await response.json();

      // Create payment intent
      const paymentResponse = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 15000, currency: 'kes', bookingId: booking.id }),
      });
      const paymentData = await paymentResponse.json();
      setClientSecret(paymentData.clientSecret);
      setAmount(15000);
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Book Your Session</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-8">
              <div className="flex justify-between items-center">
                {steps.map((step, index) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index <= currentStep
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {index + 1}
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`h-1 w-16 ${
                          index < currentStep ? "bg-primary" : "bg-secondary"
                        }`}
                      ></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {currentStep === 0 && (
              <div className="space-y-4">
                <Input placeholder="Your Name" />
                <Input placeholder="Your Email" type="email" />
                <Textarea placeholder="Special Requests or Details" />
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-4">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
                <Input 
                  placeholder="Preferred Time" 
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                />
              </div>
            )}

            {currentStep === 2 && clientSecret && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <PaymentForm clientSecret={clientSecret} amount={amount} />
              </Elements>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={handlePrevious} disabled={currentStep === 0}>
              Previous
            </Button>
            <Button onClick={handleNext} disabled={currentStep === steps.length - 1}>
              {currentStep === steps.length - 2 ? "Proceed to Payment" : "Next"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

