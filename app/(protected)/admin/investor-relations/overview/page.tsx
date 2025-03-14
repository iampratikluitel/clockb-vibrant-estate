import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Icon } from '@/components/ui/icon'; // Assuming you have an Icon component

const Overview = () => {
  return (
    <div className="w-full mx-auto">
      <Card className="w-full bg-white shadow-md rounded-lg">
        <CardContent className="space-y-6 p-4">
          {/* Title Input */}
          <div className="space-y-2">
            <Label
              htmlFor="title"
              className="text-sm font-medium text-gray-700"
            >
              Title
            </Label>
            <Input
              id="title"
              defaultValue=""
              className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter title"
            />
          </div>

          {/* Subtitle Input */}
          <div className="space-y-2">
            <Label
              htmlFor="subtitle"
              className="text-sm font-medium text-gray-700"
            >
              Sub Title
            </Label>
            <Input
              id="subtitle"
              defaultValue="Software Engineer"
              className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter subtitle"
            />
          </div>

          {/* Description Input */}
          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="text-sm font-medium text-gray-700"
            >
              Description
            </Label>
            <Input
              id="description"
              defaultValue="@peduarte"
              className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter description"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;
