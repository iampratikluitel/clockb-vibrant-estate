
import { Button } from "@/components/ui/button";
import { DownloadCloud, Eye, FileText } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ReportData {
  id: number;
  title: string;
  date: string;
  type: string;
  size: string;
  status: string;
}

interface ReportTableProps {
  data: ReportData[];
}

const ReportTable = ({ data }: ReportTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'approved':
      case 'final':
        return 'bg-green-100 text-green-800';
      case 'in progress':
      case 'in review':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'updated':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getFileIcon = () => {
    return <FileText className="h-4 w-4" />;
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-estates-gray-100">
            <TableHead className="w-[40%]">Report Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>File Type</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((report) => (
            <TableRow key={report.id} className="hover:bg-estates-gray-100/50">
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {getFileIcon()}
                  {report.title}
                </div>
              </TableCell>
              <TableCell>{report.date}</TableCell>
              <TableCell>{report.type}</TableCell>
              <TableCell>{report.size}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                  {report.status}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" className="h-8 px-2">
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 px-2">
                    <DownloadCloud className="h-4 w-4" />
                    <span className="sr-only">Download</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReportTable;
