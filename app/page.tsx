import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { getFunFact } from "@/lib/facts";
import FavoriteMovieForm from "@/components/FavoriteMovieForm";

export default async function Home() {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { name: true, email: true, image: true, favoriteMovie: true },
  });

  if (!user) redirect("/login");

  if (!user.favoriteMovie) {
    // first-time prompt
    return (
      <main className="mx-auto max-w-lg p-6">
        <h1 className="text-xl font-semibold mb-4">Tell us your favorite movie</h1>
        <FavoriteMovieForm />
      </main>
    );
  }

  const fact = await getFunFact(user.favoriteMovie);

  return (
    <main className="mx-auto max-w-2xl p-6 space-y-6">
      <header className="flex items-center gap-4">
        {user.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.image} alt="avatar" className="size-14 rounded-full" />
        )}
        <div>
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
        <form action={async () => { "use server"; await signOut({ redirectTo: "/login" }); }} className="ml-auto">
          <button className="border rounded-xl px-3 py-1">Logout</button>
        </form>
      </header>

      <section className="rounded-2xl border p-4">
        <h3 className="font-semibold mb-1">Favorite movie</h3>
        <p className="mb-3">{user.favoriteMovie}</p>
        <div className="mt-2">
          <h4 className="font-medium">Fun fact (refresh for a new one)</h4>
          <p className="mt-1 text-lg">{fact}</p>
        </div>
      </section>
    </main>
  );
}