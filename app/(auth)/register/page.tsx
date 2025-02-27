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
import { registerSchema, RegisterFormValues } from '@/lib/auth/validation'
import { registerUser, socialAuth } from '@/lib/auth/actions'
import { ArrowRight, Loader2 } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      terms: false
    }
  })
  
  const watchFullName = watch('fullName')
  const watchEmail = watch('email')
  const watchPassword = watch('password')
  const watchTerms = watch('terms')
  
  const onSubmit = async (data: RegisterFormValues) => {
    try {
      setIsLoading(true)
      setServerError(null)
      
      const result = await registerUser(data)
      
      if (result.success) {
        // Redirect to dashboard or verification page on successful registration
        router.push('/login?registered=true')
      } else {
        setServerError(result.error || 'Registration failed. Please try again.')
      }
    } catch (error) {
      console.error('Registration error:', error)
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
      title="Create an account" 
      subtitle="Join CryptoGuard AI to secure your digital assets"
    >
      <CardNeumorphic glowEffect="secondary">
        {serverError && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md text-destructive text-sm" role="alert">
            {serverError}
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputFloatingLabel
            name="fullName"
            label="Full Name"
            type="text"
            required
            error={errors.fullName?.message}
            value={watchFullName}
            onChange={(e) => setValue('fullName', e.target.value, { shouldValidate: true })}
          />
          
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
          
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="terms" 
              checked={watchTerms}
              onCheckedChange={(checked) => setValue('terms', checked as boolean)}
              className="mt-1"
            />
            <div>
              <label 
                htmlFor="terms" 
                className="text-sm text-foreground/70 cursor-pointer"
              >
                I agree to the{' '}
                <Link href="/terms" className="text-secondary hover:underline">
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-secondary hover:underline">
                  Privacy Policy
                </Link>
              </label>
              {errors.terms && (
                <p className="text-sm text-destructive mt-1">{errors.terms.message}</p>
              )}
            </div>
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
                Create Account
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
          Already have an account?{' '}
          <Link href="/login" className="text-secondary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}