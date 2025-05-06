import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const siteVisits = await prisma.siteVisit.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(siteVisits);
  } catch (error) {
    console.error('[SITE_VISITS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, preferredDate, message } = body;

    if (!name || !email || !phone || !preferredDate) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const siteVisit = await prisma.siteVisit.create({
      data: {
        name,
        email,
        phone,
        preferredDate: new Date(preferredDate),
        message,
        status: 'pending'
      }
    });

    return NextResponse.json(siteVisit);
  } catch (error) {
    console.error('[SITE_VISITS_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 