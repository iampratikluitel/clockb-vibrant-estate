import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function GET() {
  try {
    const investorRelations = await prisma.investorRelations.findFirst({
      include: {
        contactDetails: true,
        events: true,
      },
    });

    if (!investorRelations) {
      // Create default investor relations if none exists
      const defaultInvestorRelations = await prisma.investorRelations.create({
        data: {
          contactDetails: {
            create: [
              { type: 'phone', value: '+977-9851079636' },
              { type: 'phone', value: '+977-9843260542' },
              { type: 'email', value: 'Info@projestates.com' },
            ],
          },
          events: {
            create: [
              {
                title: 'Investor Webinar',
                date: '2025-06-15',
                time: '14:00',
                registrationLink: '#',
              },
              {
                title: 'Site Visit Day',
                date: '2025-07-05',
                time: '10:00',
                registrationLink: '#',
              },
            ],
          },
        },
        include: {
          contactDetails: true,
          events: true,
        },
      });

      return NextResponse.json(defaultInvestorRelations);
    }

    return NextResponse.json(investorRelations);
  } catch (error) {
    console.error('Error fetching investor relations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch investor relations' },
      { status: 500 }
    );
  }
} 