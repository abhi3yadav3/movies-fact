"use client";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <main className="grid min-h-dvh place-items-center p-6">
      <div className="max-w-sm w-full rounded-2xl shadow p-6 text-center">
        <h1 className="text-2xl font-semibold mb-4">Welcome</h1>
        <p className="mb-6">Sign in to continue</p>
        <button
          className="rounded-xl px-4 py-2 border w-full"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          Continue with Google
        </button>
      </div>
    </main>
  );
}