import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const body = await request.json();
    const { icon, title, description, buttonType, buttonText, fileUrl } = body;

    if (!icon || !title || !description || !buttonType || !buttonText) {
      return new NextResponse(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400 }
      );
    }

    const guide = await prisma.guide.update({
      where: { id: params.id },
      data: {
        icon,
        title,
        description,
        buttonType,
        buttonText,
        fileUrl,
        updatedAt: new Date()
      }
    });

    return NextResponse.json(guide);
  } catch (error) {
    console.error('Error updating guide:', error);
    return new NextResponse(
      JSON.stringify({ 
        error: 'Failed to update guide',
        details: error instanceof Error ? error.message : 'Unknown error'
      }), 
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    await prisma.guide.delete({
      where: { id: params.id }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting guide:', error);
    return new NextResponse(
      JSON.stringify({ 
        error: 'Failed to delete guide',
        details: error instanceof Error ? error.message : 'Unknown error'
      }), 
      { status: 500 }
    );
  }
} 