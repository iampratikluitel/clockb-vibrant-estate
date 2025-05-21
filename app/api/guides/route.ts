import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const guides = await prisma.guide.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    return NextResponse.json(guides);
  } catch (error) {
    console.error('Error fetching guides:', error);
    return new NextResponse(
      JSON.stringify({ 
        error: 'Failed to fetch guides',
        details: error instanceof Error ? error.message : 'Unknown error'
      }), 
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const body = await request.json();
    const { icon, title, description, buttonType, buttonText, fileUrl, fileName } = body; // Add fileName

    if (!icon || !title || !description || !buttonType || !buttonText) {
      return new NextResponse(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400 }
      );
    }

    const createData = {
      icon,
      title,
      description,
      buttonType,
      buttonText,
      fileUrl,
      fileName: fileName || title, // Store the original file name or use title as fallback
      guide: title,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const guide = await prisma.guide.create({
      data: createData
    });

    return NextResponse.json(guide);
  } catch (error) {
    console.error('Error creating guide:', error);
    return new NextResponse(
      JSON.stringify({ 
        error: 'Failed to create guide',
        details: error instanceof Error ? error.message : 'Unknown error'
      }), 
      { status: 500 }
    );
  }
}