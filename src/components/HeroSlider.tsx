import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Phone, MessageSquare, ShieldCheck, Award, Zap } from "lucide-react";
import { phoneNumbers, whatsappNumbers, metadataDetails } from "../data";

interface Slide {
  id: number;
  badge: string;
  title: string;
  isMainBrand?: boolean;
  subtitle: string;
  description: string;
  primaryCtaText: string;
  primaryCtaUrl: string;
  secondaryCtaText: string;
  secondaryCtaUrl: string;
  bgGradient: string;
  imageUrl: string;
  extraBadge?: string;
}

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const slides: Slide[] = [
    {
  id: 0,
  badge: "🏠 Trusted Local Service",
  title: "SEPTIC CLEANING SERVICES IN HOSUR",
  subtitle: "Hosur’s Most Trusted Name in Clean",
  description:
    "Home septic tank cleaning, drainage blockage removal, and toilet overflow solutions with modern vacuum technology. Hygienic, fast & reliable service for all residential areas in Hosur.",
  primaryCtaText: "Request Home Service",
  primaryCtaUrl: "#",
  secondaryCtaText: "Get Quick Support",
  secondaryCtaUrl: "#",
  bgGradient: "from-blue-600 via-sky-700 to-indigo-950",
  imageUrl:
    "/src/assets/images/Neha_Shri_banner-1.jpg"
},
    {
  id: 1,
  badge: "🧼 Hygienic Home Care",
  title: "RESIDENTIAL SEPTIC CLEANING IN HOSUR",
  subtitle: "Your Solution for a Hygienic Home",
  description:
    "Safe & professional septic tank cleaning service for apartments and individual houses. We ensure odor-free, bacteria-free and fully cleaned drainage systems.",
  primaryCtaText: "Book Home Cleaning",
  primaryCtaUrl: "#",
  secondaryCtaText: "Enquire Now",
  secondaryCtaUrl: "#",
  bgGradient: "from-sky-500 via-blue-600 to-slate-900",
  imageUrl:
    "/src/assets/images/Neha_Shri_banner-2.jpg"
},
    {
  id: 2,
  badge: "🚨 Commercial Grade Service",
  title: "COMMERCIAL SEPTIC CLEANING",
  subtitle: "Fast Response. Flawless Service",
  description:
    "Industrial buildings, shops, restaurants & commercial complexes for large-scale septic cleaning and drainage clearance. Quick response with high-capacity equipment.",
  primaryCtaText: "Commercial Booking",
  primaryCtaUrl: "#",
  secondaryCtaText: "Get Estimate",
  secondaryCtaUrl: "#",
  bgGradient: "from-sky-500 via-blue-600 to-slate-900",
  imageUrl:
    "/src/assets/images/Neha_Shri_banner-3.jpg"
},
    
  ];

  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const handlePrev = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Autoplay function
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 1000000);
    return () => clearInterval(interval);
  }, [isHovered, handleNext]);

  return (
    <div 
      className="relative w-full overflow-hidden bg-brand-dark min-h-[580px] md:min-h-[640px] xl:min-h-[680px] flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      id="hero-slider-container"
    >
      {/* Background Graphic Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Decorative Wave contour like the bottom curve of the business card */}
      <div className="absolute bottom-0 left-0 right-0 z-25 pointer-events-none">
        <svg 
          viewBox="0 0 1440 120" 
          fill="none" 
          className="w-full h-auto text-[#fafbfc]" 
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path 
            d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,120L1320,120C1200,120,960,120,720,120C480,120,240,120,120,120L0,120Z" 
            fill="currentColor"
          />
        </svg>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].bgGradient} flex items-center pt-8 md:pt-0`}
        >
          {/* Visual gradient glowing orb decoration - simulates the business card's vibrant color layout */}
          <div className="absolute -left-1/4 top-1/2 -translate-y-1/2 w-96 h-96 bg-brand-blue-500/20 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
          <div className="absolute right-10 top-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Slider Left Text Content */}
              <div className="lg:col-span-7 space-y-6 text-left">
                
                {/* Devotional Invoke Badge or Standard Technology Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-wide shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-yellow-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-yellow-500"></span>
                  </span>
                  <span>{slides[currentSlide].badge}</span>
                </div>

                {/* Main Heading Text */}
                {slides[currentSlide].isMainBrand ? (
                  <div>
                    {/* Sri blessing and custom font style matching Neha Shri logo shape */}
                    <div className="flex items-center gap-4 mb-1">
                      {slides[currentSlide].extraBadge && (
                        <span className="px-3 py-0.5 rounded bg-brand-yellow-500 font-mono text-xs font-bold text-slate-900 shadow-sm uppercase tracking-wide">
                          {slides[currentSlide].extraBadge}
                        </span>
                      )}
                    </div>
                    <h1 className="text-5xl sm:text-7xl md:text-8xl font-display font-extrabold tracking-tight mb-2 nehashri-title uppercase leading-none select-none">
                      {slides[currentSlide].title}
                    </h1>
                    <div className="inline-block bg-[#004dc2]/90 border-2 border-white/80 rounded-lg px-4 py-1.5 shadow-md">
                      <h2 className="text-xl sm:text-2xl font-bold tracking-wider text-white">
                        {slides[currentSlide].subtitle}
                      </h2>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-white tracking-tight leading-none mb-2">
                      {slides[currentSlide].title}
                    </h1>
                    <h2 className="text-xl sm:text-2xl font-bold text-brand-yellow-500">
                      {slides[currentSlide].subtitle}
                    </h2>
                  </div>
                )}

                {/* Sliding tagline */}
                <p className="text-sm sm:text-base md:text-lg text-slate-100/90 leading-relaxed font-sans max-w-2xl">
                  {slides[currentSlide].description}
                </p>

                {/* Call to Actions with exact matching layout */}
                {/* <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
                  <a
                    href={slides[currentSlide].primaryCtaUrl}
                    className="glow-blue px-7 py-3.5 bg-brand-yellow-500 hover:bg-brand-yellow-600 text-slate-900 font-bold rounded-xl text-sm md:text-base tracking-tight inline-flex items-center justify-center space-x-2.5 transition transform hover:scale-103 active:scale-97 cursor-pointer"
                  >
                    <Phone className="w-4 h-4 fill-current text-slate-900 animate-bounce" />
                    <span>{slides[currentSlide].primaryCtaText}</span>
                  </a>
                  
                  <a
                    href={slides[currentSlide].secondaryCtaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glow-green px-7 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-sm md:text-base tracking-tight inline-flex items-center justify-center space-x-2.5 transition transform hover:scale-103 active:scale-97 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-white fill-current" />
                    <span>{slides[currentSlide].secondaryCtaText}</span>
                  </a>
                </div> */}

                {/* Phone stats or reassurance */}
                <div className="flex flex-wrap gap-4 text-xs text-slate-200/90 pt-3 font-mono">
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>No Scavenging / 100% Mechanized</span>
                  </div>
                  <div className="hidden sm:inline text-white/30">&bull;</div>
                  <div className="flex items-center gap-1">
                    <Zap className="w-4 h-4 text-brand-yellow-500 animate-pulse" />
                    <span>Cleaned By Compressor Motor</span>
                  </div>
                </div>

              </div>

              {/* Slider Right Image and interactive floating card */}
              <div className="hidden lg:col-span-5 lg:block relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/25 aspect-[4/3] bg-slate-800">
                  <img
                    src={slides[currentSlide].imageUrl}
                    alt={slides[currentSlide].title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-slate-950/10" />
                </div>

                {/* Absolute Floating Badge to display our quick call numbers */}
                <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-[#EF4444] to-[#f43f5e] text-white py-3 px-5 rounded-xl border border-white/20 shadow-xl flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white">
                    <Phone className="w-4.5 h-4.5 text-white fill-current animate-pulse" />
                  </div>
                  <div>
                    <span className="block text-[8px] text-white/80 uppercase tracking-widest font-mono font-bold leading-none">
                      Active Dispatch Lines
                    </span>
                    <span className="text-xs sm:text-sm font-bold tracking-tight text-white font-mono">
                      {phoneNumbers.primary}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Manual Left/Right navigation triggers (visible on hover or focus) */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition backdrop-blur-xs cursor-pointer select-none"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition backdrop-blur-xs cursor-pointer select-none"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Bottom slide bullet indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {slides.map((slide, slotIdx) => (
          <button
            key={slide.id}
            onClick={() => setCurrentSlide(slotIdx)}
            className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              currentSlide === slotIdx ? "w-8 bg-brand-yellow-500" : "w-2.5 bg-white/40"
            }`}
            aria-label={`Go to slide ${slotIdx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
