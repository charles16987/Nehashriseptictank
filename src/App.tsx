import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { motion } from "motion/react";
import abouts from "../src/assets/images/about-us_neha_shri.jpg";
import { 
  Phone, 
  MessageSquare, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Menu, 
  X, 
  Compass, 
  Copy, 
  Workflow, 
  Flame, 
  Award, 
  BookmarkCheck, 
  Star 
} from "lucide-react";

import { 
  servicesData, 
  whyChooseUsData, 
  phoneNumbers, 
  whatsappNumbers, 
  serviceAreas,
  getIcon
} from "./data";

import ThreeWaterBackground from "./components/ThreeWaterBackground";
import ServiceCard from "./components/ServiceCard";
import ImageGallery from "./components/ImageGallery";
import FaqSection from "./components/FaqSection";
import HeroSlider from "./components/HeroSlider";
import SepticTankLoader from "./components/SepticTankLoader";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [activeSegment, setActiveSegment] = useState("#home");

  // GSAP Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero elements transition
      gsap.fromTo(
        ".gsap-hero-badge",
        { opacity: 0, scale: 0.85, y: -20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(2)" }
      );
      
      gsap.fromTo(
        ".gsap-hero-title",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.1, delay: 0.15, ease: "power4.out" }
      );

      gsap.fromTo(
        ".gsap-hero-desc",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" }
      );

      gsap.fromTo(
        ".gsap-hero-cta",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.8, delay: 0.45, ease: "back.out(1.5)" }
      );

      gsap.fromTo(
        ".gsap-hero-stat",
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, delay: 0.6, ease: "power2.out" }
      );
    });

    // Handle scroll spy to highlight nav active item
    const handleScroll = () => {
      const sections = ["home", "about", "services", "why-choose-us", "gallery", "faq", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSegment(`#${section}`);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      ctx.revert();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Quick Copy Phone Action
  const copyToClipboard = () => {
    navigator.clipboard.writeText(phoneNumbers.primary);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };
useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SepticTankLoader />;
  }
  return (
    <div className="relative min-h-screen selection:bg-brand-blue-500 selection:text-white">

      {/* Floating 24/7 Phone Quick-access Assist Card representing ultimate ease */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
  {/* WhatsApp Button */}
  <div className="relative group">
    <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-black text-white text-sm px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
      WhatsApp
    </span>

    <a
      href={`https://wa.me/91${whatsappNumbers.primary}?text=Hi%20Neha%20Shri%20Services,%20I'd%20like%20to%20book%20a%20septic%20tank%20cleaning.`}
      target="_blank"
      rel="noopener noreferrer"
      className="glow-green flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full transition-transform hover:scale-110 active:scale-95 duration-300 shadow-lg"
    >
      <MessageSquare className="w-6 h-6 fill-current" />
    </a>
  </div>

  {/* Call Button */}
  <div className="relative group">
    <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-black text-white text-sm px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
      Call Now
    </span>

    <a
      href={`tel:${phoneNumbers.primary}`}
      className="glow-blue flex items-center justify-center w-14 h-14 bg-brand-blue-600 hover:bg-brand-blue-700 text-white rounded-full transition-transform hover:scale-110 active:scale-95 duration-300 shadow-lg"
    >
      <Phone className="w-6 h-6 animate-pulse" />
    </a>
  </div>
</div>

      {/* DEVOTIONAL & OWNER TOP RIBBON */}
      <div className="bg-gradient-to-r from-blue-700 via-brand-dark to-blue-800 text-xs text-white py-2 px-4 shadow-xs border-b border-white/10 select-none">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center font-medium">
          <span className="text-brand-yellow-500 font-mono tracking-wider font-semibold">
            {/* 👤 Prop: Palani.M */}
          </span>
          <span className="text-yellow-250 font-semibold drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
            🙏 Sri Venkatachallapathi Thunai
          </span>
          <a href={`tel:${phoneNumbers.primary}`} className="hover:underline tracking-tight text-white font-semibold font-mono">
            {/* 📞 CELL: 97873 58005 / 93611 56233 */}
          </a>
        </div>
      </div>

      {/* HEADER NAVIGATION BAR */}
      <header className="sticky top-0 left-0 right-0 z-40 w-full glass-panel border-b border-white/20 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Company Brand Logo Identity */}
          <a href="#home" className="flex items-center space-x-2.5 cursor-pointer group">
            {/* <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-blue-600 to-brand-green-500 flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:rotate-6 transition-all duration-300">
              NS
            </div> */}
            <div className="flex flex-col">
              <span className="text-brand-dark font-display font-bold text-lg tracking-tight leading-none">
                Neha Shri
              </span>
              <span className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase">
                Septic Tank Cleaning
              </span>
            </div>
          </a>

          {/* Desktop Link Items */}
          <nav className="hidden md:flex items-center space-x-1">
            {[
              { id: "home", label: "Home" },
              { id: "about", label: "About" },
              { id: "services", label: "Our Services" },
              { id: "why-choose-us", label: "Why Us" },
              { id: "gallery", label: "Gallery" },
              { id: "faq", label: "FAQs" },
              { id: "contact", label: "Contact Us" },
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`px-4 py-2 rounded-lg text-sm font-semibold tracking-tight transition-all duration-200 cursor-pointer ${
                  activeSegment === `#${link.id}`
                    ? "bg-brand-blue-50/80 text-brand-blue-600"
                    : "text-slate-600 hover:text-brand-blue-600 hover:bg-slate-50/50"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Call-to-Action Contact trigger */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="text-right">
              <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none">
                Emergency 24x7 Support
              </span>
              <a
                href={`tel:${phoneNumbers.primary}`}
                className="text-brand-dark hover:text-brand-blue-600 font-display font-medium text-sm transition-colors"
              >
                {phoneNumbers.primary}
              </a>
            </div>
            
            <a
              href={`tel:${phoneNumbers.primary}`}
              className="glow-blue px-5 py-2.5 bg-brand-blue-600 hover:bg-brand-blue-700 text-white rounded-xl text-sm font-bold tracking-tight inline-flex items-center space-x-2 transition cursor-pointer active:scale-95 justify-center"
            >
              <Phone className="w-4 h-4 fill-current" />
              <span>Call Now</span>
            </a>
          </div>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-brand-dark rounded-xl transition cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Slide-down navigation drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-panel border-t border-slate-100/55 shadow-2xl p-4 space-y-2 text-center">
            {[
              { id: "home", label: "Home" },
              { id: "about", label: "About" },
              { id: "services", label: "Our Services" },
              { id: "why-choose-us", label: "Why Us" },
              { id: "gallery", label: "Gallery" },
              { id: "faq", label: "FAQs" },
              { id: "contact", label: "Contact Us" },
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-3 rounded-lg text-base font-semibold tracking-tight transition cursor-pointer ${
                  activeSegment === `#${link.id}`
                    ? "bg-brand-blue-500 text-white shadow-lg"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </a>
            ))}
            
            <div className="pt-4 border-t border-slate-150 flex flex-col gap-2">
              <a
                href={`tel:${phoneNumbers.primary}`}
                className="w-full py-3.5 bg-brand-blue-600 text-white rounded-xl text-sm font-bold tracking-tight inline-flex items-center justify-center space-x-2 shadow-md glow-blue"
              >
                <Phone className="w-4 h-4 text-white" />
                <span>Call Hotline Now</span>
              </a>
              <a
                href={`https://wa.me/91${whatsappNumbers.primary}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-brand-green-600 text-white rounded-xl text-sm font-bold tracking-tight inline-flex items-center justify-center space-x-2 shadow-md glow-green"
              >
                <MessageSquare className="w-4 h-4 fill-current text-white" />
                <span>Book via WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* MAIN BODY WRAPPER */}
      <main>
        
        {/* 1. HERO SECTION WITH ROYAL DYNAMIC SLIDER */}
        <section id="home" className="relative">
          <HeroSlider />
        </section>

        {/* 2. ABOUT US SECTION - TRUST BUILDING */}
        <section id="about" className="py-24 bg-white/40 border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              
              {/* Left Column visually rich image mockup */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue-500/10 to-brand-green-500/10 rounded-3xl blur-2xl transform rotate-2 animate-pulse-slow" />
                <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-50">
                  <img
                    src={abouts}
                    alt="Professional team using high pressure suction trucks for hygienic water treatments"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  
                  {/* Floating active performance card */}
                  <div className="absolute bottom-6 left-6 right-6 glass-panel rounded-2xl p-4 border border-white flex items-center gap-4 shadow-lg">
                    <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                      <Star className="w-6 h-6 fill-current text-white" />
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none">
                        Top Rated on Google
                      </span>
                      <span className="text-sm font-display font-medium text-brand-dark flex items-center gap-1.5 mt-1">
                        <strong className="font-extrabold text-[#d60000]">4.9 / 5.0 Rating</strong>
                        <span className="text-xs text-slate-500 font-medium">(1500 Satisfied Customer Reviews)</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column written professional copy */}
              <div>
                <span className="text-xs text-brand-blue-600 font-extrabold uppercase tracking-widest block mb-3">
                  Safety, Trust & Speed
                </span>
                
                <h2 className="text-3xl sm:text-4xl font-display font-medium text-slate-900 tracking-tight leading-tight mb-6">
                  Keeping Shoolagiri, Hosur & Surrounding Regions Clean & Odor-Free Every Day
                </h2>

                <p className="text-slate-600 text-base leading-relaxed mb-6">
                  Maintaining a clean and healthy environment is more crucial than ever. <strong>Neha Shri Septic Tank Cleaning</strong> stands as a trusted and reliable name in the cleaning and housekeeping industry. With a stellar <strong>4.9-star rating based on 15 reviews</strong> from highly satisfied clients, we are key sanitation partners across Hosur and Shoolagiri.
                </p>

                <p className="text-slate-600 text-base leading-relaxed mb-6">
                  <strong>Established in 2012</strong>, Neha Shri has years of experience providing top-notch solutions. Strategically situated right in Shoolagiri, it is easy and fast for clients to schedule services and get rapid emergency relief. We operate <strong>Open 24 Hours, Monday to Sunday</strong>.
                </p>

                <p className="text-slate-600 text-base leading-relaxed mb-8">
                  Our team of dedicated professionals is equipped with the latest high-capacity tools, compressor motors, and premium vacuum tankers. We strictly use <strong>eco-friendly cleaning products</strong> to guarantee the health, safety, and well-being of residents, business establishments, and surrounding soils.
                </p>

                {/* Grid checklist highlights */}
                {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Zero Contact Mechanical Pumping",
                    "Advanced Hydraulic Tanker Fleet",
                    "Certified Tank Sanitization Rinse",
                    "Full Area coverage validation",
                    "Polite, licensed field workers",
                    "Punctual arrival guaranteed",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2.5 text-slate-700">
                      <CheckCircle2 className="w-5 h-5 text-brand-green-500 shrink-0" />
                      <span className="text-sm font-semibold tracking-tight">{item}</span>
                    </div>
                  ))}
                </div> */}
              </div>

            </div>
          </div>
        </section>

        {/* 3. CORE SERVICES SECTION */}
        <section id="services" className="py-15 relative overflow-hidden bg-[#fafbfc]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header heading */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs text-brand-blue-600 font-extrabold uppercase tracking-widest block mb-3">
                Our Capabilities
              </span>
              
              <h2 className="text-3xl sm:text-4xl font-display font-medium text-slate-900 tracking-tight leading-tight mb-4">
                Full-Service Sanitation Engineering
              </h2>
              
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                Whether you need a quick home septic flush or massive industrial hazardous chemical pit clearance, our specialized vacuum fleet and operators handle every layout seamlessly.
              </p>
            </div>

            {/* Grid layout containing Service cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {servicesData.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>

          </div>
        </section>

        {/* 4. GALLERY COMPARISONS SECTION */}
        <section id="gallery" className="py-15 bg-white/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Overlap details header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs text-brand-blue-600 font-extrabold uppercase tracking-widest block mb-3">
                Visual Proof
              </span>
              
              <h2 className="text-3xl sm:text-4xl font-display font-medium text-slate-900 tracking-tight leading-tight mb-4">
                Our Work & Cleaning Outcomes
              </h2>
              
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                A sanitary visual says more than a thousand claims. Explore our operational trucks in action, high-pressure jetting runs, and real before/after comparisons!
              </p>
            </div>

            {/* Render interactive masonry visual grid */}
            <ImageGallery />

          </div>
        </section>

        {/* 5. WHY CHOOSE US - SEPARATION GRID */}
        <section id="why-choose-us" className="py-24 bg-slate-900 text-white relative overflow-hidden">
          
          {/* Subtle graphical background highlights matching dark look */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand-blue-600/10 blur-3xl -z-10 animate-pulse-slow" />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-brand-green-500/10 blur-3xl -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
              
              {/* Left Column banner */}
              <div className="lg:col-span-1">
                <span className="text-xs text-brand-blue-400 font-extrabold uppercase tracking-widest block mb-3">
                  Why Neha Shri Services?
                </span>
                
                <h2 className="text-3xl sm:text-4xl font-display font-medium text-white tracking-tight leading-tight mb-6">
                  Setting the Highest Standards in Sanitation
                </h2>
                
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
                  We don’t just suck sludge; we safeguard public hygiene. Our licensed procedures ensure that wastewater is cleared from your asset properly, locked in secure compartments, and treated sustainably.
                </p>

                {/* Safety badge trigger */}
                <div className="glass-panel-dark rounded-2xl p-5 border border-white/5 space-y-4">
                  <div className="flex items-center space-x-3 text-emerald-400">
                    <ShieldCheck className="w-6 h-6 shrink-0" />
                    <span className="font-display font-bold text-sm tracking-tight text-white">
                      100% Legal & Compliant
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    We strictly forbid manual scavenging and dispose of extracted chemical slurry at government-approved municipal treatment plants.
                  </p>
                </div>
              </div>

              {/* Right Columns: Grid Cards */}
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {whyChooseUsData.map((item) => {
                  const Icon = getIcon(item.iconName);
                  return (
                    <div
                      key={item.id}
                      className="glass-panel-dark p-6 rounded-2xl border border-white/5 shadow-md hover:background-slate-800 transition-all duration-300"
                    >
                      <div className="w-11 h-11 rounded-lg bg-white/10 text-brand-blue-400 flex items-center justify-center mb-4">
                        <Icon className="w-5 h-5 text-brand-blue-400" />
                      </div>
                      
                      <h3 className="text-lg font-display font-medium text-white tracking-tight mb-2">
                        {item.title}
                      </h3>
                      
                      <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        </section>

      

        {/* 7. REGIONAL SERVICE AREA GEOGRAPHY */}
        <section id="service-area" className="py-15 bg-white/40 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="glass-panel border border-slate-200 rounded-3xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-brand-green-500/5 blur-3xl pointer-events-none" />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
                <div>
                  <span className="text-xs text-brand-blue-600 font-extrabold uppercase tracking-widest block mb-3">
                    Our Coverage Zone
                  </span>
                  
                  <h2 className="text-3xl font-display font-medium text-slate-900 tracking-tight leading-tight mb-4">
                    Active Delivery Across Hosur & Surrounding Towns
                  </h2>
                  
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
                    We maintain emergency sanitation vehicles ready at multiple deployment posts. This enables us to guarantee high speed dispatch under 60 minutes to anyone inside active boundary parameters.
                  </p>

                  <div className="flex items-center space-x-3 text-emerald-600 font-bold text-xs bg-emerald-50 px-4 py-2.5 rounded-xl border border-emerald-100 w-fit">
                    <Compass className="w-4 h-4 text-emerald-600 animate-spin" style={{ animationDuration: "10s" }} />
                    <span>Real-time GPS monitored trucks on-route</span>
                  </div>
                </div>

                {/* Bento visual collection of regions */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {serviceAreas.map((area, idx) => (
                    <div
                      key={idx}
                      className="bg-white hover:bg-slate-50 border border-slate-100 rounded-xl p-4 text-center shadow-xs transition duration-200 transform hover:-translate-y-1 cursor-pointer"
                    >
                      <MapPin className="w-5 h-5 mx-auto text-brand-blue-600 mb-2" />
                      <span className="block text-sm font-bold text-slate-800 tracking-tight">
                        {area}
                      </span>
                      <span className="block text-[9px] text-brand-green-600 font-semibold uppercase mt-0.5">
                        Active 24/7
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 8. CONTACT FORM & DIRECT ACTIONS SECTION */}
        <section id="contact" className="py-15 bg-gradient-to-b from-[#fafbfc] to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
              
              {/* Direct triggers layout (Column 1) */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
                <div>
                  <span className="text-xs text-brand-blue-600 font-extrabold uppercase tracking-widest block mb-3">
                    Contact Us
                  </span>
                  
                  <h2 className="text-3xl sm:text-4xl font-display font-medium text-slate-900 tracking-tight leading-tight mb-4">
                    Book Your Slot in 30 Seconds
                  </h2>
                  
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
                    Our dispatch centers operate round-the-clock. Click the buttons below to call immediately or start a prompt text interaction on WhatsApp.
                  </p>
                </div>

                {/* Quick actions visual block */}
                <div className="space-y-4">
                  
                  {/* Glowing Call button */}
                  <div className="p-1 rounded-2xl bg-gradient-to-r from-brand-blue-500 to-emerald-500 shadow-md">
                    <a
                      href={`tel:${phoneNumbers.primary}`}
                      className="glow-blue w-full p-5 bg-slate-900 hover:bg-slate-950 text-white rounded-xl font-bold tracking-tight flex items-center justify-between transition cursor-pointer active:scale-95"
                    >
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-brand-blue-500 animate-pulse fill-current" />
                        <div className="text-left">
                          <span className="block text-[9px] text-slate-400 uppercase tracking-widest leading-none">
                            Emergency Hotline Primary
                          </span>
                          <span className="text-base sm:text-lg text-white font-display">
                            {phoneNumbers.primary}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs bg-brand-blue-500 text-slate-950 px-3 py-1.5 rounded-lg">
                        CALL NOW
                      </span>
                    </a>
                  </div>

                  {/* Secondary Call option */}
                  <a
                    href={`tel:${phoneNumbers.secondary}`}
                    className="w-full p-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-2xl font-bold tracking-tight flex items-center justify-between transition cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-slate-400" />
                      <div className="text-left">
                        <span className="block text-[9px] text-slate-400 uppercase tracking-widest leading-none">
                          Backup Dispatch Number
                        </span>
                        <span className="text-sm font-display text-slate-700">
                          {phoneNumbers.secondary}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400">CALL</span>
                  </a>

                  {/* WhatsApp Message link */}
                  <a
                    href={`https://wa.me/91${whatsappNumbers.primary}?text=Hi%20Neha%20Shri%20Services,%20I'd%20like%20to%20schedule%20a%20septic%20tank%20cleanup.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full p-4.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 rounded-2xl font-bold tracking-tight flex items-center justify-between transition cursor-pointer shadow-sm glow-green"
                  >
                    <div className="flex items-center space-x-3">
                      <MessageSquare className="w-5 h-5 text-emerald-600 fill-current" />
                      <div className="text-left">
                        <span className="block text-[9px] text-emerald-600 uppercase tracking-widest leading-none">
                          Chat Dispatch
                        </span>
                        <span className="text-sm font-display text-emerald-800">
                          WhatsApp Message Support
                        </span>
                      </div>
                    </div>
                    <span className="text-xs bg-emerald-600 text-white px-3 py-1.5 rounded-lg font-bold">
                      CHAT
                    </span>
                  </a>

                  {/* Click to Copy widget */}
                  {/* <div className="flex items-center justify-between bg-slate-50 border border-slate-200 p-4 rounded-2xl">
                    <div className="flex items-center space-x-2 text-slate-500 text-xs">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Shoolagiri, Hosur, Tamil Nadu (India)</span>
                    </div>
                    <button
                      onClick={copyToClipboard}
                      className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs rounded-xl font-bold inline-flex items-center space-x-1 cursor-pointer transition"
                    >
                      {copiedText ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-green-500" />
                          <span className="text-brand-green-600">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>Copy Phone</span>
                        </>
                      )}
                    </button>
                  </div> */}

                </div>
              </div>

              {/* Live Location Map & Region Details (Column 2) */}
              <div className="lg:col-span-7">
                <div className="glass-panel border border-slate-200 rounded-3xl p-6 md:p-8 h-full flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue-500/5 rounded-full blur-2xl" />
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-brand-blue-600 text-xs font-bold uppercase tracking-wider">
                        <Compass className="w-4 h-4 text-brand-blue-600 animate-spin" style={{ animationDuration: "12s" }} />
                        <span>Interactive Coverage Zone</span>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-brand-green-50 text-brand-green-700 font-mono text-[10px] font-bold border border-brand-green-200 uppercase tracking-wider animate-pulse">
                        ● GPS Live Dispatch Enabled
                      </span>
                    </div>

                    <h3 className="text-xl font-display font-bold text-slate-900 tracking-tight">
                      Find Our Office & Active Vehicles Near You
                    </h3>

                    {/* Integrated Interactive Google Maps IFrame */}
                    <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100 h-[280px] sm:h-[340px] w-full">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3892.759310543835!2d78.00615057585424!3d12.663780171550693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3badd70015a0cb03%3A0x4ce95cf88fc62b4!2sShoolagiri%20Bus%20Stand!5e0!3m2!1sen!2sin!4v1781717421723!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Neha Shri Septic Tank Cleaning coverage area: Hosur and Shoolagiri"
                        className="absolute inset-0"
                      />
                    </div>

                    {/* Real-time Map Description & Quick Dispatch Notes */}
                    {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans text-slate-600 pt-2">
                      <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl">
                        <span className="font-bold text-slate-800 block mb-1">📍 Shoolagiri Office Base</span>
                        <p className="leading-relaxed">Conveniently stationed right off the NH44 highway for rapid response towards local panchayats & rural estates.</p>
                      </div>
                      <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl">
                        <span className="font-bold text-slate-800 block mb-1">📍 Hosur Industrial Hub</span>
                        <p className="leading-relaxed">Active vacuum trucks stationed around SIPCOT phases for high-speed commercial blockages & emergency tank clearings.</p>
                      </div>
                    </div> */}
                  </div>

                  {/* Safety accreditation review */}
                  {/* <div className="pt-6 border-t border-slate-100 mt-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                    <div className="w-10 h-10 rounded-full bg-brand-blue-50 border border-brand-blue-105 flex items-center justify-center text-brand-blue-600 shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-0.5">
                        We Clean Throughout the Region
                      </h4>
                      <p className="text-slate-500 text-xs leading-relaxed">
                        Trucks are ready in <span className="font-semibold text-slate-850">Hosur, Shoolagiri, Krishnagiri, Rayakottai, and Kurubarapalli</span>. Our flat-pricing includes travel coordinates with no extra transport fees!
                      </p>
                    </div>
                  </div> */}

                </div>
              </div>

            </div>

          </div>
        </section>
          {/* 6. FAQ SECTION ACCORDION */}
        <section id="faq" className="py-15 bg-[#fafbfc]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header headings */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs text-brand-blue-600 font-extrabold uppercase tracking-widest block mb-3">
                Common Questions answered
              </span>
              
              <h2 className="text-3xl sm:text-4xl font-display font-medium text-slate-900 tracking-tight leading-tight mb-4">
                Frequently Asked Questions
              </h2>
              
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                Got questions regarding capacities, booking timelines, pricing, or safety guidelines? Check out our quick index.
              </p>
            </div>

            {/* Accordion Component */}
            <FaqSection />

          </div>
        </section>
      </main>

      {/* FOOTER SECTION */}
      <footer className="bg-slate-950 text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-white/5">
            
            {/* Col 1 identity */}
            {/* <div className="md:col-span-1.5">
              <span className="text-xl font-display font-semibold tracking-tight text-white flex items-center space-x-2 mb-4">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-blue-500 to-brand-green-500 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                  NS
                </span>
                <span>Neha Shri Services</span>
              </span>
              
              <p className="text-slate-400 text-xs leading-relaxed mb-6">
                Premium modern septic tank, drainage blockage sanitization, and pipeline jetting provider serving Shoolagiri, Hosur, Krishnagiri & surrounding areas under safe legal guidelines.
              </p>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-slate-400 text-xs">
                  <Phone className="w-3.5 h-3.5 text-brand-blue-500 shrink-0" />
                  <span>{phoneNumbers.primary} / {phoneNumbers.secondary}</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-400 text-xs">
                  <MapPin className="w-3.5 h-3.5 text-brand-green-500 shrink-0" />
                  <span>National Highway 44, Shoolagiri, Tamil Nadu, 635117 (India)</span>
                </div>
              </div>
            </div> */}

            {/* Col 2 hyperlinks */}
            {/* <div>
              <h4 className="text-sm font-display font-bold uppercase tracking-wider text-slate-200 mb-4">
                Services Rendered
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#services" className="hover:text-brand-blue-400 transition">Septic Tank Pumping</a></li>
                <li><a href="#services" className="hover:text-brand-blue-400 transition">Residential Sanitation</a></li>
                <li><a href="#services" className="hover:text-brand-blue-400 transition">Commercial & Factory Vacs</a></li>
                <li><a href="#services" className="hover:text-brand-blue-400 transition">High-Pressure Sewer Jetting</a></li>
                <li><a href="#services" className="hover:text-brand-blue-400 transition">Rural Toilet Pit Clearances</a></li>
                <li><a href="#services" className="hover:text-brand-blue-400 transition">24/7 Overflow Assistance</a></li>
              </ul>
            </div> */}

            {/* Col 3 core service zones */}
            {/* <div>
              <h4 className="text-sm font-display font-bold uppercase tracking-wider text-slate-200 mb-4">
                Service Boundaries
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>Shoolagiri Urban & Rural</li>
                <li>Hosur Corporate Town</li>
                <li>Krishnagiri Highway Region</li>
                <li>Bagalur Industrial Zone</li>
                <li>Denkanikottai Settlement</li>
                <li>Rayakottai & Kelamangalam</li>
              </ul>
            </div> */}

            {/* Col 4 safety credentials */}
            {/* <div>
              <h4 className="text-sm font-display font-bold uppercase tracking-wider text-slate-200 mb-4">
                Sanitairy Standard
              </h4>
              <p className="text-slate-400 text-xs leading-relaxed mb-4">
                All slurry waste is evacuated utilizing heavy hydraulic vacuum tankers with smell-lock seals, complying strictly with Indian municipal hygiene guidelines.
              </p>
              
              <div className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/5 rounded-xl text-[10px] text-[#fafbfc] uppercase tracking-wider font-semibold">
                <ShieldCheck className="w-4.5 h-4.5 text-emerald-500" />
                <span>Zero Manual Pollution Guarantee</span>
              </div>
            </div> */}

          </div>

          <div className="pt-4 pb-4 flex flex-col sm:flex-row items-center justify-between justify-center gap-4 text-center">
            <span className="text-[11px] text-slate-500 font-medium d-block">
              &copy; {new Date().getFullYear()} Neha Shri Septic Tank Cleaning Services. All Rights Reserved.
            </span>
            
            {/* <div className="flex space-x-4 text-[11px] text-slate-500">
              <a href="#home" className="hover:text-[#fafbfc] transition">Privacy Terms</a>
              <span>&bull;</span>
              <a href="#home" className="hover:text-[#fafbfc] transition">Sitemap Index</a>
              <span>&bull;</span>
              <a href="#faq" className="hover:text-[#fafbfc] transition">Local Guides</a>
            </div> */}
          </div>

        </div>
      </footer>

    </div>
  );
}
