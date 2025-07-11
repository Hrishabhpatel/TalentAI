"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import OTPVerification from "./otp-verification"
import Dashboard from "./dashboard"

export default function Component() {
  const [isLogin, setIsLogin] = useState(true)
  const [showOTP, setShowOTP] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)
  const [userPhone, setUserPhone] = useState("")
  const [currentUser, setCurrentUser] = useState("")
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const commonDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "icloud.com"]

    if (!emailRegex.test(email)) {
      return false
    }

    const domain = email.split("@")[1]
    return commonDomains.includes(domain.toLowerCase())
  }

  const validateForm = (formData: FormData): { [key: string]: string } => {
    const newErrors: { [key: string]: string } = {}

    if (!isLogin) {
      const email = formData.get("email") as string
      const password = formData.get("password") as string
      const confirmPassword = formData.get("confirmPassword") as string
      const username = formData.get("username") as string
      const phone = formData.get("phone") as string

      if (!username || username.length < 3) {
        newErrors.username = "Username must be at least 3 characters long"
      }

      if (!email) {
        newErrors.email = "Email is required"
      } else if (!validateEmail(email)) {
        newErrors.email = "Please enter a valid email with a common domain (gmail.com, yahoo.com, etc.)"
      }

      if (!phone || phone.length < 10) {
        newErrors.phone = "Please enter a valid phone number"
      }

      if (!password || password.length < 6) {
        newErrors.password = "Password must be at least 6 characters long"
      }

      if (password !== confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match"
      }
    } else {
      const username = formData.get("username") as string
      const password = formData.get("password") as string

      if (!username) {
        newErrors.username = "Username is required"
      }

      if (!password) {
        newErrors.password = "Password is required"
      }
    }

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    const formData = new FormData(e.target as HTMLFormElement)
    const validationErrors = validateForm(formData)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setIsSubmitting(false)
      return
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (isLogin) {
      const username = formData.get("username") as string
      setCurrentUser(username)
      setShowDashboard(true)
      console.log("Login submitted successfully")
    } else {
      console.log("Signup submitted successfully")
      const phone = formData.get("phone") as string
      const username = formData.get("username") as string
      setUserPhone(phone)
      setCurrentUser(username)
      setShowOTP(true)
    }
    setIsSubmitting(false)
  }

  const handleOTPSuccess = () => {
    setShowOTP(false)
    setIsLogin(true)
    console.log("Account verified successfully! Please login.")
  }

  const handleBackToSignup = () => {
    setShowOTP(false)
  }

  const handleLogout = () => {
    setShowDashboard(false)
    setCurrentUser("")
    setIsLogin(true)
  }

  if (showDashboard) {
    return <Dashboard username={currentUser} onLogout={handleLogout} />
  }

  if (showOTP) {
    return (
      <OTPVerification phoneNumber={userPhone} onVerificationSuccess={handleOTPSuccess} onBack={handleBackToSignup} />
    )
  }

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">{isLogin ? "Login" : "Sign Up"}</CardTitle>
          <CardDescription className="text-center">
            {isLogin ? "Enter your credentials to access your account" : "Create a new account to get started"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isLogin ? (
              // Login Form
              <>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter your username"
                    required
                    className={errors.username ? "border-red-500" : ""}
                  />
                  {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                    className={errors.password ? "border-red-500" : ""}
                  />
                  {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                </div>
              </>
            ) : (
              // Signup Form
              <>
                <div className="space-y-2">
                  <Label htmlFor="signup-username">Username</Label>
                  <Input
                    id="signup-username"
                    name="username"
                    type="text"
                    placeholder="Choose a username"
                    required
                    className={errors.username ? "border-red-500" : ""}
                  />
                  {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email (e.g., user@gmail.com)"
                    required
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    required
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    name="password"
                    type="password"
                    placeholder="Create a password (min 6 characters)"
                    required
                    className={errors.password ? "border-red-500" : ""}
                  />
                  {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    required
                    className={errors.confirmPassword ? "border-red-500" : ""}
                  />
                  {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
                </div>
              </>
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : isLogin ? "Login" : "Sign Up"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <Button variant="link" className="p-0 ml-1 h-auto font-normal" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Sign up" : "Login"}
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
