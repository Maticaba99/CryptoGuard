"use client"

import { Shield } from 'lucide-react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  const { theme, setTheme } = useTheme()

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      {/* Left Side - Branding */}
      <div className="hidden md:flex md:w-1/2 bg-muted/30 p-8 flex-col justify-between relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 -left-64 w-96 h-96 bg-secondary/20 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/3 -right-64 w-96 h-96 bg-crypto/20 rounded-full filter blur-3xl"></div>
        </div>

        {/* Logo */}
        <div>
          <Link href="/" className="flex items-center space-x-2 mb-12">
            <Shield className="h-8 w-8 text-secondary" />
            <span className="font-heading font-bold text-xl">CryptoGuard<span className="text-secondary">AI</span></span>
          </Link>

          <div className="max-w-md">
            <h1 className="text-4xl font-bold mb-6">
              Secure Your <span className="gradient-text">Digital Assets</span> With Advanced AI
            </h1>
            <p className="text-foreground/70">
              Join thousands of crypto investors who trust CryptoGuard AI to protect their digital assets with cutting-edge security.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-6 mt-12">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
              <Shield className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Advanced Protection</h3>
              <p className="text-sm text-foreground/70">Multi-layer security system for your crypto assets</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-crypto/10 flex items-center justify-center flex-shrink-0">
              <Shield className="h-5 w-5 text-crypto" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Real-time Monitoring</h3>
              <p className="text-sm text-foreground/70">24/7 surveillance of your wallet activities</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
              <Shield className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h3 className="font-medium mb-1">AI-Powered Insights</h3>
              <p className="text-sm text-foreground/70">Smart detection of potential security threats</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Personalized Security</h3>
              <p className="text-sm text-foreground/70">Tailored protection based on your needs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full md:w-1/2 flex flex-col p-4 md:p-8 justify-center items-center relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4"
          aria-label="Toggle theme"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>

        <div className="w-full max-w-md">
          <div className="md:hidden flex items-center space-x-2 mb-8">
            <Shield className="h-8 w-8 text-secondary" />
            <span className="font-heading font-bold text-xl">CryptoGuard<span className="text-secondary">AI</span></span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>
            {subtitle && <p className="text-foreground/70">{subtitle}</p>}
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}