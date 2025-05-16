'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/lib/auth-context';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [mounted, setMounted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const remembered = localStorage.getItem('rememberMe');
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (remembered === 'true' && rememberedEmail) {
      setRememberMe(true);
      setValue('email', rememberedEmail);
    }
  }, [mounted, setValue]);

  if (!mounted) return null;

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setError('');
      await login(data.email, data.password);
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
        localStorage.setItem('rememberedEmail', data.email);
      } else {
        localStorage.removeItem('rememberMe');
        localStorage.removeItem('rememberedEmail');
      }
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
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
        <h1 className="text-2xl font-bold mb-6 text-center" style={{ color: 'rgb(4,91,4)' }}>Sign In to BulkEase</h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center animate-pulse">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-1 font-semibold" style={{ color: 'rgb(4,91,4)' }}>
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className="w-full p-3 border border-green-800 rounded-lg focus:outline-none focus:ring-2"
              autoComplete="email"
              placeholder="you@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="password" className="font-semibold" style={{ color: 'rgb(4,91,4)' }}>
                Password
              </label>
              <Link href="/reset-password" className="text-sm hover:underline font-medium" style={{ color: 'rgb(4,91,4)' }}>
                Reset Password
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                {...register('password')}
                className="w-full p-3 border border-green-800 rounded-lg focus:outline-none focus:ring-2 pr-12"
                autoComplete="current-password"
                placeholder="Your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-green-900 focus:outline-none"
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                style={{ color: 'rgb(4,91,4)' }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe((prev) => !prev)}
              className="mr-2 accent-green-700"
              style={{ accentColor: 'rgb(4,91,4)' }}
            />
            <label htmlFor="rememberMe" className="text-sm select-none font-medium" style={{ color: 'rgb(4,91,4)' }}>
              Remember me
            </label>
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
            {isLoading ? 'Logging in...' : 'Log in'}
          </button>
        </form>
        <p className="mt-8 text-center" style={{ color: 'rgb(4,91,4)' }}>
          Don't have an account?{' '}
          <Link href="/register" className="hover:underline font-bold" style={{ color: 'rgb(4,91,4)' }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
} 