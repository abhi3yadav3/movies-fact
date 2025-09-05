import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { movie } = await req.json();
  if (!movie || typeof movie !== "string") return NextResponse.json({ error: "bad request" }, { status: 400 });

  await prisma.user.update({ where: { email: session.user.email }, data: { favoriteMovie: movie.trim() } });
  return NextResponse.json({ ok: true });
}