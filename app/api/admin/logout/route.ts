import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const url = new URL("/", req.url);
  const res = NextResponse.redirect(url);

  res.cookies.set("auth_token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  return res;
}
