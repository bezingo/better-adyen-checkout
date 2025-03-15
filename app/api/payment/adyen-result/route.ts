import { NextRequest, NextResponse } from 'next/server';

/**
 * API route for handling Adyen payment results
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    if (!body.redirectResult && !body.sessionId) {
      return NextResponse.json(
        { error: 'Invalid request: redirectResult or sessionId is required' },
        { status: 400 }
      );
    }

    let endpoint;
    let payload;

    // Prepare the request based on the input
    if (body.redirectResult) {
      // Handle redirect result
      endpoint = 'https://checkout-test.adyen.com/v70/payments/details';
      payload = {
        details: {
          redirectResult: body.redirectResult
        }
      };
    } else {
      // Handle session result
      endpoint = `https://checkout-test.adyen.com/v70/sessions/${body.sessionId}`;
      payload = {};
    }

    console.log(`Processing payment result with ${body.redirectResult ? 'redirectResult' : 'sessionId'}`);

    // Make request to Adyen API
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': process.env.ADYEN_API_KEY || ''
      },
      body: JSON.stringify(payload)
    });

    // Handle response
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Adyen payment result processing failed:', errorData);
      return NextResponse.json(
        { error: 'Failed to process payment result', details: errorData },
        { status: response.status }
      );
    }

    // Return the payment result
    const resultData = await response.json();
    console.log('Payment result processed successfully:', JSON.stringify(resultData, null, 2));
    return NextResponse.json(resultData);
  } catch (error) {
    console.error('Error processing payment result:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}