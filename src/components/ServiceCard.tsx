import React, { useRef, useState } from "react";
import { Service, getIcon } from "../data";

interface ServiceCardProps {
  key?: string;
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const IconComponent = getIcon(service.iconName);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Relative coordinates
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Dynamic rotation angle (limit to 12 degrees max for elegance)
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    // Glare gradient center calculation as a percentage
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setGlarePos({ x: glareX, y: glareY });

    // Apply the 3D transforms
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    setIsHovered(false);
    // Smoothly restore defaults
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="interactive-card relative rounded-2xl glass-panel p-6 shadow-md transition-all duration-300 ease-out overflow-hidden h-full flex flex-col justify-between group cursor-pointer border border-white/40"
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 0.1s ease-out, box-shadow 0.3s ease",
      }}
      id={`service-card-${service.id}`}
    >
      {/* Glare effect matching lighting source */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 180px at ${glarePos.x}% ${glarePos.y}%, rgba(14, 165, 233, 0.15) 0%, transparent 80%)`,
        }}
      />

      {/* Decorative colored glow bar at the top */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-blue-500 to-brand-green-500 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />

      <div>
        {/* Animated Icon container with custom tilt offset */}
        <div 
          className="w-12 h-12 rounded-xl bg-brand-blue-50/70 border border-brand-blue-100 text-brand-blue-600 flex items-center justify-center mb-5 shadow-sm group-hover:bg-brand-blue-500 group-hover:text-white group-hover:scale-110 transition-all duration-300"
          style={{ transform: "translateZ(30px)" }}
        >
          <IconComponent 
            className={`w-6 h-6 transition-transform duration-500 ${
              isHovered ? "rotate-6 scale-110" : ""
            }`} 
          />
        </div>

        {/* Content Details with 3D Z-index translate */}
        <h3 
          className="text-xl font-display font-semibold text-brand-dark mb-2 tracking-tight group-hover:text-brand-blue-600 transition-colors"
          style={{ transform: "translateZ(20px)" }}
        >
          {service.title}
        </h3>
        
        <p 
          className="text-sm text-slate-600 leading-relaxed mb-4"
          style={{ transform: "translateZ(15px)" }}
        >
          {service.description}
        </p>
      </div>

      {/* Structured bullet features that appear or highlight on hover */}
      <ul 
        className="space-y-1.5 pt-3 border-t border-slate-100 mt-auto" 
        style={{ transform: "translateZ(10px)" }}
      >
        {service.features.slice(0, 2).map((feat, idx) => (
          <li key={idx} className="flex items-center text-xs text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green-500 mr-2 shrink-0 animate-pulse-slow" />
            {feat}
          </li>
        ))}
      </ul>
    </div>
  );
}
