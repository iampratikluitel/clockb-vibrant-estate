import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import minioClient from "@/lib/minioClient";

export async function GET() {
  try {
    const legalDocs = await prisma.legalDocument.findMany({
      orderBy: { createdAt: 'desc' }
    });

    // Format legal documents to match frontend expectations
    const formattedDocs = legalDocs.map(doc => ({
      id: doc.id,
      title: doc.title,
      description: doc.description,
      date: doc.date instanceof Date ? doc.date.toISOString().split('T')[0] : doc.date,
      type: doc.type,
      size: doc.size,
      status: doc.status,
      category: doc.category,
      fileUrl: doc.fileUrl,
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString()
    }));

    return NextResponse.json(formattedDocs);
  } catch (error) {
    console.error('Error fetching legal documents:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch legal documents', 
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.stack : undefined : undefined
      },
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

    const raw = await request.text();
    console.log('[api/legal-docs] raw body →', raw);

    let body;
    try {
      body = JSON.parse(raw);
    } catch (error) {
      console.log('[api/legal-docs] JSON parse failed:', error);
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }
    console.log('[api/legal-docs] parsed body →', body);

    const { title, description, type, fileUrl, date, size } = body;

    // Remove validation for status and category
    if (!title || !description || !type || !fileUrl || !date || !size) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const legalDoc = await prisma.legalDocument.create({
      data: {
        title,
        description,
        date: new Date(date), // Always convert to Date object
        type,
        size,
        status: 'active',
        category: 'legal',
        fileUrl,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    return NextResponse.json(legalDoc);
  } catch (error) {
    console.error('Error creating legal document:', error);
    return NextResponse.json(
      { error: 'Failed to create legal document', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const body = await request.json();
    const { id, title, description, type, fileUrl } = body;

    const document = await prisma.legalDocument.update({
      where: { id },
      data: {
        title,
        description,
        type,
        fileUrl
      }
    });

    return NextResponse.json(document);
  } catch (error) {
    console.error('Error updating legal document:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to update legal document' }), { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return new NextResponse(JSON.stringify({ error: 'Document ID is required' }), { status: 400 });
    }

    // Get the document to delete
    const document = await prisma.legalDocument.findUnique({
      where: { id }
    });

    if (!document) {
      return new NextResponse(JSON.stringify({ error: 'Document not found' }), { status: 404 });
    }

    // Delete the file from MinIO
    try {
      await minioClient.removeObject("projectestate", document.fileUrl);
    } catch (error) {
      console.error('Error deleting file from MinIO:', error);
      // Continue with document deletion even if file deletion fails
    }

    // Delete the document record
    await prisma.legalDocument.delete({
      where: { id }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting legal document:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to delete legal document' }), { status: 500 });
  }
} 