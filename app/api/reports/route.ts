import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function GET() {
  try {
    console.log('Fetching reports...');
    const reports = await prisma.reports.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    console.log('Reports fetched successfully:', reports);
    return NextResponse.json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch reports', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    console.log('Creating report with data:', data);
    
    const report = await prisma.reports.create({
      data: {
        ...data,
        date: new Date(data.date),
      },
    });
    console.log('Report created successfully:', report);
    return NextResponse.json(report);
  } catch (error) {
    console.error('Error creating report:', error);
    return NextResponse.json({ 
      error: 'Failed to create report', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
} 