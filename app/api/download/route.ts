import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import minioClient from '@/lib/minioClient';

export const dynamic = 'force-dynamic';

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

    // Get file from MinIO
    const fileStream = await minioClient.getObject('projectestate', fileUrl);

    // Convert stream to buffer
    const chunks: Buffer[] = [];
    for await (const chunk of fileStream) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    if (buffer.length === 0) {
      return new NextResponse(JSON.stringify({ error: 'Empty file' }), { status: 204 });
    }

    // Detect file type by extension
    const fileName = fileUrl.split('/').pop() || 'download';
    const ext = fileName.split('.').pop()?.toLowerCase();

    let contentType = 'application/octet-stream';
    if (ext === 'pdf') {
      contentType = 'application/pdf';
    } else if (ext === 'docx') {
      contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    }

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${fileName}"`,
      },
    });
  } catch (error) {
    console.error('Error downloading file:', error);
    return new NextResponse(
      JSON.stringify({
        error: 'Failed to download file',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500 }
    );
  }
}
