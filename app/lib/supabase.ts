import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// Fallback to avoid "supabaseUrl is required" or invalid URL errors during startup
const safeUrl = supabaseUrl || "https://placeholder-project.supabase.co";
const safeKey = supabaseAnonKey || "placeholder-key";

if (!supabaseUrl || !supabaseAnonKey) {
  if (typeof window !== "undefined") {
    console.warn(
      "Supabase credentials missing. Using fallback/placeholder client."
    );
  }
}

export const supabase = createClient(safeUrl, safeKey);
export const hasValidSupabaseConfig = !!(supabaseUrl && supabaseAnonKey);
