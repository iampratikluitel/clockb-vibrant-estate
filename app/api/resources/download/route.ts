import { NextResponse } from 'next/server';
import minioClient from '@/lib/minioClient';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename) {
      return new NextResponse(JSON.stringify({ error: 'Filename is required' }), { status: 400 });
    }

    // Get the file from MinIO
    const fileStream = await minioClient.getObject('projectestate', filename);
    
    // Convert the stream to a buffer
    const chunks: Buffer[] = [];
    for await (const chunk of fileStream) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    // Get the original filename from the path
    const originalFilename = filename.split('/').pop();

    // Return the file with appropriate headers
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${originalFilename}"`,
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