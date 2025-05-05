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
    console.log('Raw request body:', body); // Debug log

    const { icon, title, description, buttonType, buttonText, fileUrl } = body;

    if (!icon || !title || !description || !buttonType || !buttonText) {
      return new NextResponse(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400 }
      );
    }

    // Debug log
    console.log('Creating guide with data:', {
      icon,
      title,
      description,
      buttonType,
      buttonText,
      fileUrl
    });

    // Verify prisma client
    if (!prisma || !prisma.guide) {
      console.error('Prisma client not properly initialized:', {
        hasPrisma: !!prisma,
        hasGuide: prisma ? 'guide' in prisma : false,
        models: prisma ? Object.keys(prisma) : []
      });
      throw new Error('Database client not properly initialized');
    }

    const createData = {
      icon,
      title,
      description,
      buttonType,
      buttonText,
      fileUrl,
      guide: title, // Use the title as the guide field value
      createdAt: new Date(),
      updatedAt: new Date()
    };
    console.log('Data being sent to Prisma:', createData); // Debug log

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