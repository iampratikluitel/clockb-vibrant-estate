import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import minioClient from '@/lib/minioClient';

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const fileUrl = searchParams.get('fileUrl');

    if (!fileUrl) {
      return new NextResponse(JSON.stringify({ error: 'File URL is required' }), { status: 400 });
    }

    // Get the file from MinIO
    const fileStream = await minioClient.getObject('projectestate', fileUrl);
    
    // Convert the stream to a buffer
    const chunks: Buffer[] = [];
    for await (const chunk of fileStream) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    // Return the file with appropriate headers
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${fileUrl.split('/').pop()}"`,
      },
    });
  } catch (error) {
    console.error('Error downloading file:', error);
    return new NextResponse(
      JSON.stringify({ 
        error: 'Failed to download file',
        details: error instanceof Error ? error.message : 'Unknown error'
      }), 
      { status: 500 }
    );
  }
} 