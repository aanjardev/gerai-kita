import { createClient } from "@supabase/supabase-js";

// Tambahkan console.log di sini untuk debugging
console.log("URL dari .env:", import.meta.env.VITE_SUPABASE_URL);
console.log("Key dari .env:", import.meta.env.VITE_SUPABASE_ANON_KEY);

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
