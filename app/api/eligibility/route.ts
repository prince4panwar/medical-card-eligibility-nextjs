import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "data/submissions.json");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, age, state, agree } = body;

    if (!name || !email || !age || age < 18 || !agree) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid submission data",
        },
        { status: 400 }
      );
    }

    const existing = JSON.parse(await fs.readFile(filePath, "utf-8"));

    const submission = {
      name,
      email,
      age,
      state,
      date: new Date().toISOString(),
    };

    existing.push(submission);

    await fs.writeFile(filePath, JSON.stringify(existing, null, 2));

    return NextResponse.json(
      {
        success: true,
        message: "Submission saved successfully",
        data: submission,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
