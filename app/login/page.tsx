"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && (!name || !phone))) {
      setError("Please fill in all details.");
      return;
    }
    setError("");

    // Simulate login and set auth state
    localStorage.setItem("isLoggedIn", "true");
    if (!isLogin) {
      localStorage.setItem("userName", name);
      localStorage.setItem("userPhone", phone);
    }
    
    // Redirect to account page
    router.push("/account");
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex items-start justify-center pt-2 sm:pt-4 p-4 select-none">
      <div className="w-full max-w-md bg-white rounded-[32px] p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] relative overflow-hidden">
        {/* Top Decorative Glowing Radial */}
        <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-rose-300/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-[#FF1A58]/10 blur-3xl" />

        {/* Back to Home button */}
        <button 
          onClick={() => router.push("/")}
          className="absolute top-6 left-6 w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-500 transition-colors cursor-pointer"
        >
          <svg className="w-4.5 h-4.5 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Brand Logo Header */}
        <div className="text-center mt-6 mb-8 flex flex-col items-center">
          <div className="w-14 h-14 rounded-full bg-[#FCE1E4] flex items-center justify-center shadow-xs mb-4">
            <span className="text-[11px] font-black tracking-wider text-zinc-900 font-serif leading-none">GLOW</span>
          </div>
          <h2 className="text-3xl font-black text-zinc-950 font-serif tracking-tight">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-xs font-black tracking-widest text-[#FF1A58] opacity-90 mt-1.5 uppercase">
            {isLogin ? "Authentic Beauty Market" : "Join Glow Market BD VIP Club"}
          </p>
        </div>

        {/* Tabs switcher */}
        <div className="bg-zinc-100 p-1.5 rounded-2xl grid grid-cols-2 gap-1 mb-8">
          <button 
            type="button"
            onClick={() => { setIsLogin(true); setError(""); }}
            className={`py-3 rounded-xl text-sm font-black uppercase tracking-wider transition-all cursor-pointer ${isLogin ? "bg-white text-zinc-950 shadow-xs" : "text-zinc-500 hover:text-zinc-800"}`}
          >
            Log In
          </button>
          <button 
            type="button"
            onClick={() => { setIsLogin(false); setError(""); }}
            className={`py-3 rounded-xl text-sm font-black uppercase tracking-wider transition-all cursor-pointer ${!isLogin ? "bg-white text-zinc-950 shadow-xs" : "text-zinc-500 hover:text-zinc-800"}`}
          >
            Sign Up
          </button>
        </div>

        {/* Form container */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {error && (
            <div className="bg-rose-50 text-rose-600 border border-rose-100 rounded-xl px-4 py-3 text-xs font-bold text-left">
              ⚠️ {error}
            </div>
          )}

          {!isLogin && (
            <>
              <div>
                <label className="text-[11px] font-black uppercase text-zinc-400 tracking-wider">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Shawon Ahmed"
                  className="w-full bg-zinc-100/75 hover:bg-zinc-100 focus:bg-white border-none rounded-2xl px-4 py-3.5 text-sm font-bold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-rose-200 mt-1.5 transition-all"
                />
              </div>
              <div>
                <label className="text-[11px] font-black uppercase text-zinc-400 tracking-wider">Phone Number</label>
                <input 
                  type="text" 
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="e.g. 01952190142"
                  className="w-full bg-zinc-100/75 hover:bg-zinc-100 focus:bg-white border-none rounded-2xl px-4 py-3.5 text-sm font-bold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-rose-200 mt-1.5 transition-all"
                />
              </div>
            </>
          )}

          <div>
            <label className="text-[11px] font-black uppercase text-zinc-400 tracking-wider">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="e.g. shawonetc@gmail.com"
              className="w-full bg-zinc-100/75 hover:bg-zinc-100 focus:bg-white border-none rounded-2xl px-4 py-3.5 text-sm font-bold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-rose-200 mt-1.5 transition-all"
            />
          </div>

          <div>
            <div className="flex justify-between items-center">
              <label className="text-[11px] font-black uppercase text-zinc-400 tracking-wider">Password</label>
              {isLogin && (
                <button type="button" className="text-xs font-black uppercase text-[#FF1A58] hover:underline cursor-pointer">
                  Forgot?
                </button>
              )}
            </div>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-zinc-100/75 hover:bg-zinc-100 focus:bg-white border-none rounded-2xl px-4 py-3.5 text-sm font-bold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-rose-200 mt-1.5 transition-all"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-[#FF1A58] to-[#e11d48] hover:from-[#e11d48] hover:to-[#be185d] text-white font-extrabold text-sm uppercase py-4 rounded-2xl shadow-[0_4px_20px_rgba(255,26,88,0.3)] transition-all duration-300 cursor-pointer text-center mt-3 active:scale-98"
          >
            {isLogin ? "Sign In" : "Register"}
          </button>
        </form>

        {/* Social Authentication divider */}
        <div className="flex items-center my-8">
          <div className="flex-1 h-[0.5px] bg-zinc-200" />
          <span className="text-[11px] font-bold uppercase text-zinc-400 px-4 tracking-widest">Or login with</span>
          <div className="flex-1 h-[0.5px] bg-zinc-200" />
        </div>

        {/* Social logins */}
        <div className="grid grid-cols-2 gap-4 mb-2">
          <button 
            onClick={() => {
              localStorage.setItem("isLoggedIn", "true");
              router.push("/account");
            }}
            type="button" 
            className="flex items-center justify-center gap-2.5 border-none rounded-2xl py-3.5 text-sm font-black uppercase text-zinc-800 bg-zinc-100 hover:bg-zinc-200 active:scale-98 cursor-pointer transition-colors shadow-2xs"
          >
            <svg className="w-4.5 h-4.5" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5.04c1.62 0 3.08.56 4.22 1.65l3.15-3.15C17.45 1.84 14.93 1 12 1 7.37 1 3.4 3.73 1.58 7.7l3.82 2.96C6.3 7.62 8.92 5.04 12 5.04z" />
              <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.46h6.47c-.28 1.48-1.11 2.73-2.37 3.58l3.68 2.85c2.15-1.98 3.71-4.9 3.71-8.53z" />
              <path fill="#FBBC05" d="M5.4 14.34c-.24-.7-.37-1.44-.37-2.21 0-.77.13-1.51.37-2.21L1.58 6.96C.57 8.97 0 11.21 0 13.5c0 2.29.57 4.53 1.58 6.54l3.82-2.96z" />
              <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.68-2.85c-1.02.68-2.33 1.09-4.28 1.09-3.08 0-5.7-2.58-6.63-5.62L1.58 15.8C3.4 19.77 7.37 23 12 23z" />
            </svg>
            <span>Google</span>
          </button>
          <button 
            onClick={() => {
              localStorage.setItem("isLoggedIn", "true");
              router.push("/account");
            }}
            type="button" 
            className="flex items-center justify-center gap-2.5 border-none rounded-2xl py-3.5 text-sm font-black uppercase text-zinc-800 bg-zinc-100 hover:bg-zinc-200 active:scale-98 cursor-pointer transition-colors shadow-2xs"
          >
            <svg className="w-4.5 h-4.5 fill-current text-[#1877F2]" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span>Facebook</span>
          </button>
        </div>

      </div>
    </div>
  );
}
