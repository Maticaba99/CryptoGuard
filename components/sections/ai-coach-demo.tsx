"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Bot, MessageSquare, Shield, AlertTriangle, CheckCircle2 } from 'lucide-react'

const chatMessages = [
  { 
    role: 'user', 
    content: 'I received an email about a new DeFi opportunity with 50% APY. Is this safe?',
    timestamp: '10:42 AM'
  },
  { 
    role: 'assistant', 
    content: 'This appears to be a high-risk situation. 50% APY is extremely high and often indicates a potential scam or unsustainable project. I\'ve analyzed similar patterns and found 87% of such offers were fraudulent.',
    timestamp: '10:43 AM',
    alert: {
      type: 'warning',
      message: 'High Risk Detected'
    }
  },
  { 
    role: 'user', 
    content: 'What should I look for to verify if it\'s legitimate?',
    timestamp: '10:45 AM'
  },
  { 
    role: 'assistant', 
    content: 'Check these key factors: 1) Verify the project\'s smart contract has been audited by reputable firms, 2) Research the team\'s background and verify their identities, 3) Look for sustainable tokenomics rather than unsustainable high yields, 4) Check community feedback on neutral platforms.',
    timestamp: '10:46 AM',
    alert: {
      type: 'info',
      message: 'Security Checklist'
    }
  }
]

export function AICoachDemo() {
  const [visibleMessages, setVisibleMessages] = useState<number>(0)
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    
    const element = document.getElementById('demo')
    if (element) observer.observe(element)
    
    return () => observer.disconnect()
  }, [])
  
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setVisibleMessages(prev => {
          if (prev < chatMessages.length) {
            return prev + 1
          }
          clearInterval(interval)
          return prev
        })
      }, 1000)
      
      return () => clearInterval(interval)
    }
  }, [isVisible])
  
  return (
    <section id="demo" className="py-20 md:py-32 relative overflow-hidden bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-crypto/10 border border-crypto/20 mb-4">
            <Bot className="h-5 w-5 text-crypto mr-2" />
            <span className="text-crypto font-medium text-sm">AI Security Coach</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Your Personal <span className="gradient-text">Crypto Security</span> Expert
          </h2>
          <p className="text-lg text-foreground/80">
            Get real-time advice and security recommendations from our AI coach to protect your investments and avoid common crypto scams.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* AI Coach Demo */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="bg-background rounded-xl overflow-hidden border border-border shadow-xl neumorphic">
              {/* Chat Header */}
              <div className="bg-muted p-4 flex items-center justify-between border-b border-border">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-crypto/20 flex items-center justify-center mr-3">
                    <Bot className="h-5 w-5 text-crypto" />
                  </div>
                  <div>
                    <h3 className="font-medium">CryptoGuard AI Coach</h3>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      <span className="text-xs text-foreground/70">Online</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" aria-label="Settings">
                    <Shield className="h-5 w-5 text-foreground/70" />
                  </Button>
                </div>
              </div>
              
              {/* Chat Messages */}
              <div className="p-4 h-96 overflow-y-auto flex flex-col space-y-4">
                {chatMessages.slice(0, visibleMessages).map((message, index) => (
                  <div 
                    key={index} 
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-3 duration-500`}
                    style={{ animationDelay: `${index * 300}ms` }}
                  >
                    <div className={`max-w-[80%] ${
                      message.role === 'user' 
                        ? 'bg-primary text-primary-foreground rounded-t-lg rounded-bl-lg' 
                        : 'bg-muted rounded-t-lg rounded-br-lg'
                    } p-4 shadow-sm`}>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm">{message.content}</p>
                        
                        {message.alert && (
                          <div className={`mt-2 p-2 rounded-md text-sm flex items-center ${
                            message.alert.type === 'warning' 
                              ? 'bg-destructive/10 text-destructive' 
                              : 'bg-secondary/10 text-secondary'
                          }`}>
                            {message.alert.type === 'warning' ? (
                              <AlertTriangle className="h-4 w-4 mr-2 flex-shrink-0" />
                            ) : (
                              <CheckCircle2 className="h-4 w-4 mr-2 flex-shrink-0" />
                            )}
                            <span>{message.alert.message}</span>
                          </div>
                        )}
                        
                        <span className="text-xs opacity-70 mt-1">{message.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                {visibleMessages < chatMessages.length && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-full px-4 py-2 flex items-center space-x-2">
                      <div className="w-2 h-2 bg-foreground/40 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-foreground/40 rounded-full animate-pulse delay-150"></div>
                      <div className="w-2 h-2 bg-foreground/40 rounded-full animate-pulse delay-300"></div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Chat Input */}
              <div className="p-4 border-t border-border">
                <div className="flex items-center">
                  <div className="flex-1 bg-muted rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-secondary">
                    <input 
                      type="text" 
                      placeholder="Ask about crypto security..." 
                      className="w-full bg-transparent border-none focus:outline-none text-sm"
                    />
                  </div>
                  <Button variant="crypto" size="icon" className="ml-2">
                    <MessageSquare className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Features List */}
          <div className={`space-y-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h3 className="text-2xl font-bold">How Our AI Coach Protects You</h3>
            
            <div className="space-y-6">
              <div className="flex">
                <div className="mr-4 flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-secondary" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1">Scam Detection</h4>
                  <p className="text-foreground/70">
                    Identifies potential scams and fraudulent schemes before you invest your crypto assets.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4 flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-crypto/10 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-crypto" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1">Security Best Practices</h4>
                  <p className="text-foreground/70">
                    Provides personalized recommendations to enhance your wallet security and protect your assets.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4 flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-accent" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1">24/7 Availability</h4>
                  <p className="text-foreground/70">
                    Get instant security advice whenever you need it, day or night, without waiting for human support.
                  </p>
                </div>
              </div>
            </div>
            
            <Button variant="gradient" size="lg" className="hover-lift">
              Try AI Coach Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}