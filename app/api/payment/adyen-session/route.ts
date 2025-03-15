import { NextRequest, NextResponse } from 'next/server';

/**
 * API route for creating an Adyen payment session
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    if (!body.amount || !body.amount.currency || !body.amount.value) {
      return NextResponse.json(
        { error: 'Invalid request: amount, currency, and value are required' },
        { status: 400 }
      );
    }

    // Prepare the request to Adyen API
    const adyenRequest = {
      merchantAccount: process.env.ADYEN_MERCHANT_ACCOUNT,
      amount: {
        currency: body.amount.currency,
        value: body.amount.value
      },
      returnUrl: body.returnUrl || `${request.nextUrl.origin}/checkout/result`,
      reference: body.reference || `order-${Date.now()}`,
      countryCode: body.countryCode || 'AE',
      shopperLocale: body.shopperLocale || 'en-US',
      channel: 'Web',
      // Enable all payment methods
      allowedPaymentMethods: ['scheme', 'visa', 'mc', 'amex'],
      // Request payment methods in the session
      shopperInteraction: 'Ecommerce',
      recurringProcessingModel: 'CardOnFile',
      // Enable storing payment method details
      storePaymentMethodMode: 'disabled',
      // Enable 3D Secure 2 for card payments
      authenticationData: {
        threeDSRequestData: {
          nativeThreeDS: 'preferred'
        }
      }
    };

    console.log('Creating Adyen session with request:', JSON.stringify(adyenRequest, null, 2));

    // Make request to Adyen API
    const response = await fetch(
      'https://checkout-test.adyen.com/v70/sessions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': process.env.ADYEN_API_KEY || ''
        },
        body: JSON.stringify(adyenRequest)
      }
    );

    // Handle response
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Adyen session creation failed:', errorData);
      return NextResponse.json(
        { error: 'Failed to create Adyen session', details: errorData },
        { status: response.status }
      );
    }

    // Return the session data
    const sessionData = await response.json();
    console.log('Adyen session created successfully:', JSON.stringify(sessionData, null, 2));
    return NextResponse.json(sessionData);
  } catch (error) {
    console.error('Error creating Adyen session:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}