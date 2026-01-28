"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const login = async () => {
    setLoading(true);
    setMsg(null);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    setLoading(false);

    if (error) setMsg(error.message);
    else setMsg("✅ Στάλθηκε login link στο email σου. Άνοιξέ το για να συνδεθείς.");
  };

  return (
    <main style={{ padding: 24, maxWidth: 420, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700 }}>Login</h1>
      <p style={{ opacity: 0.8 }}>Βάλε email για magic link.</p>

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email@domain.com"
        style={{ width: "100%", padding: 12, marginTop: 12 }}
      />

      <button
        onClick={login}
        disabled={loading || !email}
        style={{ width: "100%", padding: 12, marginTop: 12 }}
      >
        {loading ? "Sending..." : "Send magic link"}
      </button>

      {msg && <p style={{ marginTop: 12 }}>{msg}</p>}
    </main>
  );
}
