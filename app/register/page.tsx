"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useAppStore } from "@/lib/store"
import { Eye, EyeOff, AlertCircle, Check } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const { register } = useAppStore()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const passwordRequirements = [
    { met: password.length >= 8, text: "At least 8 characters" },
    { met: /[A-Z]/.test(password), text: "One uppercase letter" },
    { met: /[a-z]/.test(password), text: "One lowercase letter" },
    { met: /[0-9]/.test(password), text: "One number" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (!agreeTerms) {
      setError("You must agree to the terms and conditions")
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))

    const success = register(username, email, password)
    if (success) {
      router.push("/")
    } else {
      setError("An account with this email already exists")
    }
    setIsLoading(false)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md border-4 border-foreground bg-card p-8 shadow-brutal">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center border-4 border-primary bg-primary shadow-[4px_4px_0_0_rgb(var(--foreground))]">
              <span className="font-mono text-3xl font-black uppercase text-background">E</span>
            </div>
            <h1 className="mb-2 font-mono text-3xl font-black uppercase tracking-tighter">Create Account</h1>
            <p className="text-sm uppercase tracking-wider text-muted-foreground">Join the marketplace</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="border-4 border-red-500 bg-red-500/10 p-4 shadow-[4px_4px_0_0_rgb(239_68_68)]">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
                  <p className="text-sm font-bold text-red-500">{error}</p>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="username" className="font-mono text-sm font-bold uppercase tracking-wider">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="border-4 border-foreground bg-background shadow-[4px_4px_0_0_rgb(var(--foreground))] focus-visible:shadow-[6px_6px_0_0_rgb(var(--foreground))] focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="font-mono text-sm font-bold uppercase tracking-wider">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-4 border-foreground bg-background shadow-[4px_4px_0_0_rgb(var(--foreground))] focus-visible:shadow-[6px_6px_0_0_rgb(var(--foreground))] focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="font-mono text-sm font-bold uppercase tracking-wider">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-4 border-foreground bg-background pr-12 shadow-[4px_4px_0_0_rgb(var(--foreground))] focus-visible:shadow-[6px_6px_0_0_rgb(var(--foreground))] focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-primary"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <div className="mt-3 space-y-2">
                {passwordRequirements.map((req, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className={`flex h-5 w-5 items-center justify-center border-2 ${
                        req.met ? "border-green-500 bg-green-500" : "border-foreground bg-background"
                      }`}
                    >
                      {req.met && <Check className="h-3 w-3 text-background" />}
                    </div>
                    <span
                      className={`text-xs font-mono font-bold uppercase tracking-wider ${req.met ? "text-green-500" : "text-muted-foreground"}`}
                    >
                      {req.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="font-mono text-sm font-bold uppercase tracking-wider">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="border-4 border-foreground bg-background shadow-[4px_4px_0_0_rgb(var(--foreground))] focus-visible:shadow-[6px_6px_0_0_rgb(var(--foreground))] focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="terms"
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                className="mt-1 border-2 border-foreground data-[state=checked]:border-primary data-[state=checked]:bg-primary"
              />
              <Label htmlFor="terms" className="text-xs font-bold uppercase leading-tight tracking-wider">
                I agree to the{" "}
                <Link href="#" className="text-primary underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-primary underline">
                  Privacy Policy
                </Link>
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full border-4 border-foreground bg-primary font-mono text-base font-black uppercase tracking-wider shadow-[4px_4px_0_0_rgb(var(--foreground))] hover:shadow-[6px_6px_0_0_rgb(var(--foreground))] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm uppercase tracking-wider text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-bold text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
