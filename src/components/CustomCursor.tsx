import React, { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hoverType, setHoverType] = useState<string | null>(null);
  const [isHidden, setIsHidden] = useState(true);

  // Instantly evaluate mobile or touch device state on initialize to prevent delayed hook trigger
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(pointer: coarse)").matches || 
           /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  });

  // Use refs for layout coordinates to avoid high-frequency React component re-renders
  const mouseRef = useRef({ x: 0, y: 0 });
  const dotRef = useRef({ x: 0, y: 0 });
  const ringRef = useRef({ x: 0, y: 0 });
  const hasMovedRef = useRef(false);

  const dotDomRef = useRef<HTMLDivElement>(null);
  const ringDomRef = useRef<HTMLDivElement>(null);
  const rafidRef = useRef<number | null>(null);

  useEffect(() => {
    const checkIsMobile = () => {
      const mobileMatch = window.matchMedia("(pointer: coarse)").matches || 
                          /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
      setIsMobile(mobileMatch);
    };

    window.addEventListener("resize", checkIsMobile);
    if (isMobile) return;

    // Fast coordinate tracking inside mousemove event
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      // Lock positions directly on first load to prevent animation jumps from (0, 0)
      if (!hasMovedRef.current) {
        dotRef.current.x = e.clientX;
        dotRef.current.y = e.clientY;
        ringRef.current.x = e.clientX;
        ringRef.current.y = e.clientY;
        hasMovedRef.current = true;
      }

      if (isHidden) {
        setIsHidden(false);
      }
    };

    const handleMouseLeave = () => {
      setIsHidden(true);
    };

    const handleMouseEnter = () => {
      setIsHidden(false);
    };

    const handleMouseDown = () => {
      setClicked(true);
    };

    const handleMouseUp = () => {
      setClicked(false);
    };

    // Ultra-smooth lerping logic inside Animation Loop for consistent 60fps/120fps renderings
    const updatePosition = () => {
      const targetX = mouseRef.current.x;
      const targetY = mouseRef.current.y;

      // Fast tracking for the inner pointer dot
      dotRef.current.x += (targetX - dotRef.current.x) * 0.35;
      dotRef.current.y += (targetY - dotRef.current.y) * 0.35;

      // Smooth lag interpolation for the outer feedback boundary ring (lerping factor ~ 0.16)
      ringRef.current.x += (targetX - ringRef.current.x) * 0.16;
      ringRef.current.y += (targetY - ringRef.current.y) * 0.16;

      // Direct DOM manipulation completely bypasses React render cycles for massive performance
      if (dotDomRef.current) {
        dotDomRef.current.style.transform = `translate3d(${dotRef.current.x}px, ${dotRef.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringDomRef.current) {
        ringDomRef.current.style.transform = `translate3d(${ringRef.current.x}px, ${ringRef.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafidRef.current = requestAnimationFrame(updatePosition);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Track active interactives
    const addEventListenersToInteractives = () => {
      const interactives = document.querySelectorAll(
        "a, button, [role='button'], input, textarea, select, .interactive-card, .gallery-item, .clickable"
      );

      interactives.forEach((el) => {
        if (el.getAttribute("data-cursor-bound") === "true") return;
        el.setAttribute("data-cursor-bound", "true");

        el.addEventListener("mouseenter", (e) => {
          setHovered(true);
          const target = e.currentTarget as HTMLElement;
          if (target.classList.contains("gallery-item")) {
            setHoverType("gallery");
          } else if (target.classList.contains("glow-btn") || target.tagName === "BUTTON") {
            setHoverType("button");
          } else {
            setHoverType("link");
          }
        });

        el.addEventListener("mouseleave", () => {
          setHovered(false);
          setHoverType(null);
        });
      });
    };

    addEventListenersToInteractives();
    rafidRef.current = requestAnimationFrame(updatePosition);

    // Watch DOM for added interactive items and dynamically bind pointer indicators too
    const observer = new MutationObserver(() => {
      addEventListenersToInteractives();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("resize", checkIsMobile);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      observer.disconnect();
      if (rafidRef.current) {
        cancelAnimationFrame(rafidRef.current);
      }
    };
  }, [isMobile, isHidden]);

  if (isMobile || isHidden) return null;

  return (
    <>
      {/* Central tiny brand-colored dot follows pointer instantaneously */}
      <div
        ref={dotDomRef}
        id="cursor-dot"
        className={`custom-cursor ${clicked ? "scale-90" : ""} ${
          hovered ? "scale-150 !bg-brand-green-500 shadow-md" : ""
        } transition-transform duration-200`}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          willChange: "transform",
        }}
      />

      {/* Lagging outer responsive helper ring */}
      <div
        ref={ringDomRef}
        id="cursor-ring"
        className={`custom-cursor-ring ${clicked ? "scale-75 !border-brand-green-500" : ""} ${
          hovered 
            ? hoverType === "gallery"
              ? "w-16 h-16 !border-emerald-400 bg-emerald-500/10" 
              : "w-12 h-12 !border-brand-blue-500 bg-brand-blue-500/5"
            : ""
        } flex items-center justify-center`}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          willChange: "transform",
        }}
      >
        {hovered && hoverType === "gallery" && (
          <span className="text-[10px] text-emerald-400 font-display font-bold tracking-widest uppercase">
            Zoom
          </span>
        )}
      </div>
    </>
  );
}
