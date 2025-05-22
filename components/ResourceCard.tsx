import { ReactNode } from 'react';
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResourceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  buttonText: string;
  onClick?: () => void;
  className?: string;
}

export default function ResourceCard({ 
  icon, 
  title, 
  description, 
  buttonText, 
  onClick,
  className
}: ResourceCardProps) {
  return (
    <div className={cn("bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-100", className)}>
      <div className="flex items-start">
        <div className="bg-estates-primary/10 p-3 rounded-lg mr-4">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-4">{description}</p>
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2 hover:bg-estates-primary hover:text-white"
            onClick={onClick}
          >
            <Eye className="w-4 h-4" />
            View Document
          </Button>
        </div>
      </div>
    </div>
  );
} 