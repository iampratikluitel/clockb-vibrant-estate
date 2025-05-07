import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import minioClient from '@/lib/minioClient';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const category = formData.get('category') as string;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    if (!file || !category || !title) {
      return new NextResponse(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate a unique filename
    const extension = file.name.split('.').pop();
    const filename = `${category}/${uuidv4()}.${extension}`;

    // Upload to MinIO
    await minioClient.putObject(
      'projectestate',
      filename,
      buffer,
      buffer.length,
      {
        'Content-Type': file.type,
      }
    );

    return NextResponse.json({ 
      success: true,
      filename,
      title,
      description,
      category,
      type: file.type,
      size: file.size,
      date: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return new NextResponse(
      JSON.stringify({ 
        error: 'Failed to upload file',
        details: error instanceof Error ? error.message : 'Unknown error'
      }), 
      { status: 500 }
    );
  }
} 