import { NextResponse } from 'next/server';
import minioClient from '@/lib/minioClient';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const fileUrl = searchParams.get('fileUrl');

    if (!fileUrl) {
      return new NextResponse('File URL is required', { status: 400 });
    }

    // Get the file from MinIO
    const fileStream = await minioClient.getObject('projectestate', fileUrl);
    
    // Get file metadata
    const stat = await minioClient.statObject('projectestate', fileUrl);
    
    // Determine content type based on file extension if not in metadata
    let contentType = stat.metaData?.['content-type'];
    if (!contentType) {
      const extension = fileUrl.split('.').pop()?.toLowerCase();
      switch (extension) {
        case 'pdf':
          contentType = 'application/pdf';
          break;
        case 'jpg':
        case 'jpeg':
          contentType = 'image/jpeg';
          break;
        case 'png':
          contentType = 'image/png';
          break;
        case 'gif':
          contentType = 'image/gif';
          break;
        case 'webp':
          contentType = 'image/webp';
          break;
        case 'svg':
          contentType = 'image/svg+xml';
          break;
        default:
          contentType = 'application/octet-stream';
      }
    }

    // Convert the stream to a buffer
    const chunks: Buffer[] = [];
    for await (const chunk of fileStream) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    // Set appropriate headers
    const headers = new Headers();
    headers.set('Content-Type', contentType);
    headers.set('Content-Length', buffer.length.toString());
    headers.set('Content-Disposition', 'inline');
    headers.set('Cache-Control', 'public, max-age=31536000');
    headers.set('Accept-Ranges', 'bytes');

    // Return the file with appropriate headers
    return new NextResponse(buffer, {
      headers,
      status: 200,
    });
  } catch (error) {
    console.error('Error streaming file:', error);
    return new NextResponse(
      JSON.stringify({ 
        error: 'Error streaming file',
        details: error instanceof Error ? error.message : 'Unknown error'
      }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
} 