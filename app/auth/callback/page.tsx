"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const run = async () => {
      // Το supabase-js διαβάζει το #access_token από το URL (implicit flow)
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        router.replace("/login?error=oauth_failed");
        return;
      }

      router.replace("/");
    };

    run();
  }, [router]);

  return (
    <div style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <p>Completing login...</p>
    </div>
  );
}
