import { NextResponse } from "next/server";
import { auth } from '@/auth';
import { prisma } from "@/lib/prisma";
import getServerSession from "next-auth";
import { authOptions } from "@/lib/auth";
import minioClient from '@/lib/minioClient';

interface Document {
  id: string;
  filename: string;
  title: string;
  category: string;
  type: string;
  size: number;
  date: string;
  status: string;
  description: string;
}

export async function GET() {
  try {
    // Fetch reports and legal documents from the database
    const reports = await prisma.reports.findMany();
    const legalDocs = await prisma.legalDocument.findMany();

    // Combine and format as needed
    const resources = [
      ...reports.map(r => ({
        id: r.id,
        title: r.title,
        date: r.date,
        type: r.type,
        size: r.size,
        status: r.status,
        category: r.category,
        fileUrl: r.fileUrl,
        createdAt: r.createdAt,
        updatedAt: r.updatedAt,
      })),
      ...legalDocs.map(d => ({
        id: d.id,
        title: d.title,
        date: d.date,
        type: d.type,
        size: d.size,
        status: d.status,
        category: d.category,
        fileUrl: d.fileUrl,
        description: d.description || '',
        createdAt: d.createdAt,
        updatedAt: d.updatedAt,
      }))
    ];

    return NextResponse.json(resources);
  } catch (error) {
    console.error('Error fetching resources:', error);
    return NextResponse.json({ error: "Failed to fetch resources" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, date, type, size, status, category, fileUrl } = body;

    if (!title || !date || !type || !size || !status || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const report = await prisma.reports.create({
      data: {
        title,
        date: new Date(date),
        type,
        size,
        status,
        category,
        fileUrl: fileUrl || null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    return NextResponse.json(report);
  } catch (error) {
    console.error('Error creating resource:', error);
    return NextResponse.json(
      { error: 'Failed to create resource', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 