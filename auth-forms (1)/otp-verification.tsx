"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface OTPVerificationProps {
  phoneNumber?: string
  onVerificationSuccess?: () => void
  onBack?: () => void
}

export default function OTPVerification({
  phoneNumber = "1234567890",
  onVerificationSuccess,
  onBack,
}: OTPVerificationProps) {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""))
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState("")
  const [timeLeft, setTimeLeft] = useState(30)
  const [canResend, setCanResend] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const [generatedOTP, setGeneratedOTP] = useState("")
  const [isOTPSent, setIsOTPSent] = useState(false)
  const [sendingOTP, setSendingOTP] = useState(false)

  // Get last 4 digits of phone number
  const lastFourDigits = phoneNumber.slice(-4)

  // Generate random 6-digit OTP
  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  // Send OTP to phone number
  const sendOTP = async () => {
    setSendingOTP(true)

    // Generate new OTP
    const newOTP = generateOTP()
    setGeneratedOTP(newOTP)

    // Simulate API call to send OTP
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // In real app, this would send SMS via service like Twilio
    console.log(`OTP sent to ${phoneNumber}: ${newOTP}`)
    alert(`Demo: OTP sent to your phone ending in ${lastFourDigits}: ${newOTP}`)

    setIsOTPSent(true)
    setSendingOTP(false)
  }

  // Initialize OTP sending when component mounts
  useEffect(() => {
    sendOTP()
  }, [])

  // Timer for resend OTP
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [timeLeft])

  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value
    if (isNaN(Number(value))) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    setError("")

    // Focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp]
      if (otp[index]) {
        newOtp[index] = ""
        setOtp(newOtp)
      } else if (index > 0) {
        newOtp[index - 1] = ""
        setOtp(newOtp)
        inputRefs.current[index - 1]?.focus()
      }
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").slice(0, 6)
    if (!/^\d+$/.test(pastedData)) return

    const newOtp = [...otp]
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newOtp[i] = pastedData[i]
    }
    setOtp(newOtp)

    // Focus the next empty input or the last input
    const nextEmptyIndex = newOtp.findIndex((digit) => digit === "")
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus()
    } else {
      inputRefs.current[5]?.focus()
    }
  }

  const handleVerify = async () => {
    const otpString = otp.join("")
    if (otpString.length !== 6) {
      setError("Please enter complete OTP")
      return
    }

    setIsVerifying(true)
    setError("")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Verify against generated OTP
    if (otpString === generatedOTP) {
      console.log("OTP verified successfully")
      onVerificationSuccess?.()
    } else {
      setError(`Invalid OTP. Please try again. (Demo: Correct OTP is ${generatedOTP})`)
    }

    setIsVerifying(false)
  }

  const handleResend = async () => {
    setCanResend(false)
    setTimeLeft(30)
    setOtp(new Array(6).fill(""))
    setError("")

    // Generate and send new OTP
    await sendOTP()

    // Focus first input
    inputRefs.current[0]?.focus()
  }

  if (sendingOTP && !isOTPSent) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <h2 className="text-xl font-bold mb-2">Sending OTP</h2>
            <p className="text-gray-600">
              Sending verification code to your phone number ending in ****{lastFourDigits}
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Verify OTP</CardTitle>
          <CardDescription className="text-center">
            We've sent a 6-digit code to your phone number ending in ****{lastFourDigits}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-center space-x-2">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  className={`w-12 h-12 text-center text-lg font-semibold ${error ? "border-red-500" : ""}`}
                  aria-label={`OTP digit ${index + 1}`}
                />
              ))}
            </div>

            {error && <p className="text-sm text-red-500 text-center">{error}</p>}

            <Button onClick={handleVerify} className="w-full" disabled={isVerifying || otp.join("").length !== 6}>
              {isVerifying ? "Verifying..." : "Verify OTP"}
            </Button>
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">Didn't receive the code?</p>
            {canResend ? (
              <Button variant="link" onClick={handleResend} className="p-0 h-auto">
                Resend OTP
              </Button>
            ) : (
              <p className="text-sm text-muted-foreground">Resend in {timeLeft}s</p>
            )}
          </div>

          {onBack && (
            <Button variant="outline" onClick={onBack} className="w-full">
              Back to Sign Up
            </Button>
          )}

          <div className="text-xs text-center text-muted-foreground">
            <p>Demo Mode: Current OTP is {generatedOTP || "generating..."}</p>
            <p>In production, OTP would be sent via SMS</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
