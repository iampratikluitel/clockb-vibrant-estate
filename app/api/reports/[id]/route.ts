import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const { title, date, type, size, status, category, fileUrl } = data;

    // Validate required fields
    const missingFields = [];
    if (!title) missingFields.push('title');
    if (!date) missingFields.push('date');
    if (!type) missingFields.push('type');
    if (!size) missingFields.push('size');
    if (!status) missingFields.push('status');
    if (!category) missingFields.push('category');

    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          error: 'Missing required fields',
          details: `The following fields are required: ${missingFields.join(', ')}`
        },
        { status: 400 }
      );
    }

    // Try to parse the date
    let parsedDate;
    try {
      parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) {
        throw new Error('Invalid date');
      }
    } catch (error) {
      return NextResponse.json(
        { 
          error: 'Invalid date format',
          details: 'The date must be in a valid format (YYYY-MM-DD)'
        },
        { status: 400 }
      );
    }

    const report = await prisma.reports.update({
      where: { id: params.id },
      data: {
        title,
        date: parsedDate,
        type,
        size,
        status,
        category,
        fileUrl,
        updatedAt: new Date()
      },
    });
    return NextResponse.json(report);
  } catch (error) {
    console.error('Error updating report:', error);
    return NextResponse.json(
      { 
        error: 'Failed to update report',
        details: error instanceof Error ? error.message : 'Unknown error occurred'
      },
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
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.reports.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting report:', error);
    return NextResponse.json(
      { 
        error: 'Failed to delete report',
        details: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
} 