"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { AuthLayout } from '@/components/auth/AuthLayout'
import { CardNeumorphic } from '@/components/auth/CardNeumorphic'
import { InputFloatingLabel } from '@/components/forms/InputFloatingLabel'
import { SocialAuthButtons } from '@/components/auth/SocialAuthButtons'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { loginSchema, LoginFormValues } from '@/lib/auth/validation'
import { loginUser, socialAuth } from '@/lib/auth/actions'
import { ArrowRight, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  })
  
  const watchEmail = watch('email')
  const watchPassword = watch('password')
  const watchRememberMe = watch('rememberMe')
  
  const onSubmit = async (data: LoginFormValues) => {
    try {
      setIsLoading(true)
      setServerError(null)
      
      const result = await loginUser(data)
      
      if (result.success) {
        // Redirect to dashboard on successful login
        router.push('/')
      } else {
        setServerError(result.error || 'Login failed. Please try again.')
      }
    } catch (error) {
      console.error('Login error:', error)
      setServerError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleSocialAuth = async (provider: string) => {
    try {
      setIsLoading(true)
      setServerError(null)
      
      const result = await socialAuth(provider)
      
      if (result.success) {
        // Redirect to dashboard on successful login
        router.push('/')
      }
    } catch (error) {
      console.error(`${provider} auth error:`, error)
      setServerError(`Authentication with ${provider} failed. Please try again.`)
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <AuthLayout 
      title="Welcome back" 
      subtitle="Sign in to your account to continue"
    >
      <CardNeumorphic glowEffect="secondary">
        {serverError && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md text-destructive text-sm" role="alert">
            {serverError}
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputFloatingLabel
            name="email"
            label="Email"
            type="email"
            required
            error={errors.email?.message}
            value={watchEmail}
            onChange={(e) => setValue('email', e.target.value, { shouldValidate: true })}
          />
          
          <InputFloatingLabel
            name="password"
            label="Password"
            type="password"
            required
            error={errors.password?.message}
            value={watchPassword}
            onChange={(e) => setValue('password', e.target.value, { shouldValidate: true })}
          />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="rememberMe" 
                checked={watchRememberMe}
                onCheckedChange={(checked) => setValue('rememberMe', checked as boolean)}
              />
              <label 
                htmlFor="rememberMe" 
                className="text-sm text-foreground/70 cursor-pointer"
              >
                Remember me
              </label>
            </div>
            
            <Link 
              href="/forgot-password" 
              className="text-sm text-secondary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          
          <Button 
            type="submit" 
            variant="gradient" 
            className="w-full group hover-lift"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
            ) : (
              <>
                Sign In
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Button>
        </form>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          
          <div className="mt-6">
            <SocialAuthButtons 
              providers={['google', 'github']} 
              onSuccess={handleSocialAuth}
              isLoading={isLoading}
            />
          </div>
        </div>
      </CardNeumorphic>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-foreground/70">
          Don't have an account?{' '}
          <Link href="/register" className="text-secondary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}