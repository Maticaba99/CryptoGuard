import { cn } from '@/lib/utils'
import React from 'react'

interface CardNeumorphicProps {
  children: React.ReactNode;
  className?: string;
  glowEffect?: 'primary' | 'secondary';
}

export function CardNeumorphic({ 
  children, 
  className,
  glowEffect 
}: CardNeumorphicProps) {
  return (
    <div 
      className={cn(
        "rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm p-6",
        "transition-all duration-300 card-hover",
        glowEffect === 'primary' && "glow border-primary/30",
        glowEffect === 'secondary' && "glow border-secondary/30",
        className
      )}
    >
      {children}
    </div>
  )
}