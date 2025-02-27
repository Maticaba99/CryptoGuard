"use client"

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Eye, EyeOff } from 'lucide-react'

interface InputFloatingLabelProps {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password';
  required?: boolean;
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export function InputFloatingLabel({
  name,
  label,
  type,
  required = false,
  error,
  value,
  onChange,
  onBlur
}: InputFloatingLabelProps) {
  const [focused, setFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  
  const handleFocus = () => setFocused(true)
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false)
    if (onBlur) onBlur(e)
  }
  
  const toggleShowPassword = () => setShowPassword(prev => !prev)
  
  const inputType = type === 'password' && showPassword ? 'text' : type
  
  return (
    <div className="mb-4">
      <div className="relative">
        <div className={cn(
          "absolute inset-0 rounded-md transition-all duration-200",
          focused ? "ring-2 ring-secondary/50" : "ring-0",
          error ? "ring-2 ring-destructive/50" : ""
        )} />
        
        <div className="relative border border-input bg-background rounded-md">
          <input
            type={inputType}
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            required={required}
            className={cn(
              "block w-full px-4 pt-6 pb-2 text-foreground bg-transparent rounded-md focus:outline-none",
              type === 'password' && "pr-12"
            )}
            placeholder=" "
            onFocus={handleFocus}
            onBlur={handleBlur}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
          />
          
          <label
            htmlFor={name}
            className={cn(
              "absolute text-muted-foreground duration-200 transform",
              (focused || value) 
                ? "-translate-y-3 scale-75 top-4 origin-[0] left-4" 
                : "top-4 left-4"
            )}
          >
            {label}{required && <span className="text-destructive ml-1">*</span>}
          </label>
          
          {type === 'password' && (
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Eye className="h-5 w-5 text-muted-foreground" />
              )}
            </button>
          )}
        </div>
      </div>
      
      {error && (
        <p id={`${name}-error`} className="mt-1 text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}