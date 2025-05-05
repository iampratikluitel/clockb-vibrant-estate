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

    const raw = await request.text();
    console.log('[api/upload] raw body →', raw);
    let body;
    try {
      body = JSON.parse(raw);
    } catch (e) {
      console.error('[api/upload] JSON parse failed:', e);
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }
    console.log('[api/upload] parsed body →', body);

    const { filename, contentType } = body;

    if (!filename || !contentType) {
      console.error('[api/upload] missing required fields:', { filename, contentType });
      return new NextResponse(
        JSON.stringify({ error: 'Filename and content type are required' }), 
        { status: 400 }
      );
    }

    // Generate a unique key for the file
    const extension = filename.split('.').pop();
    const key = `legal-documents/${uuidv4()}.${extension}`;

    console.log('[api/upload] generating presigned URL for:', { key, contentType });

    try {
      // Generate a presigned URL for upload
      const presignedUrl = await minioClient.presignedPutObject(
        "projectestate",
        key,
        60 * 5 // URL expires in 5 minutes
      );

      console.log('[api/upload] generated presigned URL successfully');

      return NextResponse.json({
        url: presignedUrl,
        key: key
      });
    } catch (minioError) {
      console.error('[api/upload] MinIO error:', minioError);
      return new NextResponse(
        JSON.stringify({ 
          error: 'Failed to generate upload URL',
          details: minioError instanceof Error ? minioError.message : 'Unknown MinIO error'
        }), 
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('[api/upload] unexpected error:', error);
    return new NextResponse(
      JSON.stringify({ 
        error: 'Failed to process upload request',
        details: error instanceof Error ? error.message : 'Unknown error'
      }), 
      { status: 500 }
    );
  }
} 