/**
 * Utility functions for Adyen integration
 */

/**
 * Make a session setup call to the Adyen API
 * @param totalPrice The total price of the order
 * @returns The session data from Adyen
 */
export async function makeSessionsSetupCall(totalPrice: number = 10) {
  try {
    const sessionsPayload = {
      amount: {
        currency: 'EUR',
        value: Math.round(totalPrice * 100) // Convert to cents
      },
      countryCode: 'AE',
      shopperLocale: 'en-US',
      channel: 'Web',
      reference: `order-${Date.now()}`,
      returnUrl: window.location.origin + '/checkout/result',
      // Optional line items for better analytics
      lineItems: [
        {
          id: 'item1',
          description: 'Order Items',
          amountIncludingTax: Math.round(totalPrice * 100),
          quantity: 1
        }
      ]
    };

    console.log('Making session setup call with payload:', sessionsPayload);

    const response = await fetch('/api/payment/adyen-session', {
      method: 'POST',
      body: JSON.stringify(sessionsPayload),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Session setup call failed:', errorData);
      throw new Error(errorData.error || 'Failed to set up Adyen session');
    }

    const data = await response.json();
    console.log('Session setup call successful:', data);
    return data;
  } catch (error) {
    console.error('Error during sessions setup call', error);
    throw error;
  }
}

/**
 * Create a configuration object for Adyen Checkout
 * @param clientKey The Adyen client key
 * @param sessionId The session ID
 * @param sessionData The session data
 * @param amount The payment amount
 * @param currency The payment currency
 * @returns The Adyen checkout configuration
 */
export function createAdyenCheckoutConfig(
  clientKey: string,
  sessionId: string,
  sessionData: string,
  amount: number,
  currency: string
) {
  return {
    environment: 'test' as const,
    clientKey: clientKey,
    analytics: {
      enabled: false
    },
    session: {
      id: sessionId,
      sessionData: sessionData
    },
    countryCode: 'AE', // United Arab Emirates
    locale: 'en-US',
    // Note: When using sessions, the amount is already specified in the session
    // and doesn't need to be included here
    // Configure payment methods
    paymentMethodsConfiguration: {
      card: {
        hasHolderName: true,
        holderNameRequired: true,
        enableStoreDetails: false,
        brands: ['visa', 'mc', 'amex'],
        showBrandsUnderCardNumber: true
      }
    },
    // We'll set the event handlers in the checkout component
    // Use our proxy for loading Adyen resources
    loadingContext: `${window.location.origin}/api/payment/adyen-proxy?url=`
  };
}