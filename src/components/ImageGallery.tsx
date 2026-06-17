import React, { useState, useRef, useEffect } from "react";
import { galleryData, GalleryItem } from "../data";
import { Eye, X, ArrowLeftRight, ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageGallery() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  
  // Before-After slider state inside Lightbox
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);

  // Filters categories unique
  const filterCategories = [
    { key: "all", label: "Show All" },
    { key: "Vehicles", label: "Vehicles" },
    { key: "Results", label: "Results" },
    { key: "Work Process", label: "Work Process" }
  ];

  const filteredItems = galleryData.filter(
    (item) => activeFilter === "all" || item.category === activeFilter
  );

  // Handle Before/After slider logic
  const handleSliderMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handlePointerDown = () => {
    isDragging.current = true;
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (!isDragging.current) return;
    handleSliderMove(e.clientX);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    if (selectedItem?.isBeforeAfter) {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
    }
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [selectedItem]);

  // Navigate lightbox items
  const handlePrevItem = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedItem) return;
    const currentIndex = filteredItems.findIndex((item) => item.id === selectedItem.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedItem(filteredItems[prevIndex]);
    setSliderPosition(50);
  };

  const handleNextItem = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedItem) return;
    const currentIndex = filteredItems.findIndex((item) => item.id === selectedItem.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setSelectedItem(filteredItems[nextIndex]);
    setSliderPosition(50);
  };

  return (
    <div className="w-full">
      {/* Category Tab Controls */}
      <div className="flex flex-wrap justify-center gap-2 mb-10" id="gallery-tabs">
        {filterCategories.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveFilter(tab.key)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold font-display tracking-tight transition-all duration-300 transform hover:scale-105 cursor-pointer ${
              activeFilter === tab.key
                ? "bg-brand-blue-600 text-white shadow-lg shadow-brand-blue-500/20 glow-blue"
                : "bg-white/70 border border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid Display Masonry-style dynamic responsive columns */}
      <div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn"
        id="gallery-grid"
      >
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              setSelectedItem(item);
              setSliderPosition(50);
            }}
            className="group gallery-item relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-white bg-slate-100"
          >
            {/* Main Picture */}
            <img
              src={item.imageUrl}
              alt={item.alt}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              loading="lazy"
            />

            {/* Glowing Category Overlay Badge */}
            <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-brand-dark/80 backdrop-blur-md rounded-full text-[10px] uppercase font-bold tracking-widest text-[#fafbfc]">
              {item.category === "before-after" ? "Comparison" : item.category}
            </div>

            {/* Hover overlay description with icon */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
              <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold mb-1">
                {item.isBeforeAfter ? (
                  <>
                    <ArrowLeftRight className="w-3.5 h-3.5" />
                    <span>Interactive Slider</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    <span>Click to Zoom</span>
                  </>
                )}
              </div>
              
              <h4 className="text-white font-display font-bold text-lg tracking-tight mb-1">
                {item.title}
              </h4>
              
              <p className="text-white/85 text-xs line-clamp-2 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Zero State Fallback */}
      {filteredItems.length === 0 && (
        <div className="text-center py-16 text-slate-400 font-medium">
          No records found in this category. Check back soon!
        </div>
      )}

      {/* Lightbox Overlay Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-slate-950/95 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-8 select-none"
          onClick={() => setSelectedItem(null)}
          id="lightbox-container"
        >
          {/* Top Close indicator */}
          <button
            onClick={() => setSelectedItem(null)}
            className="absolute top-5 right-5 w-11 h-11 bg-white/10 hover:bg-white/20 hover:scale-105 border border-white/20 text-white flex items-center justify-center rounded-full transition cursor-pointer z-50"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Navigation */}
          <button
            onClick={handlePrevItem}
            className="absolute left-4 md:left-8 w-11 h-11 bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center rounded-full transition cursor-pointer z-50 hover:scale-105"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Navigation */}
          <button
            onClick={handleNextItem}
            className="absolute right-4 md:right-8 w-11 h-11 bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center rounded-full transition cursor-pointer z-50 hover:scale-105"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Core Content Modal Container */}
          <div
            className="relative max-w-4xl w-full flex flex-col items-center bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Stage */}
            <div className="relative w-full aspect-[16/10] bg-slate-950 flex items-center justify-center overflow-hidden">
              
              {/* Conditional rendering of slider for before-after, otherwise simple image */}
              {selectedItem.isBeforeAfter && selectedItem.beforeUrl && selectedItem.afterUrl ? (
                <div
                  ref={sliderRef}
                  className="relative w-full h-full select-none cursor-ew-resize overflow-hidden"
                  onPointerDown={handlePointerDown}
                  onPointerMove={(e) => {
                    if (isDragging.current) handleSliderMove(e.clientX);
                  }}
                  onTouchMove={(e) => {
                    if (e.touches && e.touches[0]) handleSliderMove(e.touches[0].clientX);
                  }}
                >
                  {/* AFTER (Primary Clean State, bottom layer) */}
                  <img
                    src={selectedItem.afterUrl}
                    alt={`${selectedItem.title} - After Sanitation`}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  />
                  <div className="absolute top-4 right-4 bg-emerald-500/95 backdrop-blur text-white px-3 py-1 rounded-md text-xs font-bold tracking-wider uppercase shadow-sm">
                    After
                  </div>

                  {/* BEFORE (Dirty Clogged State, top cropped layer) */}
                  <div
                    className="absolute inset-0 overflow-hidden pointer-events-none"
                    style={{ width: `${sliderPosition}%` }}
                  >
                    <img
                      src={selectedItem.beforeUrl}
                      alt={`${selectedItem.title} - Before Cleaning`}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ width: sliderRef.current?.getBoundingClientRect().width }}
                    />
                    <div className="absolute top-4 left-4 bg-red-500/95 backdrop-blur text-white px-3 py-1 rounded-md text-xs font-bold tracking-wider uppercase shadow-sm">
                      Before
                    </div>
                  </div>

                  {/* Drag Handle Bar and Dot */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-lg pointer-events-none"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white text-slate-800 rounded-full flex items-center justify-center shadow-2xl border-4 border-slate-950/20">
                      <ArrowLeftRight className="w-4 h-4 text-brand-blue-600 animate-pulse" />
                    </div>
                  </div>
                </div>
              ) : (
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.alt}
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-full object-contain pointer-events-none"
                />
              )}
            </div>

            {/* Bottom Caption Tray */}
            <div className="w-full bg-slate-900 p-5 md:p-6 border-t border-white/5">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h3 className="text-white font-display font-medium text-lg md:text-xl tracking-tight">
                  {selectedItem.title}
                </h3>
                <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] text-white font-semibold uppercase tracking-wider">
                  {selectedItem.category}
                </span>
              </div>
              <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                {selectedItem.description}
              </p>
              
              {selectedItem.isBeforeAfter && (
                <p className="text-slate-500 text-[11px] mt-3 italic flex items-center bg-slate-950/40 p-2.5 rounded-lg border border-white/5">
                  <ArrowLeftRight className="w-3.5 h-3.5 mr-2 text-emerald-400" />
                  Tip: Hold and drag the center bar left or right to inspect the cleaning difference!
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
