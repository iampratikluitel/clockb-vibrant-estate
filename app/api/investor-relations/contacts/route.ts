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

    const contact = await prisma.contactDetail.create({
      data: {
        type: data.type,
        value: data.value,
        investorRelationsId: investorRelations.id,
      },
    });

    return NextResponse.json(contact);
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json(
      { error: 'Failed to create contact' },
      { status: 500 }
    );
  }
} 