"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/lib/auth-context";
import { Eye, EyeOff } from "lucide-react";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
    mobileNumber: z.string().min(10, "Mobile number is required"),
    addressLine1: z.string().min(1, "Address line 1 is required"),
    landmark: z.string().optional(),
    pincode: z.string().min(5, "Pincode is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { register: registerUser } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      setError("");

      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
        mobileNumber: data.mobileNumber,
        address: {
          line1: data.addressLine1,
          landmark: data.landmark || "",
          pincode: data.pincode,
        },
      };

      await registerUser(userData);
      router.push("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">
            Bulk<span className="text-green-600">Ease</span>
          </h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Create Account
          </h2>
          <p className="text-gray-600">Join our professional platform</p>
        </div>

        {/* Form Container */}
        <div className="bg-white shadow-sm border border-gray-200 px-8 py-10">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 border-l-4 border-red-500 bg-red-50">
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Personal Information Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name")}
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-colors text-gray-900 placeholder-gray-500"
                    placeholder="Enter your full name"
                    autoComplete="name"
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-colors text-gray-900 placeholder-gray-500"
                    placeholder="Enter your email"
                    autoComplete="email"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Mobile Number Field */}
                <div className="lg:col-span-2">
                  <label
                    htmlFor="mobileNumber"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    id="mobileNumber"
                    {...register("mobileNumber")}
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-colors text-gray-900 placeholder-gray-500"
                    placeholder="Enter your mobile number"
                    autoComplete="tel"
                  />
                  {errors.mobileNumber && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.mobileNumber.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Address Information Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                Address Information
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Address Line 1 */}
                <div>
                  <label
                    htmlFor="addressLine1"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    id="addressLine1"
                    {...register("addressLine1")}
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-colors text-gray-900 placeholder-gray-500"
                    placeholder="Enter your address"
                    autoComplete="address-line1"
                  />
                  {errors.addressLine1 && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.addressLine1.message}
                    </p>
                  )}
                </div>

                {/* Landmark */}
                <div>
                  <label
                    htmlFor="landmark"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Landmark <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    id="landmark"
                    {...register("landmark")}
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-colors text-gray-900 placeholder-gray-500"
                    placeholder="Enter landmark"
                  />
                  {errors.landmark && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.landmark.message}
                    </p>
                  )}
                </div>

                {/* Pincode */}
                <div className="lg:col-span-2">
                  <label
                    htmlFor="pincode"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Pincode
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    {...register("pincode")}
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-colors text-gray-900 placeholder-gray-500"
                    placeholder="Enter pincode"
                    autoComplete="postal-code"
                  />
                  {errors.pincode && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.pincode.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Security Information Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                Security Information
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      {...register("password")}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-colors text-gray-900 placeholder-gray-500"
                      placeholder="Create a password"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      {...register("confirmPassword")}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-colors text-gray-900 placeholder-gray-500"
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full max-w-md bg-green-600 text-white py-3 px-8 font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>
            </div>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-green-600 hover:text-green-700 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
