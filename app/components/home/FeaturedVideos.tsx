"use client";

import React, { useState, useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PlayIcon,
  VolumeHighIcon,
  VolumeMute01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  TiktokIcon,
  InstagramIcon,
  VideoReplayIcon,
} from "@hugeicons/core-free-icons";
import { useApp } from "../../context/AppContext";

export default function FeaturedVideos() {
  const { setToastMessage } = useApp();

  const originalVideos = [
    { 
      title: "Makeup Cushion Cover", 
      quote: "Flawless cushion cover routine for daily glass skin",
      coverUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=300&auto=format&fit=crop", 
      videoUrl: "https://cms.beautybooth.com.bd/uploads/video/influencer-maekup-web-1778557796.mp4",
      prodImg: "https://cms.beautybooth.com.bd/uploads/all/Wv4FYm25qo3dBuE7jPPA5ZZLtqXn5S4Xt2z5Cx33.webp",
      category: "Make up", 
      price: "999", 
      oldPrice: "1150" 
    },
    { 
      title: "Anua Niacinamide 10% + TXA 4%", 
      quote: "Anua Niacinamide 10% barrier repair ampoule",
      coverUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=300&auto=format&fit=crop", 
      videoUrl: "https://cms.beautybooth.com.bd/uploads/video/dfd-dfdf-1756882823.mp4",
      prodImg: "https://cms.beautybooth.com.bd/uploads/all/abib-product-price-in-bd.png",
      category: "Skin Care", 
      price: "1850", 
      oldPrice: "2300" 
    },
    { 
      title: "Deep Bristle Brush", 
      quote: "Deep Bristle Brush - for exfoliating",
      coverUrl: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=300&auto=format&fit=crop", 
      videoUrl: "https://cms.beautybooth.com.bd/uploads/video/dfd-dfdf-1756882823.mp4",
      prodImg: "https://cms.beautybooth.com.bd/uploads/all/c6r8L1jF22qoq0LC1QbIBp5pNchTLOZXAAyTU7Lr.png",
      category: "Skin Care", 
      price: "1519", 
      oldPrice: "1800" 
    },
    { 
      title: "Koji White Soap Video", 
      quote: "Koji White Kojic Acid & Glutathione Skin Brightening Soap (160gm)",
      coverUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=300&auto=format&fit=crop", 
      videoUrl: "https://cms.beautybooth.com.bd/uploads/video/influencer-web-1760855011.mp4",
      prodImg: "https://cms.beautybooth.com.bd/uploads/all/OJFHpDqpawLfd8JrKe0kvLUQTGkhZ4HRPvJw6lvY.webp",
      category: "Bath & Body Care", 
      price: "1700", 
      oldPrice: "2000" 
    },
    { 
      title: "Cream Application Daily Routine", 
      quote: "Deep hydrating cream application tutorial",
      coverUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=300&auto=format&fit=crop", 
      videoUrl: "https://cms.beautybooth.com.bd/uploads/video/sunscreen-web-1778556885.mp4",
      prodImg: "https://cms.beautybooth.com.bd/uploads/all/abib-product-price-in-bd.png",
      category: "Make up", 
      price: "1000", 
      oldPrice: "1250" 
    },
    { 
      title: "Accessories Portable Frequency", 
      quote: "Skin tightening portable ultrasonic therapy device",
      coverUrl: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=300&auto=format&fit=crop", 
      videoUrl: "https://cms.beautybooth.com.bd/uploads/video/sunscreen-web-1778556885.mp4",
      prodImg: "https://cms.beautybooth.com.bd/uploads/all/numbuzin-products.webp",
      category: "Accessories", 
      price: "1300", 
      oldPrice: "1750" 
    },
    { 
      title: "Anua Niacinamide Pink Serum", 
      quote: "MelaZero pink serum dark spot correcting",
      coverUrl: "https://images.unsplash.com/photo-1608248597481-496100c8c836?q=80&w=300&auto=format&fit=crop", 
      videoUrl: "https://cms.beautybooth.com.bd/uploads/video/gulfan-web-1766895605.mp4",
      prodImg: "https://cms.beautybooth.com.bd/uploads/all/abib-product-price-in-bd.png",
      category: "Skin Care", 
      price: "1799", 
      oldPrice: "2300" 
    },
    { 
      title: "Gulfan Glow Glow", 
      quote: "Gulfan cosmetics whitening and skin hydration video",
      coverUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=300&auto=format&fit=crop", 
      videoUrl: "https://cms.beautybooth.com.bd/uploads/video/gulfan-web-1766895605.mp4",
      prodImg: "https://cms.beautybooth.com.bd/uploads/all/OJFHpDqpawLfd8JrKe0kvLUQTGkhZ4HRPvJw6lvY.webp",
      category: "Skin Care", 
      price: "1900", 
      oldPrice: "2400" 
    }
  ];

  // Triplicate the array to allow for absolute seamless infinite looping
  const displayVideos = [...originalVideos, ...originalVideos, ...originalVideos];
  
  // Base offset index centers on the middle clone
  const L = originalVideos.length;
  const [activeIndex, setActiveIndex] = useState(L + 4); // Center of the middle copy
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-Slide leftwards indefinitely (paused when hovered)
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => prev + 1);
    }, 5500); // Allow more time to watch the active center video
    return () => clearInterval(timer);
  }, [isHovered]);

  // Seamless Wrap-around Logic without rewinding visual effects
  useEffect(() => {
    if (activeIndex >= L * 2) {
      const resetTimeout = setTimeout(() => {
        setTransitionEnabled(false);
        setActiveIndex((prev) => prev - L);
      }, 500); // Matches the translation duration
      return () => clearTimeout(resetTimeout);
    }
    if (activeIndex < L) {
      const resetTimeout = setTimeout(() => {
        setTransitionEnabled(false);
        setActiveIndex((prev) => prev + L);
      }, 500);
      return () => clearTimeout(resetTimeout);
    }
  }, [activeIndex, L]);

  useEffect(() => {
    if (!transitionEnabled) {
      const enableTimer = setTimeout(() => {
        setTransitionEnabled(true);
      }, 50); // Re-enables transition smoothly
      return () => clearTimeout(enableTimer);
    }
  }, [transitionEnabled]);

  // Navigation Arrows functions
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => prev - 1);
    setToastMessage("Loading previous beauty routine...");
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => prev + 1);
    setToastMessage("Loading next beauty routine...");
  };

  // Center alignment offset translator
  const getTranslateX = () => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    const stepWidth = isMobile ? 155 : 170;
    // Centers exactly relative to the middle clone starting index (L + 4)
    return `${((L + 4) - activeIndex) * stepWidth}px`;
  };

  return (
    <section className="max-w-7xl mx-auto px-4 mt-20 select-none overflow-hidden relative">
      {/* Header section with modern badge and descriptive subtitle */}
      <div className="flex flex-col items-center text-center mb-10 select-none">
        <span className="bg-[#FF1A58]/10 text-[#FF1A58] border border-[#FF1A58]/20 font-black text-[9px] px-3.5 py-1 rounded-full uppercase tracking-widest flex items-center gap-1 shadow-sm">
          ✨ Trending routines
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight uppercase mt-3 flex items-center gap-2">
          <HugeiconsIcon icon={VideoReplayIcon} size={26} className="text-[#FF1A58] animate-pulse animate-duration-1000" />
          Featured in Videos
        </h2>
        <p className="text-zinc-500 font-medium text-xs max-w-md mt-2 leading-relaxed px-4">
          Watch our beauty influencers showcase their favorite routines. Hover to pause, toggle sound dynamically, and click "Shop" to buy directly!
        </p>
        <div className="w-16 h-1 bg-[#FF1A58] rounded-full mt-4" />
      </div>

      {/* Infinite Coverflow Slider Track Container */}
      <div 
        className="relative w-full flex justify-center items-center h-[470px] overflow-hidden rounded-3xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Floating Left Navigation Control Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-white/90 backdrop-blur-md hover:bg-[#FF1A58] border border-zinc-200/80 text-[#FF1A58] hover:text-white flex items-center justify-center shadow-lg hover:shadow-rose-500/20 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer group"
          title="Previous routine"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={20} className="transition-transform group-hover:-translate-x-0.5 duration-300" />
        </button>

        {/* Floating Right Navigation Control Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-white/90 backdrop-blur-md hover:bg-[#FF1A58] border border-zinc-200/80 text-[#FF1A58] hover:text-white flex items-center justify-center shadow-lg hover:shadow-rose-500/20 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer group"
          title="Next routine"
        >
          <HugeiconsIcon icon={ArrowRight01Icon} size={20} className="transition-transform group-hover:translate-x-0.5 duration-300" />
        </button>

        <div 
          className={`flex items-center ${transitionEnabled ? "transition-transform duration-500 ease-in-out" : ""}`}
          style={{ transform: `translateX(${getTranslateX()})` }}
        >
          {displayVideos.map((video, i) => {
            const dist = Math.abs(i - activeIndex);
            
            // Dynamic Coverflow styling parameters
            const isCenter = dist === 0;
            const zIndexClass = isCenter ? "z-30" : dist === 1 ? "z-20" : dist === 2 ? "z-10" : "z-0";
            const scaleClass = isCenter ? "scale-105" : dist === 1 ? "scale-[0.88]" : dist === 2 ? "scale-[0.78]" : "scale-[0.68]";
            const opacityClass = isCenter ? "opacity-100" : dist === 1 ? "opacity-75" : dist === 2 ? "opacity-50" : "opacity-25";
            const marginClass = isCenter ? "-mx-4 sm:-mx-6" : dist === 1 ? "-mx-8 sm:-mx-12" : "-mx-12 sm:-mx-16";
            const activeCardBorder = isCenter ? "border-2 border-[#FF1A58] ring-4 ring-rose-500/10 shadow-2xl" : "border border-zinc-200/40";
            const blurClass = isCenter ? "blur-0" : "blur-[0.5px]";

            return (
              <div 
                key={i}
                onClick={() => {
                  if (!isCenter) {
                    setActiveIndex(i);
                    setToastMessage(`Focusing on: "${video.title}"`);
                  }
                }}
                className={`w-[260px] md:w-[280px] h-[410px] md:h-[430px] rounded-[32px] overflow-hidden transition-all duration-500 ease-in-out relative shrink-0 flex flex-col justify-between group cursor-pointer bg-white origin-center ${zIndexClass} ${scaleClass} ${opacityClass} ${marginClass} ${activeCardBorder} ${blurClass} focus:outline-none focus:ring-0`}
              >
                {/* Background Video (Auto Play on Center) or Static Image Cover */}
                {isCenter ? (
                  <video
                    src={video.videoUrl}
                    autoPlay
                    muted={isMuted}
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover z-0"
                  />
                ) : (
                  <img
                    src={video.coverUrl}
                    className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-105 transition-transform duration-750"
                    alt={video.title}
                  />
                )}

                {/* Smooth Dark Tint Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-black/25 z-5" />

                {/* Top Overlays */}
                <div className="p-4 relative z-10 flex justify-between items-center w-full">
                  {/* Top Left Social Brand Glyph Badge */}
                  <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white border border-white/10 shadow-md">
                    <HugeiconsIcon icon={i % 2 === 0 ? TiktokIcon : InstagramIcon} size={15} />
                  </div>

                  {/* Top Right Live Sound Toggle (Only visible on active center card) */}
                  {isCenter ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMuted(!isMuted);
                        setToastMessage(isMuted ? "Audio unmuted! Enjoy sound." : "Audio muted.");
                      }}
                      className="w-8 h-8 rounded-full bg-black/50 hover:bg-[#FF1A58] backdrop-blur-md flex items-center justify-center text-white border border-white/10 shadow-md transition-all active:scale-95 duration-200 cursor-pointer"
                      title={isMuted ? "Unmute video" : "Mute video"}
                    >
                      <HugeiconsIcon icon={isMuted ? VolumeMute01Icon : VolumeHighIcon} size={15} />
                    </button>
                  ) : (
                    <div className="w-8 h-8 opacity-0" />
                  )}
                </div>

                {/* Play Button Indicator (Only on non-active background cards) */}
                {!isCenter && (
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-white/95 text-[#FF1A58] flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                      <HugeiconsIcon icon={PlayIcon} size={18} className="fill-current ml-0.5" />
                    </div>
                  </div>
                )}

                {/* Glassmorphic Creator Quote Overlay Banner (Only on active card) */}
                {isCenter && (
                  <div className="absolute bottom-[76px] left-4 right-4 z-10 bg-black/50 backdrop-blur-md rounded-2xl p-3 border border-white/10 shadow-lg select-none transition-all duration-300 animate-slide-up-fade">
                    <p className="text-[10px] md:text-[10.5px] font-semibold text-white italic leading-relaxed text-center">
                      "{video.quote}"
                    </p>
                  </div>
                )}

                {/* Bottom Shoppable Card Container (Only visible on center active card with slide entrance) */}
                {isCenter ? (
                  <div className="bg-white/95 backdrop-blur-md border-t border-zinc-100/50 px-4 py-3 flex items-center gap-3 relative z-10 w-full shrink-0 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] transition-all duration-300 rounded-b-[30px] animate-slide-up-fade">
                    <div className="w-10 h-10 rounded-lg bg-zinc-50 border border-zinc-100 flex items-center justify-center p-1 shrink-0 overflow-hidden shadow-inner">
                      <img src={video.prodImg} className="max-h-full max-w-full object-contain" alt={video.title} />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col text-left">
                      <span className="text-[8px] font-black text-[#FF1A58] uppercase tracking-wider block">
                        {video.category}
                      </span>
                      <h5 className="text-[10px] font-extrabold text-zinc-800 truncate leading-tight mt-0.5">
                        {video.title}
                      </h5>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-xs font-black text-black">৳{video.price}</span>
                        {video.oldPrice && (
                          <span className="text-[9px] text-zinc-400 line-through font-bold">৳{video.oldPrice}</span>
                        )}
                      </div>
                    </div>
                    <div className="bg-[#FF1A58] hover:bg-[#e11d48] text-white font-extrabold text-[9px] px-3.5 py-1.5 rounded-full transition-all uppercase tracking-wider flex items-center gap-0.5 shadow-sm hover:shadow active:scale-95 cursor-pointer">
                      Shop
                      <HugeiconsIcon icon={ArrowRight01Icon} size={10} className="stroke-[3]" />
                    </div>
                  </div>
                ) : (
                  // Empty space filler for non-active cards to prevent layout shifting
                  <div className="h-4 w-full bg-transparent relative z-10 shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Pill Indicators Dots for manual navigation */}
      <div className="flex justify-center items-center gap-2.5 mt-6 select-none">
        {originalVideos.map((_, idx) => {
          const isCurrent = (activeIndex - L) % L === idx;
          return (
            <button
              key={idx}
              onClick={() => {
                const currentCloneOffset = Math.floor(activeIndex / L) * L;
                setActiveIndex(currentCloneOffset + idx);
                setToastMessage(`Viewing routine ${idx + 1}`);
              }}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${isCurrent ? "w-7 bg-[#FF1A58]" : "w-2 bg-zinc-200 hover:bg-zinc-300"}`}
              title={`Go to slide ${idx + 1}`}
            />
          );
        })}
      </div>
    </section>
  );
}
