import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const correct = process.env.CV_PASSWORD;

  if (!correct) {
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  if (password !== correct) {
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("cv_access", process.env.CV_TOKEN ?? "granted", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/cv",
  });
  return res;
}
