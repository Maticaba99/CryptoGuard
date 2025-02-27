"use client"

import { Button } from '@/components/ui/button'
import { Github } from 'lucide-react'
import Image from 'next/image'

interface SocialAuthConfig {
  providers: ('google' | 'github')[];
  onSuccess: (provider: string) => Promise<void>;
  isLoading?: boolean;
}

export function SocialAuthButtons({ 
  providers, 
  onSuccess,
  isLoading = false
}: SocialAuthConfig) {
  const handleProviderClick = async (provider: string) => {
    try {
      await onSuccess(provider)
    } catch (error) {
      console.error(`Error authenticating with ${provider}:`, error)
    }
  }
  
  return (
    <div className="flex flex-col space-y-3">
      {providers.includes('google') && (
        <Button
          variant="outline"
          className="w-full flex items-center justify-center space-x-2 hover-lift"
          onClick={() => handleProviderClick('google')}
          disabled={isLoading}
        >
          <Image 
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
            alt="Google" 
            width={18} 
            height={18} 
          />
          <span>Continue with Google</span>
        </Button>
      )}
      
      {providers.includes('github') && (
        <Button
          variant="outline"
          className="w-full flex items-center justify-center space-x-2 hover-lift"
          onClick={() => handleProviderClick('github')}
          disabled={isLoading}
        >
          <Github className="h-5 w-5" />
          <span>Continue with GitHub</span>
        </Button>
      )}
    </div>
  )
}