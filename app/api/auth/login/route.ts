import { connectDb } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export default async function handler(req: NextRequest, res: NextResponse) {
  if (req.method === "POST") {
    const { email, password } = await req.json();

    // Check if email and password match admin credentials
    if (email === process.env.ADMIN_EMAIL) {
      const adminPassword = process.env.ADMIN_PASSWORD;
      if (!adminPassword) {
        return NextResponse.json({ message: "Server error" }, { status: 500 });
      }
      const isPasswordValid = await bcrypt.compare(password, adminPassword);
      console.log("password", isPasswordValid);

      if (isPasswordValid) {
        return NextResponse.json(
          { message: "Login successful" },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { message: "Invalid password" },
          { status: 401 }
        );
      }
    } else {
      return NextResponse.json({ message: "Invalid email" }, { status: 401 });
    }
  } else {
    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: 405 }
    );
  }
}
