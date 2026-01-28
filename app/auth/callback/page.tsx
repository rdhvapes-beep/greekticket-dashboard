"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AuthCallback() {
  useEffect(() => {
    supabase.auth.getSession().then(() => {
      window.location.href = "/";
    });
  }, []);

  return <p style={{ padding: 24 }}>Logging you in...</p>;
}
