import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const docs = await prisma.InvestmentDoc.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(docs);
  } catch (error) {
    console.error("Error fetching investment documents:", error);
    return NextResponse.json(
      { error: "Failed to fetch investment documents" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { icon, title, description, buttonText, fileUrl } =
      await request.json();

    if (!icon || !title || !description || !buttonText) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const doc = await prisma.InvestmentDoc.create({
      data: {
        icon,
        title,
        description,
        buttonText,
        fileUrl,
        // You don't need to set createdAt/updatedAt manually if you make them @default(now())
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(doc, { status: 201 });
  } catch (error) {
    console.error("Error creating investment document:", error);
    return NextResponse.json(
      { error: "Failed to create investment document" },
      { status: 500 }
    );
  }
}
