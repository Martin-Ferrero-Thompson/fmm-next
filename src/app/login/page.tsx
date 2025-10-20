"use client";

export const dynamic = 'force-dynamic';

import React, { useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export default function LoginPage() {
  const [supabase, setSupabase] = useState<unknown | null>(null);

  useEffect(() => {
    let mounted = true;
    // Dynamically import the browser-only Supabase client helper so the module
    // that depends on '@supabase/ssr' is not imported during server-side build.
    import('@/lib/supabase/client').then((mod) => {
      if (mounted) setSupabase(mod.createClient());
    });

    return () => { mounted = false };
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-semibold mb-6 text-center">FMM: Editor Hub Login</h1>
        {supabase ? (
          <Auth
            // Supabase client is dynamically imported; cast to any to satisfy
            // the Auth component's type requirements.
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            supabaseClient={supabase as any}
            providers={["github", "google"]}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: "#2563eb",
                    brandAccent: "#1e40af",
                  },
                },
              },
            }}
            theme="light"
            redirectTo={`${process.env.NEXT_PUBLIC_SITE_URL}/admin`}
          />
        ) : (
          <p className="text-center">Loading...</p>
        )}
      </div>
    </div>
  );
}
