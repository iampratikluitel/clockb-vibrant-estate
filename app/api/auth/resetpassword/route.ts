import { connectDb } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/model/user";

export const dynamic = "force-dynamic";
export async function POST(request: NextRequest) {
  console.log("Running POST request: Reset Password");

  try {
    const { token, password } = await request.json();
    await connectDb();
    console.log("MongoDB Connected");

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json(
        { message: "Link Invalid or Expired" },
        { status: 200 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();

    return NextResponse.json(
      { message: "Password Reset successfull" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
