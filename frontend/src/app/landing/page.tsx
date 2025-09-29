"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Star, Upload, Brain, Users, BarChart3, CheckCircle, ArrowRight, Menu, X, Play, Quote, Award, Zap, Target, BookOpen, Lightbulb, Shield, ChevronDown, MousePointer2, Sparkles, Globe, Lock, Headphones, ArrowUpRight, Check, Minus } from 'lucide-react';
import Image from 'next/image';

interface GradientButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  onClick?: () => void;
  size?: "small" | "default" | "large" | "xl";
  disabled?: boolean;
}

interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const YeetBitzLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState<number>(0);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState<number>(0);
  const heroRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      if (el.id) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const GradientButton = ({ children, variant = "primary", className = "", onClick, size = "default", disabled = false }: GradientButtonProps) => {
    const sizeClasses = {
      small: "px-5 py-2.5 text-sm font-semibold",
      default: "px-8 py-4 text-base font-semibold",
      large: "px-10 py-5 text-lg font-semibold",
      xl: "px-12 py-6 text-xl font-bold"
    };

    if (variant === "secondary") {
      return (
        <button 
          disabled={disabled}
          className={`
            ${sizeClasses[size]} 
            bg-white/80 backdrop-blur-sm text-gray-900 
            rounded-2xl border border-gray-200/50 
            hover:bg-white hover:border-gray-300/50 hover:shadow-lg
            transition-all duration-500 ease-out
            hover:scale-[1.02] active:scale-[0.98]
            disabled:opacity-50 disabled:cursor-not-allowed
            group relative overflow-hidden
            ${className}
          `}
          onClick={onClick}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="relative z-10">{children}</span>
        </button>
      );
    }

    if (variant === "ghost") {
      return (
        <button 
          disabled={disabled}
          className={`
            ${sizeClasses[size]} 
            text-gray-700 hover:text-gray-900
            rounded-2xl hover:bg-gray-100/50
            transition-all duration-300 ease-out
            disabled:opacity-50 disabled:cursor-not-allowed
            ${className}
          `}
          onClick={onClick}
        >
          {children}
        </button>
      );
    }

    return (
      <button 
        disabled={disabled}
        className={`
          ${sizeClasses[size]} 
          bg-gradient-to-r from-[#00E5FF] via-[#FFD600] to-[#E91E63] 
          text-black rounded-2xl
          hover:shadow-2xl hover:shadow-[#00E5FF]/20
          transition-all duration-500 ease-out
          hover:scale-[1.02] active:scale-[0.98]
          disabled:opacity-50 disabled:cursor-not-allowed
          group relative overflow-hidden
          ${className}
        `}
        onClick={onClick}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#00E5FF] via-[#FFD600] via-[#FF9800] to-[#E91E63] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <span className="relative z-10 flex items-center justify-center">{children}</span>
      </button>
    );
  };

  const FloatingCard = ({ children, className = "", delay = 0 }: FloatingCardProps) => (
    <div 
      className={`
        transform transition-all duration-700 ease-out
        hover:scale-[1.02] hover:-translate-y-1
        ${className}
      `}
      style={{ 
        animationDelay: `${delay}ms`,
        transform: `translateY(${Math.sin(Date.now() * 0.001 + delay) * 2}px)`
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
      content: "YeetBitz has fundamentally changed how I approach course creation. The AI-generated mind maps help students visualize complex algorithms and data structures in ways I never thought possible. What used to take me hours of manual work now happens in minutes, and the quality is exceptional.",
      avatar: "SC",
      rating: 5,
      highlight: "Saves 15 hours per week"
    },
    {
      name: "Michael Rodriguez",
      role: "Learning & Development Manager",
      institution: "TechCorp Solutions",
      content: "The impact on our corporate training has been remarkable. Our completion rates increased by 78%, and employee engagement scores are at an all-time high. The mind mapping feature makes complex technical concepts accessible to everyone on our team.",
      avatar: "MR",
      rating: 5,
      highlight: "78% completion rate increase"
    },
    {
      name: "Emma Thompson",
      role: "High School Biology Teacher",
      institution: "Lincoln Academy",
      content: "My students actually get excited about studying now. The interactive mind maps turn dry textbook content into engaging visual experiences. Test scores have improved dramatically, and students retain information much longer than before.",
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
      answer: "Our advanced AI uses natural language processing and machine learning to analyze your documents. It identifies key concepts, extracts hierarchical relationships, and understands context to create structured learning materials. The process involves text extraction, semantic analysis, concept mapping, and intelligent content generation - all happening in seconds."
    },
    {
      question: "What file formats and sizes are supported?",
      answer: "YeetBitz supports PDF, DOCX, and TXT files up to 50MB each. Our AI can process everything from simple notes to comprehensive textbooks, research papers, and technical documentation. We handle multi-language content and maintain formatting integrity throughout the processing pipeline."
    },
    {
      question: "Can I customize and edit the generated mind maps?",
      answer: "Absolutely! While our AI creates the initial structure, you have complete control over customization. Edit node content, adjust hierarchies, change colors and layouts, add multimedia elements, and collaborate with others in real-time. You can also regenerate specific branches or sections for different perspectives."
    },
    {
      question: "How scalable is the platform for large institutions?",
      answer: "YeetBitz is built for scale. Our Enterprise plan supports unlimited students and documents, offers dedicated infrastructure, API access for custom integrations, and includes comprehensive admin tools for user management, usage analytics, and institutional reporting."
    },
    {
      question: "What security measures protect my data?",
      answer: "Security is paramount. We use enterprise-grade AES-256 encryption, secure cloud infrastructure with SOC 2 compliance, regular security audits, and strict data privacy controls. We comply with FERPA, GDPR, and other educational data protection regulations. Your data is never used to train our AI models."
    },
    {
      question: "Can YeetBitz integrate with existing LMS platforms?",
      answer: "Yes! YeetBitz offers seamless integrations with popular LMS platforms including Canvas, Blackboard, Moodle, and Google Classroom. We provide API access, SSO support, and export capabilities that work with virtually any educational technology stack."
    }
  ];

  const stats = [
    { number: "50,000+", label: "Documents Processed", icon: BookOpen, suffix: "this month" },
    { number: "125,000+", label: "Active Students", icon: Users, suffix: "learning daily" },
    { number: "98%", label: "Satisfaction Rate", icon: Award, suffix: "from educators" },
    { number: "5x", label: "Faster Creation", icon: Zap, suffix: "vs traditional methods" }
  ];

  return (
    <main>
      {/* Floating gradient orbs for ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-[#00E5FF]/20 to-[#FFD600]/20 rounded-full blur-3xl"
          style={{
            left: mousePosition.x * 0.02 + 'px',
            top: mousePosition.y * 0.02 + 'px',
            transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.05}px)`
          }}
        />
        <div 
          className="absolute w-64 h-64 bg-gradient-to-r from-[#E91E63]/20 to-[#9C27B0]/20 rounded-full blur-3xl right-0"
          style={{
            right: mousePosition.x * 0.01 + 'px',
            top: mousePosition.y * 0.03 + 100 + 'px',
            transform: `translate(${-scrollY * 0.08}px, ${scrollY * 0.03}px)`
          }}
        />
      </div>

      {/* Header */}
      <header className={`
        fixed top-0 w-full z-50 transition-all duration-700 ease-out
        ${scrollY > 50 
          ? 'bg-white/80 backdrop-blur-2xl shadow-lg shadow-black/5 border-b border-gray-200/50' 
          : 'bg-transparent'
        }
      `}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3 group cursor-pointer">
              <Image
                src="/logo.png"
                alt="YeetBitz Logo"
                width={48}
                height={48}
                className="group-hover:rotate-12 transition-transform duration-500"
              />
              <span className="text-2xl font-bold text-gray-900 tracking-tight">YeetBitz</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {['Features', 'Testimonials', 'Pricing', 'FAQ'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition-all duration-300 rounded-xl hover:bg-gray-100/50"
                >
                  {item}
                </a>
              ))}
              <div className="ml-4 flex items-center space-x-3">
                <GradientButton variant="ghost" size="small">
                  Sign In
                </GradientButton>
                <GradientButton size="small">
                  Get Started Free
                </GradientButton>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-xl hover:bg-gray-100/50 transition-colors duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`
            md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-2xl shadow-xl border-b border-gray-200/50
            transition-all duration-500 ease-out transform
            ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
          `}>
            <nav className="px-6 py-6 space-y-1">
              {['Features', 'Testimonials', 'Pricing', 'FAQ'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block px-4 py-3 text-gray-600 hover:text-gray-900 font-medium rounded-xl hover:bg-gray-100/50 transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <div className="pt-4 space-y-3">
                <GradientButton variant="ghost" className="w-full">
                  Sign In
                </GradientButton>
                <GradientButton className="w-full">
                  Get Started Free
                </GradientButton>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-24 px-6 lg:px-8 min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/5 via-[#FFD600]/5 to-[#E91E63]/5" />
        
        <div className="relative max-w-7xl mx-auto w-full">
          <div className="text-center">
            {/* Floating badge */}
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg mb-8 group hover:shadow-xl transition-all duration-500">
              <Sparkles className="text-[#00E5FF] mr-2 group-hover:rotate-12 transition-transform duration-500" size={16} />
              <span className="text-sm font-semibold text-gray-800">Trusted by 10,000+ educators worldwide</span>
              <ArrowUpRight className="ml-2 text-gray-400 group-hover:text-[#00E5FF] transition-colors duration-300" size={14} />
            </div>
            
            <div className="mb-8">
              <Image
                src="/logo.png"
                alt="YeetBitz Logo"
                width={128}
                height={128}
                className="opacity-90 animated-logo-hero mx-auto"
              />
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-8 leading-[0.9] tracking-tight">
              Transform Documents into
              <span className="block bg-gradient-to-r from-[#00E5FF] via-[#FFD600] via-[#FF9800] to-[#E91E63] bg-clip-text text-transparent animate-gradient-x">
                Interactive Learning
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
              Upload any document and watch our advanced AI instantly create mind maps, generate assessments, and build comprehensive learning experiences. 
              <span className="text-gray-900 font-semibold"> Perfect for educators, trainers, and learners everywhere.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <GradientButton size="xl" className="w-full sm:w-auto shadow-2xl">
                Start Creating for Free 
                <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform duration-300" size={24} />
              </GradientButton>
              <GradientButton variant="secondary" size="xl" className="w-full sm:w-auto group">
                <Play className="mr-3 group-hover:scale-110 transition-transform duration-300" size={20} /> 
                Watch Demo
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full ml-3">2 min</span>
              </GradientButton>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <FloatingCard key={index} delay={index * 100}>
                  <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-700 hover:bg-white/80 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#00E5FF]/20 to-[#E91E63]/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className="text-[#00E5FF]" size={24} />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2 tabular-nums">{stat.number}</div>
                    <div className="text-gray-600 font-medium text-sm leading-tight">{stat.label}</div>
                    <div className="text-gray-400 text-xs mt-1">{stat.suffix}</div>
                  </div>
                </FloatingCard>
              ))}
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <MousePointer2 className="text-gray-400" size={24} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6 lg:px-8 bg-gray-50/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24" id="features-header" data-animate>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-8">
              <div className="w-2 h-2 bg-[#00E5FF] rounded-full mr-3 animate-pulse" />
              <span className="text-sm font-semibold text-gray-700">Powerful AI Features</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
              Everything you need for
              <span className="block bg-gradient-to-r from-[#00E5FF] to-[#E91E63] bg-clip-text text-transparent">
                modern education
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our comprehensive AI-powered platform transforms how you create, manage, and deliver educational content with unprecedented ease and effectiveness.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <FloatingCard key={index} delay={index * 150}>
                <div 
                  className={`
                    bg-white rounded-3xl p-8 shadow-lg border border-gray-200/50
                    hover:shadow-2xl transition-all duration-700 cursor-pointer group
                    ${hoveredFeature === index ? 'scale-105 shadow-2xl' : ''}
                  `}
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <div className={`
                    w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl 
                    flex items-center justify-center mb-6 shadow-lg
                    group-hover:scale-110 group-hover:rotate-3 transition-all duration-500
                  `}>
                    <feature.icon className="text-white" size={32} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-[#00E5FF] transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {feature.description}
                  </p>
                </div>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-32 px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your content in three beautifully simple steps
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-16 relative">
            {/* Connection lines */}
            <div className="hidden lg:block absolute top-1/2 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-[#00E5FF] to-[#FFD600] transform -translate-y-1/2" />
            <div className="hidden lg:block absolute top-1/2 right-1/3 w-1/3 h-0.5 bg-gradient-to-r from-[#FFD600] to-[#E91E63] transform -translate-y-1/2" />
            
            {[
              {
                step: "01",
                title: "Upload Document",
                description: "Simply drag and drop your PDF, DOCX, or TXT file. Our AI instantly begins analyzing your content with advanced natural language processing.",
                gradient: "from-[#00E5FF] to-[#FFD600]",
                icon: Upload
              },
              {
                step: "02", 
                title: "AI Processing",
                description: "Our advanced AI extracts key concepts, identifies relationships, creates hierarchical structures, and generates comprehensive learning materials.",
                gradient: "from-[#FFD600] to-[#FF9800]",
                icon: Brain
              },
              {
                step: "03",
                title: "Engage & Learn",
                description: "Access beautiful interactive mind maps, take AI-generated assessments, and track learning progress with detailed analytics and insights.",
                gradient: "from-[#FF9800] to-[#E91E63]",
                icon: Target
              }
            ].map((step, index) => (
              <FloatingCard key={index} delay={index * 200}>
                <div className="text-center group">
                  <div className={`
                    relative w-24 h-24 bg-gradient-to-br ${step.gradient} rounded-full 
                    flex items-center justify-center mx-auto mb-8 shadow-xl
                    group-hover:scale-110 group-hover:rotate-3 transition-all duration-500
                  `}>
                    {<step.icon className="text-white" size={32} />}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-xs font-bold text-gray-900">{step.step}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-[#00E5FF] transition-colors duration-300">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {step.description}
                  </p>
                </div>
              </FloatingCard>
            ))}
          </div>
          
          <div className="text-center">
            <GradientButton size="large" className="shadow-xl">
              Learn More About YeetBitz
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
            </GradientButton>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-32 px-6 lg:px-8 bg-gray-50/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-8">
              <Quote className="text-[#00E5FF] mr-2" size={16} />
              <span className="text-sm font-semibold text-gray-700">Customer Stories</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
              Loved by educators
              <span className="block bg-gradient-to-r from-[#00E5FF] to-[#E91E63] bg-clip-text text-transparent">
                worldwide
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of educators who are transforming their teaching with YeetBitz
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <FloatingCard key={index} delay={index * 100}>
                <div className={`
                  bg-white rounded-3xl p-8 shadow-lg border border-gray-200/50 h-full
                  hover:shadow-2xl transition-all duration-700 group cursor-pointer
                  ${activeTestimonial === index ? 'ring-2 ring-[#00E5FF]/20 shadow-2xl' : ''}
                `}>
                  {/* Rating stars */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex text-yellow-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} fill="currentColor" size={18} className="drop-shadow-sm" />
                      ))}
                    </div>
                    <div className="text-xs font-semibold text-[#00E5FF] bg-[#00E5FF]/10 px-3 py-1 rounded-full">
                      {testimonial.highlight}
                    </div>
                  </div>
                  
                  <Quote className="text-[#00E5FF]/20 mb-4" size={32} />
                  
                  <p className="text-gray-700 mb-8 leading-relaxed text-lg italic font-medium group-hover:text-gray-800 transition-colors duration-300">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center">
                    <div className={`
                      w-14 h-14 bg-gradient-to-br from-[#00E5FF] to-[#E91E63] rounded-2xl 
                      flex items-center justify-center mr-4 shadow-lg
                      group-hover:scale-110 transition-transform duration-300
                    `}>
                      <span className="text-white font-bold text-lg">{testimonial.avatar}</span>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                      <div className="text-gray-600 font-medium">{testimonial.role}</div>
                      <div className="text-[#00E5FF] text-sm font-semibold">{testimonial.institution}</div>
                    </div>
                  </div>
                </div>
              </FloatingCard>
            ))}
          </div>

          {/* Testimonial navigation */}
          <div className="flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`
                  w-3 h-3 rounded-full transition-all duration-300
                  ${activeTestimonial === index 
                    ? 'bg-[#00E5FF] scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                  }
                `}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect plan for your educational needs. All plans include our core AI features.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <FloatingCard key={index} delay={index * 100}>
                <div className={`
                  relative bg-white rounded-3xl p-8 shadow-lg border border-gray-200/50 h-full
                  hover:shadow-2xl transition-all duration-700 group
                  ${plan.popular ? 'ring-2 ring-[#00E5FF]/20 scale-105' : ''}
                `}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-[#00E5FF] to-[#E91E63] text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                        Most Popular
                      </div>
                    </div>
                  )}
                  
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                      {plan.price !== 'Custom' && plan.price !== 'Free' && (
                        <span className="text-gray-600 ml-2">/month</span>
                      )}
                    </div>
                    <p className="text-gray-600">{plan.description}</p>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center">
                        <Check className="text-[#00E5FF] mr-3 flex-shrink-0" size={20} />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                    {plan.notIncluded.map((feature, idx) => (
                      <div key={idx} className="flex items-center opacity-50">
                        <Minus className="text-gray-400 mr-3 flex-shrink-0" size={20} />
                        <span className="text-gray-500">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <GradientButton 
                    className="w-full" 
                    variant={plan.popular ? "primary" : "secondary"}
                  >
                    {plan.cta}
                  </GradientButton>
                </div>
              </FloatingCard>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <p className="text-gray-600 mb-4">All plans include 24/7 support and a 30-day money-back guarantee</p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <Shield className="mr-2" size={16} />
                Enterprise Security
              </div>
              <div className="flex items-center">
                <Globe className="mr-2" size={16} />
                Global CDN
              </div>
              <div className="flex items-center">
                <Headphones className="mr-2" size={16} />
                24/7 Support
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 lg:px-8 bg-gradient-to-br from-[#00E5FF]/10 via-[#FFD600]/10 to-[#E91E63]/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/5 via-transparent to-[#E91E63]/5" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <Image
            src="/logo.png"
            alt="YeetBitz Logo"
            width={160}
            height={160}
            className="mb-12 opacity-80 animated-logo-cta mx-auto"
          />
          
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
            Ready to transform your teaching?
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-16 leading-relaxed font-medium max-w-3xl mx-auto">
            Join thousands of educators who are already creating better learning experiences. 
            <span className="text-gray-900 font-semibold"> Start your free trial today.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <GradientButton size="xl" className="shadow-2xl">
              Start Free Trial 
              <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform duration-300" size={24} />
            </GradientButton>
            <GradientButton variant="secondary" size="xl" className="group">
              Schedule Demo
              <ArrowUpRight className="ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" size={20} />
            </GradientButton>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { icon: CheckCircle, text: "No credit card required" },
              { icon: Shield, text: "Enterprise-grade security" },
              { icon: Headphones, text: "24/7 customer support" }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-center space-x-2 text-gray-600">
                <item.icon className="text-[#00E5FF]" size={20} />
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 px-6 lg:px-8 bg-gray-50/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
              Frequently asked questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about YeetBitz
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <FloatingCard key={index} delay={index * 50}>
                <details className="group bg-white rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-500">
                  <summary className="flex items-center justify-between p-8 font-bold text-lg text-gray-900 cursor-pointer list-none group-hover:text-[#00E5FF] transition-colors duration-300">
                    <span className="pr-4">{faq.question}</span>
                    <ChevronDown className="flex-shrink-0 transform group-open:rotate-180 transition-transform duration-300 text-[#00E5FF]" size={24} />
                  </summary>
                  <div className="px-8 pb-8">
                    <p className="text-gray-600 leading-relaxed text-lg">{faq.answer}</p>
                  </div>
                </details>
              </FloatingCard>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <p className="text-gray-600 mb-6">Still have questions?</p>
            <GradientButton variant="secondary">
              Contact Support
              <ArrowUpRight className="ml-2" size={16} />
            </GradientButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-24 px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-8">
                <Image
                  src="/logo.png"
                  alt="YeetBitz Logo"
                  width={40}
                  height={40}
                />
                <span className="text-2xl font-bold tracking-tight">YeetBitz</span>
              </div>
              <p className="text-gray-300 mb-8 leading-relaxed text-lg max-w-md">
                Transforming education through AI-powered document processing and interactive learning experiences that inspire and engage students worldwide.
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: Shield, text: "Enterprise-grade security" },
                  { icon: Globe, text: "Available in 15+ languages" },
                  { icon: CheckCircle, text: "99.9% uptime guarantee" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 text-gray-400">
                    <item.icon size={18} className="text-[#00E5FF]" />
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Columns */}
            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "API Documentation", "Integrations", "Security", "Changelog"]
              },
              {
                title: "Resources", 
                links: ["Help Center", "Blog", "Case Studies", "Webinars", "Community", "Status"]
              },
              {
                title: "Company",
                links: ["About Us", "Careers", "Press Kit", "Partners", "Contact", "Privacy Policy"]
              }
            ].map((column, index) => (
              <div key={index}>
                <h3 className="font-bold text-lg mb-6 text-white">{column.title}</h3>
                <ul className="space-y-4">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a 
                        href="#" 
                        className="text-gray-300 hover:text-white transition-colors duration-300 font-medium hover:translate-x-1 transform inline-block"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 mt-16 pt-12">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="text-gray-400 text-center md:text-left mb-4 md:mb-0">
                © 2025 YeetBitz. All rights reserved. Built with ❤️ for educators worldwide.
              </p>
              
              <div className="flex items-center space-x-6">
                <span className="text-gray-500 text-sm">Follow us</span>
                {['Twitter', 'LinkedIn', 'GitHub'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-gray-400 hover:text-[#00E5FF] transition-colors duration-300 font-medium"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-gradient-x {
          animation: gradient-x 8s ease infinite;
        }
        
        .animated-logo-hero {
          animation: spin-slow 8s linear infinite;
        }

        .animated-logo-cta {
          animation: spin-slow 8s linear infinite;
        }
        
        details[open] summary {
          margin-bottom: 1rem;
        }
        
        .group:hover .group-hover\\:translate-x-1 {
          transform: translateX(0.25rem);
        }
        
        .group:hover .group-hover\\:scale-110 {
          transform: scale(1.1);
        }
        
        .group:hover .group-hover\\:rotate-3 {
          transform: rotate(3deg);
        }
        
        .group:hover .group-hover\\:rotate-12 {
          transform: rotate(12deg);
        }
        
        .tabular-nums {
          font-variant-numeric: tabular-nums;
        }
        
        .backdrop-blur-2xl {
          backdrop-filter: blur(40px);
        }
      `}</style>
    </main>
  );
};

export default YeetBitzLanding;
  