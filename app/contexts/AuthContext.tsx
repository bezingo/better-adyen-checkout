'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define user type
interface User {
  id: string;
  phone: string;
}

// Define profile type
interface UserProfile {
  id: string;
  user_id: string;
  full_name?: string;
  email?: string;
  created_at: string;
  updated_at: string;
}

// Define address type
interface UserAddress {
  id: string;
  user_id: string;
  name: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  country: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

// Define auth context type
interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  addresses: UserAddress[] | null;
  signInWithPhone: (phone: string) => Promise<{ error?: { message: string } }>;
  verifyOTP: (phone: string, otp: string) => Promise<{ error?: { message: string }, isNewUser?: boolean }>;
  signOut: () => Promise<void>;
  getUserProfile: () => Promise<{ error?: { message: string } }>;
  getUserAddresses: () => Promise<{ error?: { message: string } }>;
  createUserProfile: (data: Partial<UserProfile>) => Promise<{ error?: { message: string } }>;
  updateProfile: (data: Partial<UserProfile>) => Promise<{ error?: { message: string } }>;
  saveUserAddress: (data: Partial<UserAddress>) => Promise<{ error?: { message: string } }>;
}

// Create auth context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  addresses: null,
  signInWithPhone: async () => ({ }),
  verifyOTP: async () => ({ }),
  signOut: async () => {},
  getUserProfile: async () => ({ }),
  getUserAddresses: async () => ({ }),
  createUserProfile: async () => ({ }),
  updateProfile: async () => ({ }),
  saveUserAddress: async () => ({ }),
});

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

// Auth provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [addresses, setAddresses] = useState<UserAddress[] | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
      }
    }
    setIsInitialized(true);
  }, []);

  // Mock sign in with phone
  const signInWithPhone = async (phone: string) => {
    try {
      // In a real app, this would call an API to send OTP
      console.log(`Sending OTP to ${phone}`);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {};
    } catch (error) {
      console.error('Error sending OTP:', error);
      return { error: { message: 'Failed to send verification code' } };
    }
  };

  // Mock verify OTP
  const verifyOTP = async (phone: string, otp: string) => {
    try {
      // In a real app, this would verify the OTP with an API
      console.log(`Verifying OTP ${otp} for ${phone}`);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create mock user
      const mockUser = {
        id: `user_${Date.now()}`,
        phone,
      };
      
      // Check if user exists (in a real app, this would be determined by the API)
      const isNewUser = true;
      
      // Save user to state and localStorage
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      return { isNewUser };
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return { error: { message: 'Failed to verify code' } };
    }
  };

  // Mock sign out
  const signOut = async () => {
    setUser(null);
    setProfile(null);
    setAddresses(null);
    localStorage.removeItem('user');
  };

  // Mock get user profile
  const getUserProfile = async () => {
    try {
      if (!user) return { error: { message: 'User not authenticated' } };
      
      // In a real app, this would fetch the profile from an API
      console.log(`Fetching profile for user ${user.id}`);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create mock profile if not exists
      if (!profile) {
        const mockProfile = {
          id: `profile_${Date.now()}`,
          user_id: user.id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        
        setProfile(mockProfile);
      }
      
      return {};
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return { error: { message: 'Failed to fetch profile' } };
    }
  };

  // Mock get user addresses
  const getUserAddresses = async () => {
    try {
      if (!user) return { error: { message: 'User not authenticated' } };
      
      // In a real app, this would fetch addresses from an API
      console.log(`Fetching addresses for user ${user.id}`);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create mock addresses if not exists
      if (!addresses) {
        setAddresses([]);
      }
      
      return {};
    } catch (error) {
      console.error('Error fetching user addresses:', error);
      return { error: { message: 'Failed to fetch addresses' } };
    }
  };

  // Mock create user profile
  const createUserProfile = async (data: Partial<UserProfile>) => {
    try {
      if (!user) return { error: { message: 'User not authenticated' } };
      
      // In a real app, this would create a profile via API
      console.log(`Creating profile for user ${user.id}:`, data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create mock profile
      const mockProfile = {
        id: `profile_${Date.now()}`,
        user_id: user.id,
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      setProfile(mockProfile as UserProfile);
      
      return {};
    } catch (error) {
      console.error('Error creating user profile:', error);
      return { error: { message: 'Failed to create profile' } };
    }
  };

  // Mock update profile
  const updateProfile = async (data: Partial<UserProfile>) => {
    try {
      if (!user) return { error: { message: 'User not authenticated' } };
      if (!profile) return { error: { message: 'Profile not found' } };
      
      // In a real app, this would update the profile via API
      console.log(`Updating profile for user ${user.id}:`, data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update mock profile
      const updatedProfile = {
        ...profile,
        ...data,
        updated_at: new Date().toISOString(),
      };
      
      setProfile(updatedProfile);
      
      return {};
    } catch (error) {
      console.error('Error updating profile:', error);
      return { error: { message: 'Failed to update profile' } };
    }
  };

  // Mock save user address
  const saveUserAddress = async (data: Partial<UserAddress>) => {
    try {
      if (!user) return { error: { message: 'User not authenticated' } };
      
      // In a real app, this would save the address via API
      console.log(`Saving address for user ${user.id}:`, data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create mock address
      const mockAddress = {
        id: `address_${Date.now()}`,
        user_id: user.id,
        name: data.name || 'Default Address',
        address_line1: data.address_line1 || '',
        address_line2: data.address_line2,
        city: data.city || '',
        country: data.country || '',
        is_default: data.is_default || false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      // Update addresses state
      setAddresses(prev => {
        const newAddresses = prev ? [...prev] : [];
        
        // If this is the default address, unset default on others
        if (mockAddress.is_default) {
          newAddresses.forEach(addr => {
            addr.is_default = false;
          });
        }
        
        // Add the new address
        newAddresses.push(mockAddress as UserAddress);
        
        return newAddresses;
      });
      
      return {};
    } catch (error) {
      console.error('Error saving address:', error);
      return { error: { message: 'Failed to save address' } };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        addresses,
        signInWithPhone,
        verifyOTP,
        signOut,
        getUserProfile,
        getUserAddresses,
        createUserProfile,
        updateProfile,
        saveUserAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};