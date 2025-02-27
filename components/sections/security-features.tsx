"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, Lock, AlertTriangle, Eye, Fingerprint, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

const features = [
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Advanced Threat Detection",
    description: "Our AI continuously monitors for suspicious activities and potential security threats to your crypto assets.",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    borderColor: "border-secondary/20"
  },
  {
    icon: <Lock className="h-6 w-6" />,
    title: "Multi-layer Protection",
    description: "Implement multiple security layers to protect your digital assets from various attack vectors.",
    color: "text-crypto",
    bgColor: "bg-crypto/10",
    borderColor: "border-crypto/20"
  },
  {
    icon: <AlertTriangle className="h-6 w-6" />,
    title: "Real-time Alerts",
    description: "Receive instant notifications about suspicious activities or potential security breaches.",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    borderColor: "border-destructive/20"
  },
  {
    icon: <Eye className="h-6 w-6" />,
    title: "24/7 Monitoring",
    description: "Continuous monitoring of your wallet activities and transactions for complete peace of mind.",
    color: "text-accent",
    bgColor: "bg-accent/10",
    borderColor: "border-accent/20"
  },
  {
    icon: <Fingerprint className="h-6 w-6" />,
    title: "Biometric Authentication",
    description: "Add an extra layer of security with fingerprint or facial recognition for transaction approvals.",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20"
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Smart Contract Audit",
    description: "Automatic analysis of smart contracts to identify vulnerabilities before you interact with them.",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    borderColor: "border-secondary/20"
  }
]

export function SecurityFeatures() {
  const [activeFeature, setActiveFeature] = useState(0)
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
    
    const element = document.getElementById('features')
    if (element) observer.observe(element)
    
    return () => observer.disconnect()
  }, [])
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 4000)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <section id="features" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/3 -right-64 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-64 w-96 h-96 bg-crypto/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Advanced <span className="gradient-text">Security Features</span>
          </h2>
          <p className="text-lg text-foreground/80">
            Our comprehensive security system uses cutting-edge AI to protect your cryptocurrency investments from all types of threats.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={cn(
                "relative p-6 rounded-xl transition-all duration-300 card-hover",
                "border border-border/50 bg-background/50 backdrop-blur-sm",
                activeFeature === index && "border-secondary/50 glow"
              )}
              onMouseEnter={() => setActiveFeature(index)}
            >
              <div className={cn(
                "inline-flex items-center justify-center p-3 rounded-lg mb-4",
                feature.bgColor
              )}>
                <div className={feature.color}>{feature.icon}</div>
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-foreground/70">{feature.description}</p>
              
              {activeFeature === index && (
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-primary rounded-b-xl" style={{ width: '100%' }}></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}