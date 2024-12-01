import { NextResponse } from "next/server";
import { loginUser } from "@/utils/loginUser";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  try {
    const token = await loginUser(email, password);
    return NextResponse.json({ message: "Login successful", token });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
