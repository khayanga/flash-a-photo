import { NextRequest, NextResponse } from 'next/server';
import { validateRequest } from '@/lib/auth';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16',
});

export const POST = validateRequest(async (req: NextRequest, user: any) => {
  const { amount, currency, bookingId } = await req.json();

  if (!amount || !currency || !bookingId) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata: { bookingId },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json({ error: 'Failed to create payment intent' }, { status: 500 });
  }
});

