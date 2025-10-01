"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Star, Upload, Brain, Users, BarChart3, CheckCircle, ArrowRight, Menu, X, Play, Quote, Award, Zap, Target, BookOpen, Lightbulb, Shield, ChevronDown, MousePointer2, Sparkles, Globe, Lock, Headphones, ArrowUpRight, Check, Minus } from 'lucide-react';
import Image from 'next/image';

const YeetBitzLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [hasHovered, setHasHovered] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleFirstHover = () => {
      if (!hasHovered) setHasHovered(true);
    };
    
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mouseenter', handleFirstHover, { once: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseenter', handleFirstHover);
    };
  }, [hasHovered]);

  // UPDATED GradientButton with inline cursor styles
  const GradientButton = ({ children, variant = "primary", className = "", onClick, size = "default", disabled = false }) => {
    const sizeClasses = {
      small: "px-4 py-2 text-sm font-semibold",
      default: "px-6 py-3 text-base font-semibold",
      large: "px-8 py-4 text-lg font-semibold",
      xl: "px-10 py-5 text-xl font-bold",
    };

    const baseClasses = "transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center whitespace-nowrap";

    if (variant === "secondary") {
      return (
        <button
          disabled={disabled}
          className={`${sizeClasses[size]} ${baseClasses} bg-white/90 backdrop-blur-sm text-gray-900 rounded-2xl border border-gray-200/80 hover:shadow-lg ${className}`}
          onClick={onClick}
          style={{ cursor: 'pointer' }}
        >
          {children}
        </button>
      );
    }

    if (variant === "ghost") {
      return (
        <button
          disabled={disabled}
          className={`${sizeClasses[size]} ${baseClasses} text-gray-700 hover:text-gray-900 rounded-2xl hover:bg-gray-100/80 ${className}`}
          onClick={onClick}
          style={{ cursor: 'pointer' }}
        >
          {children}
        </button>
      );
    }

    return (
      <button
        disabled={disabled}
        className={`${sizeClasses[size]} ${baseClasses} bg-gradient-to-r from-[#00E5FF] via-[#FFD600] to-[#E91E63] text-black rounded-2xl hover:shadow-lg ${className}`}
        onClick={onClick}
        style={{ cursor: 'pointer' }}
      >
        {children}
      </button>
    );
  };

  const FloatingCard = ({ children, className = "", delay = 0 }) => (
    <div 
      className={`transition-all duration-300 hover:scale-[1.02] ${className}`}
      style={{ 
        animationDelay: `${delay}ms`,
        transform: `translateY(${Math.sin(Date.now() * 0.001 + delay) * 2}px)`,
        cursor: 'pointer'
      }}
    >
      {children}
    </div>
  );

  const features = [
    {
      icon: Upload,
      title: "Smart Document Processing",
      description: "Upload PDFs, DOCX, or TXT files and watch our AI instantly extract key concepts, analyze structure, and prepare content for transformation.",
      gradient: "from-[#00E5FF] to-[#FFD600]",
      details: ["Multi-format support", "Instant processing", "Structure analysis", "Content extraction"]
    },
    {
      icon: Brain,
      title: "AI-Powered Mind Maps",
      description: "Transform any document into beautiful, interactive mind maps that visualize complex relationships and hierarchies between concepts.",
      gradient: "from-[#FFD600] to-[#FF9800]",
      details: ["Visual hierarchies", "Interactive nodes", "Relationship mapping", "Collaborative editing"]
    },
    {
      icon: Target,
      title: "Automated Test Generation",
      description: "Generate comprehensive assessments with multiple choice questions, true/false, and open-ended questions tailored to your content.",
      gradient: "from-[#FF9800] to-[#E91E63]",
      details: ["Multiple question types", "Difficulty adjustment", "Auto-scoring", "Performance analytics"]
    },
    {
      icon: Users,
      title: "Role-Based Management",
      description: "Seamlessly manage administrators, instructors, and students with dedicated dashboards, permissions, and collaborative tools.",
      gradient: "from-[#E91E63] to-[#9C27B0]",
      details: ["Multi-role system", "Permission control", "Team collaboration", "Activity tracking"]
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Track student progress, identify learning gaps, and optimize content with comprehensive insights and real-time reporting.",
      gradient: "from-[#9C27B0] to-[#00E5FF]",
      details: ["Progress tracking", "Learning analytics", "Performance insights", "Custom reports"]
    },
    {
      icon: Lightbulb,
      title: "Adaptive Learning",
      description: "Personalized learning paths that adapt to individual student needs, learning styles, and progress patterns for optimal outcomes.",
      gradient: "from-[#00E5FF] to-[#E91E63]",
      details: ["Personalization", "Adaptive paths", "Learning optimization", "Smart recommendations"]
    }
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "Computer Science Professor",
      institution: "Stanford University",
      content: "YeetBitz has fundamentally changed how I approach course creation. The AI-generated mind maps help students visualize complex algorithms and data structures in ways I never thought possible.",
      avatar: "SC",
      rating: 5,
      highlight: "Saves 15 hours/week"
    },
    {
      name: "Michael Rodriguez",
      role: "Learning & Development Manager",
      institution: "TechCorp Solutions",
      content: "The impact on our corporate training has been remarkable. Our completion rates increased by 78%, and employee engagement scores are at an all-time high.",
      avatar: "MR",
      rating: 5,
      highlight: "78% completion increase"
    },
    {
      name: "Emma Thompson",
      role: "High School Biology Teacher",
      institution: "Lincoln Academy",
      content: "My students actually get excited about studying now. The interactive mind maps turn dry textbook content into engaging visual experiences.",
      avatar: "ET",
      rating: 5,
      highlight: "40% test score improvement"
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for individual educators getting started",
      features: [
        "5 document uploads per month",
        "Basic mind map generation",
        "Up to 25 students",
        "Email support",
        "Core analytics"
      ],
      notIncluded: [
        "Advanced AI features",
        "Custom branding",
        "API access"
      ],
      cta: "Get Started Free",
      popular: false
    },
    {
      name: "Professional",
      price: "$29",
      description: "For educators and small institutions",
      features: [
        "Unlimited document uploads",
        "Advanced mind map customization",
        "Up to 100 students",
        "Priority support",
        "Advanced analytics",
        "Custom branding",
        "Export capabilities"
      ],
      notIncluded: [
        "API access",
        "White-label solution"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large institutions and organizations",
      features: [
        "Everything in Professional",
        "Unlimited students",
        "API access",
        "White-label solution",
        "Dedicated support",
        "Custom integrations",
        "SLA guarantee",
        "Training & onboarding"
      ],
      notIncluded: [],
      cta: "Contact Sales",
      popular: false
    }
  ];

  const faqs = [
    {
      question: "How does the AI document processing work?",
      answer: "Our advanced AI uses natural language processing and machine learning to analyze your documents. It identifies key concepts, extracts hierarchical relationships, and understands context to create structured learning materials."
    },
    {
      question: "What file formats and sizes are supported?",
      answer: "YeetBitz supports PDF, DOCX, and TXT files up to 50MB each. Our AI can process everything from simple notes to comprehensive textbooks and research papers."
    },
    {
      question: "Can I customize and edit the generated mind maps?",
      answer: "Absolutely! While our AI creates the initial structure, you have complete control over customization. Edit node content, adjust hierarchies, change colors and layouts."
    },
    {
      question: "How scalable is the platform for large institutions?",
      answer: "YeetBitz is built for scale. Our Enterprise plan supports unlimited students and documents, offers dedicated infrastructure and API access."
    }
  ];

  const stats = [
    { number: "50,000+", label: "Documents Processed", icon: BookOpen, suffix: "this month" },
    { number: "125,000+", label: "Active Students", icon: Users, suffix: "learning daily" },
    { number: "98%", label: "Satisfaction Rate", icon: Award, suffix: "from educators" },
    { number: "5x", label: "Faster Creation", icon: Zap, suffix: "vs traditional methods" }
  ];

  return (
    <main className="overflow-x-hidden transition-all duration-1000" style={{ cursor: 'default' }}>
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-200 ${
        scrollY > 50 
          ? 'bg-white/95 backdrop-blur-2xl shadow-lg border-b border-gray-200/50' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center mt-2" style={{ cursor: 'pointer' }}>
              <div className="w-20 h-20 relative">
                <Image
                  src="/logo.png"
                  alt="YeetBitz Logo"
                  width={80}
                  height={80}
                  className="object-contain drop-shadow-lg"
                  priority
                />
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-1">
              {['Features', 'Testimonials', 'Pricing', 'FAQ'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium rounded-xl hover:bg-gray-100/50 transition-colors duration-200 text-sm"
                  style={{ cursor: 'pointer' }}
                >
                  {item}
                </a>
              ))}
              <div className="ml-4 flex items-center space-x-2">
                <GradientButton variant="ghost" size="small">
                  Sign In
                </GradientButton>
                <GradientButton size="small">
                  Get Started
                </GradientButton>
              </div>
            </nav>

            <button 
              className="md:hidden p-2 rounded-xl hover:bg-gray-100/50 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ cursor: 'pointer' }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div className={`md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-2xl shadow-xl border-b border-gray-200/50 transition-all duration-200 ${
            isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}>
            <nav className="px-4 py-4 space-y-1">
              {['Features', 'Testimonials', 'Pricing', 'FAQ'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block px-4 py-3 text-gray-600 hover:text-gray-900 font-medium rounded-xl hover:bg-gray-100/50 transition-colors duration-200 text-sm"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ cursor: 'pointer' }}
                >
                  {item}
                </a>
              ))}
              <div className="pt-4 space-y-3">
                <GradientButton variant="ghost" size="small" className="w-full">
                  Sign In
                </GradientButton>
                <GradientButton size="small" className="w-full">
                  Get Started
                </GradientButton>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/5 via-[#FFD600]/5 to-[#E91E63]/5" />
        
        <div className="relative max-w-7xl mx-auto w-full">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200/50 shadow-lg mb-8" style={{ cursor: 'pointer' }}>
              <Sparkles className="text-[#00E5FF] mr-2" size={16} />
              <span className="text-sm font-semibold text-gray-800">Trusted by 10,000+ educators</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
              Transform Documents
              <span className="block bg-gradient-to-r from-[#00E5FF] via-[#FFD600] to-[#E91E63] bg-clip-text text-transparent animate-gradient-x">
                Into Learning
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed font-medium">
              Upload any document and watch our AI instantly create mind maps, generate assessments, 
              and build comprehensive learning experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <GradientButton size="large" className="w-full sm:w-auto">
                <span className="flex items-center justify-center whitespace-nowrap">
                  Start Free Trial 
                  <ArrowRight className="ml-3" size={20} />
                </span>
              </GradientButton>
              <GradientButton variant="secondary" size="large" className="w-full sm:w-auto">
                <span className="flex items-center justify-center whitespace-nowrap">
                  <Play className="mr-3" size={18} /> 
                  Start Demo
                </span>
              </GradientButton>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <FloatingCard key={index} delay={index * 100}>
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50 shadow-lg hover:shadow-xl transition-shadow duration-200" style={{ cursor: 'pointer' }}>
                    <div className="w-10 h-10 bg-gradient-to-br from-[#00E5FF]/20 to-[#E91E63]/20 rounded-xl flex items-center justify-center mb-3" style={{ cursor: 'pointer' }}>
                      <stat.icon className="text-[#00E5FF]" size={20} />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1 tabular-nums" style={{ cursor: 'pointer' }}>{stat.number}</div>
                    <div className="text-gray-600 font-medium text-xs leading-tight" style={{ cursor: 'pointer' }}>{stat.label}</div>
                    <div className="text-gray-400 text-xs mt-1" style={{ cursor: 'pointer' }}>{stat.suffix}</div>
                  </div>
                </FloatingCard>
              ))}
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2" style={{ cursor: 'pointer' }}>
          <div className="animate-bounce">
            <MousePointer2 className="text-gray-400" size={20} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm mb-6" style={{ cursor: 'pointer' }}>
              <div className="w-2 h-2 bg-[#00E5FF] rounded-full mr-2 animate-pulse" />
              <span className="text-sm font-semibold text-gray-700">AI-Powered Features</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Everything for
              <span className="block bg-gradient-to-r from-[#00E5FF] to-[#E91E63] bg-clip-text text-transparent">
                Modern Education
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Transform how you create, manage, and deliver educational content with AI.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FloatingCard key={index} delay={index * 100}>
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow duration-200 h-full" style={{ cursor: 'pointer' }}>
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg`} style={{ cursor: 'pointer' }}>
                    <feature.icon className="text-white" size={24} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ cursor: 'pointer' }}>
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed" style={{ cursor: 'pointer' }}>
                    {feature.description}
                  </p>
                </div>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Transform your content in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {[
              {
                step: "01",
                title: "Upload Document",
                description: "Drag and drop your PDF, DOCX, or TXT file. Our AI instantly begins analyzing your content.",
                gradient: "from-[#00E5FF] to-[#FFD600]",
                icon: Upload
              },
              {
                step: "02", 
                title: "AI Processing",
                description: "Our AI extracts key concepts, identifies relationships, and creates hierarchical structures.",
                gradient: "from-[#FFD600] to-[#FF9800]",
                icon: Brain
              },
              {
                step: "03",
                title: "Engage & Learn",
                description: "Access interactive mind maps, take assessments, and track learning progress.",
                gradient: "from-[#FF9800] to-[#E91E63]",
                icon: Target
              }
            ].map((step, index) => (
              <FloatingCard key={index} delay={index * 150}>
                <div className="text-center" style={{ cursor: 'pointer' }}>
                  <div className={`relative w-20 h-20 bg-gradient-to-br ${step.gradient} rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl`} style={{ cursor: 'pointer' }}>
                    {<step.icon className="text-white" size={28} />}
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg" style={{ cursor: 'pointer' }}>
                      <span className="text-xs font-bold text-gray-900" style={{ cursor: 'pointer' }}>{step.step}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ cursor: 'pointer' }}>
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed" style={{ cursor: 'pointer' }}>
                    {step.description}
                  </p>
                </div>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/30 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm mb-6" style={{ cursor: 'pointer' }}>
              <Quote className="text-[#00E5FF] mr-2" size={14} />
              <span className="text-sm font-semibold text-gray-700">Success Stories</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Loved by Educators
              <span className="block bg-gradient-to-r from-[#00E5FF] to-[#E91E63] bg-clip-text text-transparent">
                Worldwide
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {testimonials.map((testimonial, index) => (
              <FloatingCard key={index} delay={index * 100}>
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow duration-200 h-full" style={{ cursor: 'pointer' }}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-yellow-400" style={{ cursor: 'pointer' }}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} fill="currentColor" size={16} />
                      ))}
                    </div>
                    <div className="text-xs font-semibold text-[#00E5FF] bg-[#00E5FF]/10 px-2 py-1 rounded-full" style={{ cursor: 'pointer' }}>
                      {testimonial.highlight}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-6 leading-relaxed italic" style={{ cursor: 'pointer' }}>
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center" style={{ cursor: 'pointer' }}>
                    <div className={`w-12 h-12 bg-gradient-to-br from-[#00E5FF] to-[#E91E63] rounded-xl flex items-center justify-center mr-4 shadow-lg`} style={{ cursor: 'pointer' }}>
                      <span className="text-white font-bold text-sm" style={{ cursor: 'pointer' }}>{testimonial.avatar}</span>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900" style={{ cursor: 'pointer' }}>{testimonial.name}</div>
                      <div className="text-gray-600 text-sm" style={{ cursor: 'pointer' }}>{testimonial.role}</div>
                      <div className="text-[#00E5FF] text-xs font-semibold" style={{ cursor: 'pointer' }}>{testimonial.institution}</div>
                    </div>
                  </div>
                </div>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Simple Pricing
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the perfect plan for your educational needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, index) => (
              <FloatingCard key={index} delay={index * 100}>
                <div className={`relative bg-white rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow duration-200 h-full ${
                  plan.popular ? 'ring-2 ring-[#00E5FF]/20' : ''
                }`} style={{ cursor: 'pointer' }}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2" style={{ cursor: 'pointer' }}>
                      <div className="bg-gradient-to-r from-[#00E5FF] to-[#E91E63] text-white px-4 py-1 rounded-full text-xs font-semibold shadow-lg" style={{ cursor: 'pointer' }}>
                        Most Popular
                      </div>
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ cursor: 'pointer' }}>{plan.name}</h3>
                    <div className="mb-3" style={{ cursor: 'pointer' }}>
                      <span className="text-3xl font-bold text-gray-900" style={{ cursor: 'pointer' }}>{plan.price}</span>
                      {plan.price !== 'Custom' && plan.price !== 'Free' && (
                        <span className="text-gray-600 ml-1" style={{ cursor: 'pointer' }}>/month</span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm" style={{ cursor: 'pointer' }}>{plan.description}</p>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center" style={{ cursor: 'pointer' }}>
                        <Check className="text-[#00E5FF] mr-2 flex-shrink-0" size={16} />
                        <span className="text-gray-700 text-sm" style={{ cursor: 'pointer' }}>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <GradientButton 
                    className="w-full" 
                    variant={plan.popular ? "primary" : "secondary"}
                    size="default"
                  >
                    {plan.cta}
                  </GradientButton>
                </div>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#00E5FF]/10 via-[#FFD600]/10 to-[#E91E63]/10 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Ready to Transform Teaching?
          </h2>
          
          <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            Join thousands of educators creating better learning experiences. 
            Start your free trial today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <GradientButton size="large" className="w-full sm:w-auto">
              <span className="flex items-center justify-center whitespace-nowrap">
                Start Free Trial 
                <ArrowRight className="ml-3" size={20} />
              </span>
            </GradientButton>
            <GradientButton variant="secondary" size="large" className="w-full sm:w-auto">
              <span className="flex items-center justify-center whitespace-nowrap">
                <Play className="mr-3" size={18} />
                Start Demo
              </span>
            </GradientButton>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/30">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              FAQ
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200/50" style={{ cursor: 'pointer' }}>
                <details className="group">
                  <summary className="flex items-center justify-between p-4 font-bold text-gray-900 list-none" style={{ cursor: 'pointer' }}>
                    <span className="pr-4 text-sm sm:text-base" style={{ cursor: 'pointer' }}>{faq.question}</span>
                    <ChevronDown className="flex-shrink-0 transform group-open:rotate-180 transition-transform duration-200 text-[#00E5FF]" size={20} />
                  </summary>
                  <div className="px-4 pb-4">
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base" style={{ cursor: 'pointer' }}>{faq.answer}</p>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF] via-[#FFD600] to-[#E91E63] opacity-90" />
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-gray-900/80" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-6" style={{ cursor: 'pointer' }}>
                <div className="w-16 h-16 relative">
                  <Image
                    src="/logo.png"
                    alt="YeetBitz Logo"
                    width={64}
                    height={64}
                    className="object-contain drop-shadow-lg"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-white">YeetBitz</h3>
                  <p className="text-[#00E5FF] text-sm font-semibold">AI-Powered Learning</p>
                </div>
              </div>
              <p className="text-gray-200 mb-6 leading-relaxed text-sm max-w-md" style={{ cursor: 'pointer' }}>
                Transforming education through AI-powered document processing and interactive learning experiences. 
                Empower educators and engage students like never before.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors duration-200" style={{ cursor: 'pointer' }}>
                  <Globe className="text-white" size={18} />
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors duration-200" style={{ cursor: 'pointer' }}>
                  <Lock className="text-white" size={18} />
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors duration-200" style={{ cursor: 'pointer' }}>
                  <Headphones className="text-white" size={18} />
                </div>
              </div>
            </div>

            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "API", "Integrations", "Security", "Roadmap"]
              },
              {
                title: "Company", 
                links: ["About", "Careers", "Contact", "Privacy", "Terms", "Blog"]
              }
            ].map((column, index) => (
              <div key={index}>
                <h3 className="font-bold text-white mb-4 text-lg" style={{ cursor: 'pointer' }}>{column.title}</h3>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a 
                        href="#" 
                        className="text-gray-300 hover:text-white transition-all duration-200 text-sm flex items-center group"
                        style={{ cursor: 'pointer' }}
                      >
                        <ArrowRight className="mr-2 text-[#00E5FF] opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-200" size={14} />
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/20 mt-12 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="w-6 h-6 bg-gradient-to-r from-[#00E5FF] to-[#E91E63] rounded-full mr-3" />
                <p className="text-gray-300 text-center md:text-left text-sm" style={{ cursor: 'pointer' }}>
                  © 2025 YeetBitz. All rights reserved. Transforming education, one document at a time.
                </p>
              </div>
              
              <div className="flex items-center space-x-6">
                {[
                  { name: 'Twitter', icon: Sparkles },
                  { name: 'LinkedIn', icon: Users },
                  { name: 'GitHub', icon: Zap }
                ].map((social) => (
                  <a
                    key={social.name}
                    href="#"
                    className="text-gray-300 hover:text-white transition-all duration-200 text-sm flex items-center group"
                    style={{ cursor: 'pointer' }}
                  >
                    <social.icon className="mr-2 text-[#FFD600] group-hover:scale-110 transition-transform duration-200" size={16} />
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
            
            {/* Feature badges */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-6">
              {['AI-Powered', 'Secure', 'Scalable', 'User-Friendly'].map((badge) => (
                <div 
                  key={badge}
                  className="px-3 py-1 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm"
                  style={{ cursor: 'pointer' }}
                >
                  <span className="text-gray-200 text-xs font-medium">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Floating elements for visual interest */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-[#00E5FF]/20 rounded-full blur-xl" />
        <div className="absolute bottom-10 left-10 w-16 h-16 bg-[#E91E63]/20 rounded-full blur-xl" />
        <div className="absolute top-1/2 left-1/3 w-12 h-12 bg-[#FFD600]/20 rounded-full blur-lg" />
      </footer>
    </main>
  );
};

export default YeetBitzLanding;