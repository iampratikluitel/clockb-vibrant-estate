import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const investorRelations = await prisma.investorRelations.findFirst();

    if (!investorRelations) {
      return NextResponse.json(
        { error: 'Investor relations not found' },
        { status: 404 }
      );
    }

    const event = await prisma.event.create({
      data: {
        title: data.title,
        date: data.date,
        time: data.time,
        registrationLink: data.registrationLink,
        investorRelationsId: investorRelations.id,
      },
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
} 