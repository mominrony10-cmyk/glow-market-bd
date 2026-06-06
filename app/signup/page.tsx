"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase, hasValidSupabaseConfig } from "../lib/supabase";

export default function SignupPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && (!name || !phone))) {
      setError("Please fill in all details.");
      return;
    }
    setError("");
    setLoading(true);

    if (hasValidSupabaseConfig) {
      try {
        if (isLogin) {
          const { data, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (authError) throw authError;
          
          localStorage.setItem("isLoggedIn", "true");
          router.push("/account");
        } else {
          const { data, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                name,
                phone,
              },
            },
          });
          if (authError) throw authError;

          if (data.user && !data.session) {
            setError("Registration successful! Please check your email to confirm your account.");
          } else {
            localStorage.setItem("isLoggedIn", "true");
            router.push("/account");
          }
        }
      } catch (err: any) {
        setError(err.message || "An authentication error occurred.");
      } finally {
        setLoading(false);
      }
    } else {
      // Simulate login and set auth state
      localStorage.setItem("isLoggedIn", "true");
      if (!isLogin) {
        localStorage.setItem("userName", name);
        localStorage.setItem("userPhone", phone);
      }
      setLoading(false);
      // Redirect to account page
      router.push("/account");
    }
  };

  const handleOAuthLogin = async (provider: "google" | "facebook") => {
    setError("");
    if (hasValidSupabaseConfig) {
      try {
        const { error: authError } = await supabase.auth.signInWithOAuth({
          provider,
          options: {
            redirectTo: `${window.location.origin}/account`,
          },
        });
        if (authError) throw authError;
      } catch (err: any) {
        setError(err.message || `Failed to sign in with ${provider}.`);
      }
    } else {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/account");
    }
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
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#FF1A58] to-[#e11d48] hover:from-[#e11d48] hover:to-[#be185d] text-white font-extrabold text-sm uppercase py-4 rounded-2xl shadow-[0_4px_20px_rgba(255,26,88,0.3)] transition-all duration-300 cursor-pointer text-center mt-3 active:scale-98 disabled:opacity-50"
          >
            {loading ? (isLogin ? "Signing In..." : "Registering...") : (isLogin ? "Sign In" : "Register")}
          </button>
        </form>
      </div>
    </div>
  );
}
