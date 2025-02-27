"use client"

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { CardNeumorphic } from '@/components/auth/CardNeumorphic'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const [errorMessage, setErrorMessage] = useState<string>('An authentication error occurred')
  
  useEffect(() => {
    const error = searchParams.get('error')
    
    if (error) {
      switch (error) {
        case 'Signin':
          setErrorMessage('Try signing in with a different account.')
          break
        case 'OAuthSignin':
        case 'OAuthCallback':
        case 'OAuthCreateAccount':
        case 'EmailCreateAccount':
        case 'Callback':
          setErrorMessage('There was a problem with the authentication service. Please try again later.')
          break
        case 'OAuthAccountNotLinked':
          setErrorMessage('To confirm your identity, sign in with the same account you used originally.')
          break
        case 'EmailSignin':
          setErrorMessage('The email could not be sent. Please try again later.')
          break
        case 'CredentialsSignin':
          setErrorMessage('Invalid credentials. Please check your email and password.')
          break
        case 'SessionRequired':
          setErrorMessage('Please sign in to access this page.')
          break
        default:
          setErrorMessage('An unexpected authentication error occurred.')
          break
      }
    }
  }, [searchParams])
  
  return (
    <AuthLayout 
      title="Authentication Error" 
      subtitle="We encountered a problem with your authentication"
    >
      <CardNeumorphic glowEffect="primary">
        <div className="flex flex-col items-center text-center p-4">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          
          <h3 className="text-xl font-bold mb-2">Authentication Failed</h3>
          <p className="text-foreground/70 mb-6">{errorMessage}</p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <Button 
              variant="outline" 
              className="w-full"
              asChild
            >
              <Link href="/login">
                Try Again
              </Link>
            </Button>
            
            <Button 
              variant="secondary" 
              className="w-full"
              asChild
            >
              <Link href="/">
                Return Home
              </Link>
            </Button>
          </div>
        </div>
      </CardNeumorphic>
    </AuthLayout>
  )
}