import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-5xl w-full text-center">
        <h1 className="text-4xl font-light mb-8">Better Checkout with Adyen</h1>
        <p className="text-xl mb-8">
          A Next.js e-commerce checkout with Adyen payment integration
        </p>
        <div className="flex justify-center gap-4">
          <Link 
            href="/shop" 
            className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            Go to Shop
          </Link>
          <Link 
            href="/checkout" 
            className="px-6 py-3 border border-black rounded-md hover:bg-gray-100 transition-colors"
          >
            Go to Checkout
          </Link>
        </div>
      </div>
    </main>
  );
}