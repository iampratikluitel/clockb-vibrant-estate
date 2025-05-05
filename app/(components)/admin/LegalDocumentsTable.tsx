import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileText, Trash2, Edit2 } from "lucide-react";
import { format } from "date-fns";

interface LegalDocument {
  id: string;
  title: string;
  description: string;
  documentUrl: string;
  type: string;
  createdAt: string;
}

interface LegalDocumentsTableProps {
  documents: LegalDocument[];
  onEdit: (document: LegalDocument) => void;
  onDelete: (id: string) => void;
}

const DOCUMENT_TYPES = [
  { value: 'agreement', label: 'Agreement', icon: <FileText className="h-5 w-5" /> },
  { value: 'report', label: 'Report', icon: <FileText className="h-5 w-5" /> },
  { value: 'certificate', label: 'Certificate', icon: <FileText className="h-5 w-5" /> },
];

export function LegalDocumentsTable({ documents, onEdit, onDelete }: LegalDocumentsTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Document</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((doc) => (
            <TableRow key={doc.id}>
              <TableCell className="font-medium">{doc.title}</TableCell>
              <TableCell>{doc.description}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {DOCUMENT_TYPES.find(type => type.value === doc.type)?.icon}
                  {DOCUMENT_TYPES.find(type => type.value === doc.type)?.label}
                </div>
              </TableCell>
              <TableCell>
                <a 
                  href={doc.documentUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-estates-primary hover:underline"
                >
                  View Document
                </a>
              </TableCell>
              <TableCell>{format(new Date(doc.createdAt), 'MMM dd, yyyy')}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(doc)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(doc.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 