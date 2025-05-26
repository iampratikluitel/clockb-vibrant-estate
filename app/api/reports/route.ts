import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import minioClient from "@/lib/minioClient";
import { BUCKET_NAME } from "@/lib/constants";

export async function GET() {
  try {
    console.log("Fetching reports...");
    const reports = await prisma.reports.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    console.log("Reports fetched successfully:", reports);
    return NextResponse.json(reports);
  } catch (error) {
    console.error("Error fetching reports:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch reports",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();

    // Get file from formData
    const file = formData.get('file') as File | null;
    if (!file) {
      return NextResponse.json({ error: 'File is required' }, { status: 400 });
    }

    // Get metadata JSON string and parse it
    const metadataString = formData.get('metadata') as string | null;
    if (!metadataString) {
      return NextResponse.json({ error: 'Metadata is required' }, { status: 400 });
    }

    const metadata = JSON.parse(metadataString);

    // Prepare file key for MinIO
    const fileKey = `reports/${Date.now()}_${file.name}`;

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload file to MinIO
    await minioClient.putObject(BUCKET_NAME, fileKey, buffer, buffer.length, {
      'Content-Type': file.type,
    });

    // Save report in DB, include file URL/path
    const report = await prisma.reports.create({
      data: {
        ...metadata,
        fileUrl: fileKey,
        date: new Date(metadata.date),
      },
    });

    return NextResponse.json(report);
  } catch (error) {
    console.error('Error creating report:', error);
    return NextResponse.json(
      {
        error: 'Failed to create report',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

