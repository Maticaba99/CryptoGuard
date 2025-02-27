"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Lock, TrendingUp } from "lucide-react";

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background to-background/80 opacity-90"></div>
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-secondary/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 -right-64 w-96 h-96 bg-crypto/20 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div
            className={`space-y-8 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20">
              <span className="text-secondary font-medium text-sm">
                Protect your crypto assets with AI
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Secure Your <span className="gradient-text">Digital Assets</span>{" "}
              With Advanced AI
            </h1>

            <p className="text-lg text-foreground/80 max-w-xl">
              CryptoGuard AI provides real-time monitoring, threat detection,
              and personalized security coaching to protect your cryptocurrency
              investments.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="gradient" size="xl" className="group hover-lift">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="xl">
                Watch Demo
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary/10 mb-3">
                  <Shield className="h-6 w-6 text-secondary" />
                </div>
                <p className="text-sm text-foreground/80">
                  Advanced Protection
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-crypto/10 mb-3">
                  <Lock className="h-6 w-6 text-crypto" />
                </div>
                <p className="text-sm text-foreground/80">
                  Real-time Monitoring
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-3">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                <p className="text-sm text-foreground/80">
                  AI-Powered Insights
                </p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <div className="relative z-10 rounded-xl overflow-hidden neumorphic">
              <Image
                src="https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Cryptocurrency security dashboard"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />

              {/* Overlay elements */}
              <div className="absolute top-4 right-4 px-3 py-1 bg-secondary/90 rounded-full text-xs font-medium text-white">
                Protected
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Security Status</p>
                    <p className="text-green-400 text-sm">All systems secure</p>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse delay-150"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse delay-300"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-6 -left-6 p-4 bg-background rounded-lg shadow-lg animate-float">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-crypto flex items-center justify-center">
                  <Lock className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-medium">Threat Detected</p>
                  <p className="text-xs text-foreground/60">
                    Blocked automatically
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 p-4 bg-background rounded-lg shadow-lg animate-float delay-1000">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-medium">Security Score</p>
                  <p className="text-xs text-accent">98/100 Excellent</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
