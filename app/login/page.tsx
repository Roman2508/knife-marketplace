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
import { useAppStore } from "@/lib/store"
import { Eye, EyeOff, AlertCircle } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAppStore()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 500))

    const success = login(email, password)
    if (success) {
      router.push("/")
    } else {
      setError("Invalid email or password. Try: blade@example.com, time@example.com, or mod@edge.com")
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
            <h1 className="mb-2 font-mono text-3xl font-black uppercase tracking-tighter">Welcome Back</h1>
            <p className="text-sm uppercase tracking-wider text-muted-foreground">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="border-4 border-red-500 bg-red-500/10 p-4 shadow-[4px_4px_0_0_rgb(239_68_68)]">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
                  <p className="text-sm font-bold text-red-500">{error}</p>
                </div>
              </div>
            )}

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
                  placeholder="Enter your password"
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
            </div>

            <Button
              type="submit"
              className="w-full border-4 border-foreground bg-primary font-mono text-base font-black uppercase tracking-wider shadow-[4px_4px_0_0_rgb(var(--foreground))] hover:shadow-[6px_6px_0_0_rgb(var(--foreground))] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm uppercase tracking-wider text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="font-bold text-primary hover:underline">
                Create one
              </Link>
            </p>
          </div>

          <div className="mt-6 border-4 border-foreground bg-secondary p-4 shadow-[4px_4px_0_0_rgb(var(--foreground))]">
            <p className="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Demo Accounts:
            </p>
            <ul className="space-y-2 text-xs">
              <li className="font-mono">
                <code className="font-bold text-primary">blade@example.com</code> - Regular user
              </li>
              <li className="font-mono">
                <code className="font-bold text-primary">time@example.com</code> - Regular user
              </li>
              <li className="font-mono">
                <code className="font-bold text-accent">mod@edge.com</code> - Moderator
              </li>
            </ul>
            <p className="mt-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Any password works for demo.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
