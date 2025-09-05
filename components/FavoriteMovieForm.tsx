"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FavoriteMovieForm() {
  const [movie, setMovie] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!movie.trim()) return;
    setLoading(true);
    const res = await fetch("/api/favorite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movie }),
    });
    setLoading(false);
    if (res.ok) router.refresh();
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <input
        className="w-full border rounded-xl px-3 py-2"
        placeholder="e.g., The Matrix"
        value={movie}
        onChange={(e) => setMovie(e.target.value)}
      />
      <button disabled={loading} className="border rounded-xl px-3 py-2">
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
}