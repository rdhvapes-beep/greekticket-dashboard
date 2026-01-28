"use client";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginPage() {
  const loginDiscord = async () => {
    const origin = window.location.origin;

    await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });
  };

  return (
    <div style={{ padding: 24 }}>
      <button onClick={loginDiscord}>
        Login with Discord
      </button>
    </div>
  );
}
