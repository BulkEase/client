'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/lib/auth-context';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Confirm password is required'),
  mobileNumber: z.string().min(10, 'Mobile number is required'),
  addressLine1: z.string().min(1, 'Address line 1 is required'),
  landmark: z.string().optional(),
  pincode: z.string().min(5, 'Pincode is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { register: registerUser } = useAuth();
  const router = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      setError('');
      
      // Format data for API
      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
        mobileNumber: data.mobileNumber,
        address: {
          line1: data.addressLine1,
          landmark: data.landmark || '',
          pincode: data.pincode
        }
      };
      
      await registerUser(userData);
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 py-16" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-10 border border-green-800" style={{ boxShadow: '0 4px 24px 0 rgba(4,91,4,0.10)' }}>
        <div className="flex justify-center mb-6 select-none">
          <span className="text-4xl font-extrabold tracking-wide">
            <span style={{ color: 'rgb(4,91,4)' }}>Bulk</span>
            <span style={{ color: '#111', fontWeight: 900 }}>Ease</span>
          </span>
        </div>
        <h1 className="text-2xl font-bold mb-6 text-center" style={{ color: 'rgb(4,91,4)' }}>Create an Account</h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center animate-pulse">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1 font-semibold" style={{ color: 'rgb(4,91,4)' }}>
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register('name')}
              className="w-full p-3 border border-green-800 rounded-lg focus:outline-none focus:ring-2"
              placeholder="Your name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 font-semibold" style={{ color: 'rgb(4,91,4)' }}>
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className="w-full p-3 border border-green-800 rounded-lg focus:outline-none focus:ring-2"
              placeholder="you@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="mobileNumber" className="block mb-1 font-semibold" style={{ color: 'rgb(4,91,4)' }}>
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobileNumber"
              {...register('mobileNumber')}
              className="w-full p-3 border border-green-800 rounded-lg focus:outline-none focus:ring-2"
              placeholder="Your mobile number"
            />
            {errors.mobileNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.mobileNumber.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="addressLine1" className="block mb-1 font-semibold" style={{ color: 'rgb(4,91,4)' }}>
              Address Line 1
            </label>
            <input
              type="text"
              id="addressLine1"
              {...register('addressLine1')}
              className="w-full p-3 border border-green-800 rounded-lg focus:outline-none focus:ring-2"
              placeholder="Address line 1"
            />
            {errors.addressLine1 && (
              <p className="text-red-500 text-sm mt-1">{errors.addressLine1.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="landmark" className="block mb-1 font-semibold" style={{ color: 'rgb(4,91,4)' }}>
              Landmark (Optional)
            </label>
            <input
              type="text"
              id="landmark"
              {...register('landmark')}
              className="w-full p-3 border border-green-800 rounded-lg focus:outline-none focus:ring-2"
              placeholder="Landmark (optional)"
            />
            {errors.landmark && (
              <p className="text-red-500 text-sm mt-1">{errors.landmark.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="pincode" className="block mb-1 font-semibold" style={{ color: 'rgb(4,91,4)' }}>
              Pincode
            </label>
            <input
              type="text"
              id="pincode"
              {...register('pincode')}
              className="w-full p-3 border border-green-800 rounded-lg focus:outline-none focus:ring-2"
              placeholder="Pincode"
            />
            {errors.pincode && (
              <p className="text-red-500 text-sm mt-1">{errors.pincode.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 font-semibold" style={{ color: 'rgb(4,91,4)' }}>
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register('password')}
              className="w-full p-3 border border-green-800 rounded-lg focus:outline-none focus:ring-2"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block mb-1 font-semibold" style={{ color: 'rgb(4,91,4)' }}>
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register('confirmPassword')}
              className="w-full p-3 border border-green-800 rounded-lg focus:outline-none focus:ring-2"
              placeholder="Confirm password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-lg font-bold text-lg shadow-md transition hover:scale-105 hover:shadow-lg active:scale-95"
            style={{
              background: 'rgb(4,91,4)',
              color: 'white',
              boxShadow: '0 4px 16px rgba(4,91,4,0.13)',
            }}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="mt-8 text-center" style={{ color: 'rgb(4,91,4)' }}>
          Already have an account?{' '}
          <Link href="/login" className="hover:underline font-bold" style={{ color: 'rgb(4,91,4)' }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
} 