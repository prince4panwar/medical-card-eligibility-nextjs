import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    console.log("LOGIN REQUEST:", { email, password });
    console.log("ENV:", {
      ADMIN_EMAIL: process.env.ADMIN_EMAIL,
      ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
      ADMIN_SECRET: process.env.ADMIN_SECRET,
    });

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    if (!process.env.ADMIN_SECRET) {
      throw new Error("ADMIN_SECRET is missing");
    }

    const token = jwt.sign({ email }, process.env.ADMIN_SECRET, {
      expiresIn: "1h",
    });

    const res = NextResponse.json({ success: true });

    res.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60,
    });

    return res;
  } catch (err: any) {
    console.error("LOGIN ERROR:", err);
    return NextResponse.json(
      { error: "Internal Server Error", message: err.message },
      { status: 500 }
    );
  }
}
