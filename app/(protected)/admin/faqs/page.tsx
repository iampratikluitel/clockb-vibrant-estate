import Link from "next/link";
import React from "react";
import FaqTable from "../components/FAQs/FaqTable";
import { Button } from "@/components/ui/button";

const Faqs = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-2xl">FAQs</h1>
        <div className="flex justify-end">
          <Link href="/admin/faqs/add" className="self-end">
            <Button variant="default" className="m-4">
              Add FAQ
            </Button>
          </Link>
        </div>
      </div>

      <FaqTable />
    </div>
  );
};

export default Faqs;
