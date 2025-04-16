import { NextResponse, NextRequest } from "next/server";
import { connectDb } from "@/lib/mongodb";
import { sendMessage } from "@/lib/sendMessage";
import bcrypt from "bcryptjs";
import User from "@/model/user";

export const dynamic = "force-dynamic";

export const POST = async (request: NextRequest) => {
  console.log("Running POST request: Forgot Password");

  try {
    const { email } = await request.json();
    await connectDb();
    console.log("MongoDB Connected");
    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      const hashedToken = await bcrypt.hash(existingUser._id.toString(), 10);
      const updatedData = {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      };
      await existingUser.updateOne(updatedData);
      const messageObject = {
        subject: "Reset your password",
        message: `Click on the following link: <a href="${process.env.DOMAIN}resetpassword?token=${hashedToken}">Password Reset Link</a>`,
      };
      await sendMessage(existingUser.email, messageObject);
      return NextResponse.json(
        { message: "Reset Email Sent !!" },
        { status: 201 }
      );
    } else {
      return NextResponse.json({ message: "User Not Found" }, { status: 200 });
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: "Something went wrong" },
      {
        status: 400,
      }
    );
  }
};
