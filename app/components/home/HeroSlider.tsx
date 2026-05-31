"use client";

import { useState, useEffect } from "react";

export default function HeroSlider() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 5);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 mt-4 select-none relative">
      <div className="relative w-full h-[180px] sm:h-[300px] md:h-[380px] rounded-2xl overflow-hidden shadow-sm border border-zinc-100">
        
        {/* Slide 1 */}
        <div className={`absolute inset-0 transition-opacity duration-700 ${activeSlide === 0 ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          <img 
            src="https://cms.beautybooth.com.bd/uploads/slider/top-korean-brands-web-banner_83.webp" 
            className="w-full h-full object-cover" 
            alt="Top Korean Brands Banner" 
          />
        </div>

        {/* Slide 2 */}
        <div className={`absolute inset-0 transition-opacity duration-700 ${activeSlide === 1 ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          <img 
            src="https://cms.beautybooth.com.bd/uploads/slider/combo-offer-banner_59.webp" 
            className="w-full h-full object-cover" 
            alt="Combo Offer Banner" 
          />
        </div>

        {/* Slide 3 */}
        <div className={`absolute inset-0 transition-opacity duration-700 ${activeSlide === 2 ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          <img 
            src="https://cms.beautybooth.com.bd/uploads/slider/tir-tir-web_86.webp" 
            className="w-full h-full object-cover" 
            alt="Tir Tir Banner" 
          />
        </div>

        {/* Slide 4 */}
        <div className={`absolute inset-0 transition-opacity duration-700 ${activeSlide === 3 ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          <img 
            src="https://cms.beautybooth.com.bd/uploads/slider/japani-banner_16.webp" 
            className="w-full h-full object-cover" 
            alt="Japanese Skincare Banner" 
          />
        </div>

        {/* Slide 5 */}
        <div className={`absolute inset-0 transition-opacity duration-700 ${activeSlide === 4 ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          <img 
            src="https://cms.beautybooth.com.bd/uploads/slider/under-1-k-web_62.webp" 
            className="w-full h-full object-cover" 
            alt="Self Care under 1k Banner" 
          />
        </div>

        {/* Dotted indicators in bottom-right corner */}
        <div className="absolute bottom-4 right-8 flex gap-2 z-20">
          {[0, 1, 2, 3, 4].map((dot) => (
            <button
              key={dot}
              onClick={() => setActiveSlide(dot)}
              className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                dot === activeSlide ? "bg-black w-5" : "bg-white/80"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
