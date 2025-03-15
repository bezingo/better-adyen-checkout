'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// Define the locale context type
interface LocaleContextType {
  locale: string;
  currency: string;
  setLocale: (locale: string) => void;
  setCurrency: (currency: string) => void;
  formatPrice: (price: number) => string;
}

// Create the locale context with default values
const LocaleContext = createContext<LocaleContextType>({
  locale: 'en-US',
  currency: 'EUR',
  setLocale: () => {},
  setCurrency: () => {},
  formatPrice: () => '',
});

// Custom hook to use the locale context
export const useLocale = () => useContext(LocaleContext);

// Locale provider component
export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState('en-US');
  const [currency, setCurrency] = useState('EUR');

  // Format price based on locale and currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(price);
  };

  return (
    <LocaleContext.Provider
      value={{
        locale,
        currency,
        setLocale,
        setCurrency,
        formatPrice,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
};