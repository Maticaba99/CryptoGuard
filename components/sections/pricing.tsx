"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Check, Shield, Zap, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

const plans = [
  {
    name: "Basic",
    description: "Essential protection for individual crypto investors",
    icon: <Shield className="h-6 w-6" />,
    price: 19,
    features: [
      "Real-time wallet monitoring",
      "Basic threat detection",
      "Email alerts",
      "1 wallet connection",
      "Community support"
    ],
    color: "border-muted-foreground/20",
    buttonVariant: "outline" as const
  },
  {
    name: "Pro",
    description: "Advanced protection for serious crypto investors",
    icon: <Zap className="h-6 w-6" />,
    price: 49,
    popular: true,
    features: [
      "Everything in Basic",
      "AI security coach access",
      "Smart contract analysis",
      "5 wallet connections",
      "Priority support",
      "Transaction risk scoring"
    ],
    color: "border-secondary",
    buttonVariant: "gradient" as const
  },
  {
    name: "Enterprise",
    description: "Maximum security for professional traders and firms",
    icon: <Star className="h-6 w-6" />,
    price: 99,
    features: [
      "Everything in Pro",
      "Unlimited wallet connections",
      "Custom security rules",
      "API access",
      "Dedicated account manager",
      "White-label options",
      "Advanced analytics dashboard"
    ],
    color: "border-crypto",
    buttonVariant: "crypto" as const
  }
]

export function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')
  
  return (
    <section id="pricing" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 -right-64 w-96 h-96 bg-crypto/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-lg text-foreground/80 mb-8">
            Choose the perfect plan to secure your cryptocurrency investments with our advanced AI protection.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                billingCycle === 'monthly' 
                  ? "bg-secondary text-secondary-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              Monthly
            </button>
            <div className="relative">
              <div className="h-px w-8 bg-border"></div>
              <div className="absolute -top-3 -left-1 px-2 py-1 bg-accent rounded-full text-[10px] font-bold text-accent-foreground">
                Save 20%
              </div>
            </div>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                billingCycle === 'yearly' 
                  ? "bg-secondary text-secondary-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              Yearly
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={cn(
                "relative rounded-xl overflow-hidden transition-all duration-300 card-hover",
                "border bg-card p-6",
                plan.popular ? `${plan.color} border-2 glow` : "border-border"
              )}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-secondary text-secondary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                    MOST POPULAR
                  </div>
                </div>
              )}
              
              <div className="flex items-center space-x-3 mb-4">
                <div className={cn(
                  "p-2 rounded-lg",
                  index === 0 ? "bg-muted" : index === 1 ? "bg-secondary/10" : "bg-crypto/10"
                )}>
                  {plan.icon}
                </div>
                <h3 className="text-xl font-bold">{plan.name}</h3>
              </div>
              
              <p className="text-muted-foreground mb-6">{plan.description}</p>
              
              <div className="mb-6">
                <span className="text-4xl font-bold">${billingCycle === 'yearly' ? Math.floor(plan.price * 0.8) : plan.price}</span>
                <span className="text-muted-foreground">/month</span>
                
                {billingCycle === 'yearly' && (
                  <div className="text-sm text-accent mt-1">
                    ${plan.price * 12 * 0.8} billed annually
                  </div>
                )}
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-secondary mr-2 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                variant={plan.buttonVariant} 
                className="w-full hover-lift"
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  )
}