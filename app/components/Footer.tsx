"use client";

import { useApp } from "../context/AppContext";
import { usePathname } from "next/navigation";

export default function Footer() {
  const { setToastMessage } = useApp();

  const pathname = usePathname();
  const isAdminOrDashboard = pathname?.startsWith("/admin") || pathname?.startsWith("/dashboard");

  if (isAdminOrDashboard) {
    return null;
  }

  return (
    <footer className="w-full bg-white border-t border-zinc-100 text-zinc-600 pt-16 pb-8 relative z-30 select-text">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:grid md:grid-cols-4 gap-10 md:gap-12 items-start">
        
        {/* 1. Logo and Help row in Mobile View */}
        <div className="flex md:hidden flex-row items-center justify-between gap-4 w-full select-none pb-6">
          {/* Logo on left */}
          <div className="w-24 h-12 relative">
            <img 
              src="https://beautybooth.com.bd/cab.png" 
              className="w-full h-full object-contain object-left" 
              alt="e-CAB Member Logo" 
            />
          </div>

          {/* Helpline on right in rounded card */}
          <div className="bg-[#EDF2F7]/50 border border-zinc-100 rounded-[24px] py-2 px-3.5 flex items-center gap-2 max-w-[220px] shrink-0 select-text">
            <div className="w-9 h-9 rounded-full border border-[#10B981] bg-white flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-[#10B981]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4 14c0-4.4 3.6-8 8-8s8 3.6 8 8M3 14h2M19 14h2M5 14a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H3v-6M21 14a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2v-6" />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[11px] font-black text-gray-900 leading-tight">Need Help?</span>
              <span className="text-[11px] font-bold text-zinc-700 mt-1 leading-tight hover:text-[#e11d48] cursor-pointer">+8801952190142</span>
              <span className="text-[11px] font-bold text-zinc-700 mt-0.5 leading-tight hover:text-[#e11d48] cursor-pointer">+8801604629866</span>
            </div>
          </div>
        </div>

        {/* 2. Logo and Help in Desktop View */}
        <div className="hidden md:flex flex-col gap-5">
          {/* e-CAB member logo */}
          <div className="w-24 h-12 relative select-none">
            <img 
              src="https://beautybooth.com.bd/cab.png" 
              className="w-full h-full object-contain object-left" 
              alt="e-CAB Member Logo" 
            />
          </div>

          {/* Helpline details */}
          <div className="flex flex-col gap-2 select-text">
            <h5 className="text-base font-extrabold text-zinc-950 block tracking-tight">Need Help?</h5>
            <span className="text-sm font-bold text-zinc-800 block hover:text-[#e11d48] transition-colors cursor-pointer">+8801952190142</span>
            <span className="text-sm font-bold text-zinc-800 block hover:text-[#e11d48] transition-colors cursor-pointer">+8801604629866</span>
          </div>
        </div>

        {/* 3. Links Section Grid for Mobile View */}
        <div className="grid md:hidden grid-cols-2 gap-x-8 gap-y-4 w-full text-left py-6 border-t border-zinc-100 select-none">
          {/* Column 1 */}
          <ul className="flex flex-col gap-4 text-sm font-bold text-zinc-800">
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); setToastMessage("Navigating to Home"); }} className="hover:text-[#e11d48] transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); setToastMessage("Loading FAQ..."); }} className="hover:text-[#e11d48] transition-colors">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); setToastMessage("Loading Careers page..."); }} className="hover:text-[#e11d48] transition-colors">
                Career
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); setToastMessage("Opening Contact channels..."); }} className="hover:text-[#e11d48] transition-colors">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); setToastMessage("Loading Blog details..."); }} className="hover:text-[#e11d48] transition-colors">
                Blog
              </a>
            </li>
          </ul>

          {/* Column 2 */}
          <ul className="flex flex-col gap-4 text-sm font-bold text-zinc-800">
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); setToastMessage("Loading About Us page..."); }} className="hover:text-[#e11d48] transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); setToastMessage("Opening Privacy Policies..."); }} className="hover:text-[#e11d48] transition-colors">
                Privacy Policies
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); setToastMessage("Opening Terms & Conditions..."); }} className="hover:text-[#e11d48] transition-colors">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); setToastMessage("Opening Return & Refund Policy..."); }} className="hover:text-[#e11d48] transition-colors">
                Return & Refund Policy
              </a>
            </li>
          </ul>
        </div>

        {/* 4. Column 2: Directory Links (Desktop only) */}
        <div className="hidden md:flex flex-col pt-1">
          <ul className="flex flex-col gap-3.5 text-sm font-bold text-zinc-800">
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); setToastMessage("Navigating to Home"); }} className="hover:text-[#e11d48] transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); setToastMessage("Loading FAQ..."); }} className="hover:text-[#e11d48] transition-colors">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); setToastMessage("Loading Careers page..."); }} className="hover:text-[#e11d48] transition-colors">
                Career
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); setToastMessage("Opening Contact channels..."); }} className="hover:text-[#e11d48] transition-colors">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); setToastMessage("Loading Blog details..."); }} className="hover:text-[#e11d48] transition-colors">
                Blog
              </a>
            </li>
          </ul>
        </div>

        {/* 5. Column 3: Compliance Links (Desktop only) */}
        <div className="hidden md:flex flex-col pt-1">
          <ul className="flex flex-col gap-3.5 text-sm font-bold text-zinc-800">
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); setToastMessage("Loading About Us page..."); }} className="hover:text-[#e11d48] transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); setToastMessage("Opening Privacy Policies..."); }} className="hover:text-[#e11d48] transition-colors">
                Privacy Policies
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); setToastMessage("Opening Terms & Conditions..."); }} className="hover:text-[#e11d48] transition-colors">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); setToastMessage("Opening Return & Refund Policy..."); }} className="hover:text-[#e11d48] transition-colors">
                Return & Refund Policy
              </a>
            </li>
          </ul>
        </div>

        {/* 6. Column 4: App Download & Social Media (Desktop only) */}
        <div className="hidden md:flex flex-col gap-5 pt-1">
          <h5 className="text-base font-extrabold text-zinc-950 block tracking-tight">Download our App</h5>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setToastMessage("Redirecting to App Store...")}
              className="w-[110px] h-[36px] bg-black hover:bg-zinc-900 rounded-md overflow-hidden transition-all shadow-sm cursor-pointer flex items-center justify-center border border-zinc-800 active:scale-95 duration-100"
            >
              <img src="https://beautybooth.com.bd/Apple%20Store.png" className="w-full h-full object-contain" alt="Apple Store Download Badge" />
            </button>
            <button 
              onClick={() => setToastMessage("Redirecting to Google Play...")}
              className="w-[110px] h-[36px] bg-black hover:bg-zinc-900 rounded-md overflow-hidden transition-all shadow-sm cursor-pointer flex items-center justify-center border border-zinc-800 active:scale-95 duration-100"
            >
              <img src="https://beautybooth.com.bd/Google%20Play.png" className="w-full h-full object-contain" alt="Google Play Store Download Badge" />
            </button>
          </div>

          <div className="flex items-center gap-4 pt-1 text-zinc-800 select-none">
            <button onClick={() => setToastMessage("Opening WhatsApp...")} className="hover:text-[#25D366] transition-colors cursor-pointer active:scale-95 duration-100" title="WhatsApp">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.729-1.446L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.114-2.905-6.99C16.458 1.875 13.987 1.84 11.35 1.84c-5.436 0-9.864 4.429-9.867 9.869-.001 1.77.462 3.5 1.342 5.037l-.993 3.626 3.718-.975zm11.238-7.05c-.329-.165-1.954-.965-2.253-1.074-.3-.109-.518-.165-.736.165-.218.329-.844 1.074-1.036 1.293-.19.218-.382.245-.711.08-3.085-1.554-4.545-2.858-5.322-4.19-.19-.329-.02-.507.145-.671.149-.148.329-.382.493-.574.165-.19.22-.329.329-.548.11-.218.056-.41-.028-.574-.084-.165-.736-1.774-1.008-2.43-.265-.64-.537-.552-.736-.563-.19-.011-.408-.013-.627-.013-.218 0-.573.082-.873.41-.3.329-1.145 1.118-1.145 2.727 0 1.609 1.172 3.161 1.335 3.38 1.63 2.181 3.791 3.513 5.926 4.312 2.135.8 2.135.533 2.954.453.818-.08 1.954-.798 2.227-1.529.273-.73.273-1.357.19-1.488-.082-.132-.3-.218-.629-.383z"/></svg>
            </button>
            <button onClick={() => setToastMessage("Opening Facebook...")} className="hover:text-[#1877F2] transition-colors cursor-pointer active:scale-95 duration-100" title="Facebook">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </button>
            <button onClick={() => setToastMessage("Opening Instagram...")} className="hover:text-[#E4405F] transition-colors cursor-pointer active:scale-95 duration-100" title="Instagram">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </button>
            <button onClick={() => setToastMessage("Opening YouTube...")} className="hover:text-[#FF0000] transition-colors cursor-pointer active:scale-95 duration-100" title="YouTube">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
            </button>
            <button onClick={() => setToastMessage("Opening X...")} className="hover:text-black transition-colors cursor-pointer active:scale-95 duration-100" title="X (Twitter)">
              <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </button>
          </div>
        </div>

        {/* 7. App Download & Social Media (Mobile only) */}
        <div className="flex md:hidden flex-col items-center gap-5 w-full pt-6 border-t border-zinc-100 select-none">
          <h5 className="text-sm font-extrabold text-zinc-950 block tracking-tight">Download our App</h5>
          
          <div className="flex items-center justify-center gap-3">
            <button 
              onClick={() => setToastMessage("Redirecting to App Store...")}
              className="w-[110px] h-[36px] bg-black hover:bg-zinc-900 rounded-md overflow-hidden flex items-center justify-center border border-zinc-800 active:scale-95 duration-100"
            >
              <img src="https://beautybooth.com.bd/Apple%20Store.png" className="w-full h-full object-contain" alt="Apple Store Download Badge" />
            </button>
            <button 
              onClick={() => setToastMessage("Redirecting to Google Play...")}
              className="w-[110px] h-[36px] bg-black hover:bg-zinc-900 rounded-md overflow-hidden flex items-center justify-center border border-zinc-800 active:scale-95 duration-100"
            >
              <img src="https://beautybooth.com.bd/Google%20Play.png" className="w-full h-full object-contain" alt="Google Play Store Download Badge" />
            </button>
          </div>

          <div className="flex items-center justify-center gap-5 pt-2 text-zinc-800">
            <button onClick={() => setToastMessage("Opening WhatsApp...")} className="hover:text-[#25D366] transition-colors cursor-pointer active:scale-95 duration-100"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.729-1.446L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.114-2.905-6.99C16.458 1.875 13.987 1.84 11.35 1.84c-5.436 0-9.864 4.429-9.867 9.869-.001 1.77.462 3.5 1.342 5.037l-.993 3.626 3.718-.975zm11.238-7.05c-.329-.165-1.954-.965-2.253-1.074-.3-.109-.518-.165-.736.165-.218.329-.844 1.074-1.036 1.293-.19.218-.382.245-.711.08-3.085-1.554-4.545-2.858-5.322-4.19-.19-.329-.02-.507.145-.671.149-.148.329-.382.493-.574.165-.19.22-.329.329-.548.11-.218.056-.41-.028-.574-.084-.165-.736-1.774-1.008-2.43-.265-.64-.537-.552-.736-.563-.19-.011-.408-.013-.627-.013-.218 0-.573.082-.873.41-.3.329-1.145 1.118-1.145 2.727 0 1.609 1.172 3.161 1.335 3.38 1.63 2.181 3.791 3.513 5.926 4.312 2.135.8 2.135.533 2.954.453.818-.08 1.954-.798 2.227-1.529.273-.73.273-1.357.19-1.488-.082-.132-.3-.218-.629-.383z"/></svg></button>
            <button onClick={() => setToastMessage("Opening Facebook...")} className="hover:text-[#1877F2] transition-colors cursor-pointer active:scale-95 duration-100"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></button>
            <button onClick={() => setToastMessage("Opening Instagram...")} className="hover:text-[#E4405F] transition-colors cursor-pointer active:scale-95 duration-100"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></button>
            <button onClick={() => setToastMessage("Opening YouTube...")} className="hover:text-[#FF0000] transition-colors cursor-pointer active:scale-95 duration-100"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg></button>
            <button onClick={() => setToastMessage("Opening X...")} className="hover:text-black transition-colors cursor-pointer active:scale-95 duration-100"><svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></button>
          </div>
        </div>

      </div>

      {/* 8. Bottom bar: Address & Copyright (Centered for perfect mockup mapping) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 border-t border-zinc-150 pt-8">
        <div className="flex flex-col items-center justify-center gap-4 text-center select-none">
          <div className="flex flex-col items-center gap-2">
            <svg className="w-5 h-5 text-[#FF1A58]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="text-zinc-950 font-extrabold text-sm block">Address:</span>
            <span className="text-zinc-500 font-semibold text-xs leading-relaxed max-w-[280px] sm:max-w-md">
              Faridpur sadar, Faridpur
            </span>
          </div>
          <div className="text-zinc-400 font-semibold text-xs pt-2">
            <span>© 2026 Glow Market BD. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
