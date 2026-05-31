"use client";

import { useState } from "react";
import { useApp } from "../../context/AppContext";

export default function VisitOutlet() {
  const { setToastMessage } = useApp();
  const [email, setEmail] = useState("");

  const showroomImages = [
    "https://cms.beautybooth.com.bd/uploads/cms-migrate/home-page-footer-image-one-1756792603.webp",
    "https://cms.beautybooth.com.bd/uploads/cms-migrate/home-page-footer-image-two-1756794532.webp",
    "https://cms.beautybooth.com.bd/uploads/cms-migrate/home-page-footer-image-three-1756794583.webp",
    "https://cms.beautybooth.com.bd/uploads/cms-migrate/home-page-footer-image-four-1756794607.webp",
    "https://cms.beautybooth.com.bd/uploads/cms-migrate/home-page-footer-image-five-1756794624.webp",
    "https://cms.beautybooth.com.bd/uploads/cms-migrate/home-page-footer-image-six-1756794645.webp"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setToastMessage("Please enter a valid email address.");
      return;
    }
    setToastMessage("Location coordinates sent to email successfully!");
    setEmail("");
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Map & Phone Location Request */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-tight select-none">
            Visit Outlet
          </h2>

          {/* Google Map Container with High-fidelity Custom Overlays */}
          <div className="relative w-full h-[380px] sm:h-[420px] rounded-3xl overflow-hidden border border-zinc-200/80 shadow-md bg-zinc-100 group">
            {/* The Interactive Google Map */}
            <iframe
              title="Beauty Booth Rampura Bangladesh Showroom Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.8804000492856!2d90.42223847602283!3d23.751609588724772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b866c1f1ec71%3A0xc07bc77f240edc3!2sBeauty%20Booth%20Bangladesh!5e0!3m2!1sen!2sbd!4v1716568000000!5m2!1sen!2sbd"
              className="w-full h-full border-0 grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              allowFullScreen={true}
              loading="lazy"
            ></iframe>

            {/* Float Overlay: Google Map Location Card (Top-Left) */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white p-3.5 rounded-lg shadow-md border border-zinc-200/60 max-w-[280px] z-10 text-left pointer-events-auto select-none">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="font-extrabold text-zinc-900 text-sm leading-tight">
                    Beauty Booth Bangladesh
                  </h4>
                  <p className="text-[11px] text-zinc-500 mt-1 leading-normal font-medium">
                    Ujjwal Tower, House no. 362, 2nd Floor East Rampura, ডি আই টি সড়ক, ঢাকা 1219
                  </p>
                  <div className="flex items-center gap-1 mt-1.5">
                    <span className="text-[11px] font-bold text-zinc-700">4.7</span>
                    <div className="flex text-amber-400 text-[10px] tracking-tighter">
                      ★ ★ ★ ★ ★
                    </div>
                    <a
                      href="https://search.google.com/local/reviews?placeid=ChIJcezxwGa4VTcR09wOJ3_HeMA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-blue-600 hover:underline font-semibold ml-0.5"
                    >
                      (69)
                    </a>
                  </div>
                </div>
                <div className="flex gap-2 items-center mt-0.5">
                  {/* Share Link Icon */}
                  <a
                    href="https://maps.app.goo.gl/3f822x9Jp4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-zinc-600 p-1 hover:bg-zinc-100 rounded transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  {/* Directions Icon */}
                  <a
                    href="https://maps.app.goo.gl/3f822x9Jp4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded-full transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.4 11.2L12.8 1.6c-.8-.8-2-.8-2.8 0L.4 11.2c-.8.8-.8 2 0 2.8l9.6 9.6c.8.8 2.8.8 2.8 0l9.6-9.6c.8-.8.8-2 0-2.8zm-10.4 6v-4H8v-4h4V5.2l6 6-6 6z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Float Overlay: Open in Maps Button (Top-Right) */}
            <a
              href="https://maps.app.goo.gl/3f822x9Jp4"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white hover:bg-zinc-50 text-zinc-800 text-[11px] font-bold px-3 py-2 rounded-lg shadow-md border border-zinc-200/80 flex items-center gap-1.5 transition-all active:scale-95 duration-100 z-10"
            >
              <svg className="w-3.5 h-3.5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Open in Maps
            </a>

            {/* Float Overlay: Satellite Toggle Button (Bottom-Left) */}
            <button
              className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 w-12 h-12 rounded-lg overflow-hidden shadow-md border-2 border-white hover:border-blue-500 transition-all z-10 group/sat active:scale-95 duration-100"
              onClick={() => setToastMessage("Switching map layers...")}
            >
              <img
                src={showroomImages[0]}
                className="w-full h-full object-cover group-hover/sat:scale-110 transition-transform duration-300"
                alt="Satellite toggle thumbnail"
              />
              <div className="absolute inset-0 bg-black/10 group-hover/sat:bg-transparent"></div>
            </button>
          </div>

          {/* Location Request via Email */}
          <div className="mt-2 text-left">
            <h4 className="text-xl sm:text-2xl font-extrabold text-zinc-900 tracking-tight mb-3">
              Get our shop location on your phone
            </h4>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your mail"
                className="flex-1 px-4.5 py-3 border border-zinc-300 rounded-lg text-sm bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-800 focus:border-zinc-800 transition-all font-medium"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white border border-zinc-300 hover:bg-zinc-50 rounded-lg text-sm font-semibold text-zinc-900 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-[0.98] duration-100 hover:border-zinc-400"
              >
                Get Link <span className="text-base font-bold">→</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Asymmetrical Showroom Gallery */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-4 self-center select-none">
          {/* Left Column of Gallery (4 aspect-correct images) */}
          <div className="flex flex-col gap-4">
            <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-zinc-200/50 shadow-sm aspect-[1.35] w-full bg-zinc-50 relative group cursor-zoom-in">
              <img
                src={showroomImages[0]}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt="Showroom green and yellow cosmetics on wooden shelves"
              />
            </div>
            <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-zinc-200/50 shadow-sm aspect-[1.55] w-full bg-zinc-50 relative group cursor-zoom-in">
              <img
                src={showroomImages[1]}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt="Showroom overhead banners with hanging campaign tags"
              />
            </div>
            <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-zinc-200/50 shadow-sm aspect-[1.55] w-full bg-zinc-50 relative group cursor-zoom-in">
              <img
                src={showroomImages[2]}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt="Showroom dedicated Makeup shelf with lip tints"
              />
            </div>
            <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-zinc-200/50 shadow-sm aspect-[1.55] w-full bg-zinc-50 relative group cursor-zoom-in">
              <img
                src={showroomImages[3]}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt="Showroom staff hand holding 10 percent discount coupon"
              />
            </div>
          </div>

          {/* Right Column of Gallery (2 tall vertical aspect-correct images) */}
          <div className="flex flex-col gap-4">
            <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-zinc-200/50 shadow-sm aspect-[3/4] w-full bg-zinc-50 relative group cursor-zoom-in">
              <img
                src={showroomImages[4]}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt="Showroom spacious interior shelves filled with cosmetic bottles"
              />
            </div>
            <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-zinc-200/50 shadow-sm aspect-[3/4] w-full bg-zinc-50 relative group cursor-zoom-in">
              <img
                src={showroomImages[5]}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt="Showroom premium branded shelf showing Some By Mi products"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

