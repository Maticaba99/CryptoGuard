"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const testimonials = [
  {
    id: 1,
    content: "CryptoGuard AI has completely transformed how I manage my crypto portfolio. The AI security coach alerted me to a phishing attempt that I would have fallen for otherwise. Worth every penny!",
    author: "Alex Thompson",
    role: "Crypto Investor",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    rating: 5
  },
  {
    id: 2,
    content: "As a professional trader, security is my top priority. CryptoGuard AI's real-time monitoring has saved me from multiple suspicious transactions. The smart contract analysis feature is a game-changer.",
    author: "Sarah Chen",
    role: "Professional Trader",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    rating: 5
  },
  {
    id: 3,
    content: "I was skeptical at first, but after using CryptoGuard AI for three months, I've seen a dramatic improvement in my security practices. The AI coach is like having a security expert on call 24/7.",
    author: "Michael Rodriguez",
    role: "DeFi Enthusiast",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    rating: 4
  },
  {
    id: 4,
    content: "Our investment firm has been using the Enterprise plan for our entire team. The custom security rules and API access have allowed us to integrate CryptoGuard AI seamlessly into our existing systems.",
    author: "Jessica Williams",
    role: "Investment Firm Director",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    rating: 5
  }
]

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
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
    
    const element = document.getElementById('testimonials')
    if (element) observer.observe(element)
    
    return () => observer.disconnect()
  }, [])
  
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }
  
  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }
  
  return (
    <section id="testimonials" className="py-20 md:py-32 relative overflow-hidden bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Trusted by <span className="gradient-text">Crypto Investors</span> Worldwide
          </h2>
          <p className="text-lg text-foreground/80">
            See what our users are saying about how CryptoGuard AI has helped secure their digital assets.
          </p>
        </div>
        
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="relative max-w-4xl mx-auto">
            {/* Testimonial Cards */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div 
                    key={testimonial.id} 
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="bg-card rounded-xl p-8 shadow-lg border border-border">
                      {/* Rating */}
                      <div className="flex mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={cn(
                              "h-5 w-5 mr-1",
                              i < testimonial.rating ? "text-secondary fill-secondary" : "text-muted-foreground"
                            )} 
                          />
                        ))}
                      </div>
                      
                      {/* Content */}
                      <blockquote className="text-lg mb-6">
                        "{testimonial.content}"
                      </blockquote>
                      
                      {/* Author */}
                      <div className="flex items-center">
                        <div className="mr-4">
                          <Image 
                            src={testimonial.avatar} 
                            alt={testimonial.author}
                            width={48}
                            height={48}
                            className="rounded-full"
                          />
                        </div>
                        <div>
                          <div className="font-medium">{testimonial.author}</div>
                          <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex justify-center mt-8 space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              <div className="flex space-x-2 items-center">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      "w-2.5 h-2.5 rounded-full transition-all",
                      index === activeIndex ? "bg-secondary w-6" : "bg-muted-foreground/30"
                    )}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}