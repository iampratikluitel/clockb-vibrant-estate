import { currentUser } from "@/lib/auth";
import { BUCKET_NAME } from "@/lib/constants";
import minioClient from "@/lib/minioClient";
import { connectDb } from "@/lib/mongodb";
import InvestmentCircle from "@/model/about/investmentCircle";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const data = await request.json();
    await connectDb();

    if (data._id) {
      const existingConfig = await InvestmentCircle.findById(data._id);

      if (!existingConfig) {
        return NextResponse.json(
          { error: "About page configuration not found" },
          { status: 404 }
        );
      }
      
      // Delete old logo if it exists and has changed
      if (existingConfig.logo && existingConfig.logo !== data.logo) {
        try {
          await minioClient.removeObject(BUCKET_NAME, existingConfig.logo);
        } catch (logoError) {
          console.error("Error removing old logo:", logoError);
          // Continue with update even if logo removal fails
        }
      }

      await existingConfig.updateOne(data);
      return NextResponse.json(
        { message: "Updated successfully" },
        { status: 200 }
      );
    } else {
      const newConfig = new InvestmentCircle(data);
      await newConfig.save();
      return NextResponse.json(
        { message: "Created successfully" },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error updating about page:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    await connectDb();
    const data = await InvestmentCircle.findOne();

    if (!data) {
      return NextResponse.json(
        { error: "No about page data found" },
        { status: 404 }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching about page data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
};