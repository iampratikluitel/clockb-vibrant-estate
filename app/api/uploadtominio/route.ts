export const runtime = 'nodejs';

import { NextRequest, NextResponse } from "next/server";
import path from "path";
import minioClient from "@/lib/minioClient"
import { BUCKET_NAME } from "@/lib/constants";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  console.log("Uploading Document");
  try {
    const data = await request.formData();
    const uploadType: string | null = data.get("uploadType") as string | null;
    const fileEntries: FormDataEntryValue[] = data.getAll("file") as FormDataEntryValue[];

    if (!fileEntries || !uploadType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const files: File[] = fileEntries.map((entry) => entry as File);
    const uploadedFileNames = [];

    // Process and store each file individually
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uniqueId = Date.now().toString();
      const fileExtension = path.extname(file.name).slice(1);
      const filename = `${uploadType}_${uniqueId}_${i}.${fileExtension}`;
      const objectName = `${uploadType}/${filename}`;

      try {
        await minioClient.putObject(
          BUCKET_NAME,
          objectName,
          buffer,
          buffer.length,
          {
            "Content-Type": file.type || "application/octet-stream",
          }
        );
        console.log(`File uploaded to MinIO: ${objectName}`);
        uploadedFileNames.push(objectName);
      } catch (uploadError) {
        console.error(`Error uploading file ${file.name}:`, uploadError);
        throw new Error(`Failed to upload file ${file.name}`);
      }
    }

    if (uploadedFileNames.length === 0) {
      throw new Error("No files were uploaded successfully");
    }

    return new NextResponse(JSON.stringify(uploadedFileNames), { status: 201 });
  } catch (error) {
    console.error("Error uploading file(s) to MinIO:", error);
    return NextResponse.json(
      { 
        error: "Failed to upload file(s)",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
