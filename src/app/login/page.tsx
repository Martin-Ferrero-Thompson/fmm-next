"use client";

import { createClient } from "@/lib/supabase/client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const supabase = createClient();

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-semibold mb-6 text-center">FMM: Editor Hub Login</h1>
        <Auth
          supabaseClient={supabase}
          providers={["github", "google"]}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#2563eb", // Tailwind blue-600
                  brandAccent: "#1e40af", // Tailwind blue-800
                },
              },
            },
          }}
          theme="light"
          redirectTo={`${process.env.NEXT_PUBLIC_SITE_URL}/admin`}
        />
      </div>
    </div>
  );
}
