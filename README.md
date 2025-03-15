# Better Adyen Checkout

A Next.js e-commerce checkout implementation with Adyen payment integration.

## Features

- Next.js 14 application with App Router
- Adyen payment integration using Web Drop-in v6
- Multiple payment methods (Adyen, Tabby, Cash on Delivery, Credit/Debit Card)
- Mobile number verification with OTP
- Responsive design for all devices
- Cart management
- Address management
- Order summary

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- Adyen test account with API key and client key

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
# Adyen API credentials
ADYEN_API_KEY=your_adyen_api_key
ADYEN_MERCHANT_ACCOUNT=your_adyen_merchant_account
NEXT_PUBLIC_ADYEN_CLIENT_KEY=your_adyen_client_key

# Other environment variables
# ...
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/bezingo/better-adyen-checkout.git
cd better-adyen-checkout
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Adyen Integration

This project uses Adyen's Web Drop-in component for payment processing. The integration follows the sessions flow, where:

1. A session is created on the server-side
2. The client-side uses the session ID and session data to initialize the Adyen checkout
3. The Drop-in component is mounted to the DOM
4. Payment results are handled through callbacks and redirects

## License

MIT