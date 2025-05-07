import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import minioClient from '@/lib/minioClient';

export async function DELETE(
  request: Request,
  { params }: { params: { filename: string } }
) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const filename = params.filename;

    // Delete from MinIO
    await minioClient.removeObject('projectestate', filename);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting file:', error);
    return new NextResponse(
      JSON.stringify({ 
        error: 'Failed to delete file',
        details: error instanceof Error ? error.message : 'Unknown error'
      }), 
      { status: 500 }
    );
  }
} 