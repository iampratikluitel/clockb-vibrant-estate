import { NextResponse } from "next/server";
import { auth } from '@/auth';
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { icon, title, description, buttonText, fileUrl, actionType } = body;

    if (!icon || !title || !description || !buttonText) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const doc = await prisma.investmentDoc.update({
      where: {
        id: params.id
      },
      data: {
        icon,
        title,
        description,
        buttonText,
        fileUrl,
        updatedAt: new Date()
      }
    });

    return NextResponse.json(doc);
  } catch (error) {
    console.error('Error updating investment document:', error);
    return NextResponse.json(
      { error: 'Failed to update investment document' },
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

    await prisma.investmentDoc.delete({
      where: {
        id: params.id
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting investment document:', error);
    return NextResponse.json(
      { error: 'Failed to delete investment document' },
      { status: 500 }
    );
  }
} 