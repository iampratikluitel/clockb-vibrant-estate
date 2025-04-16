import React from "react";
import PartnerTable from "./partner-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PartnerTab() {
  return (
    <div>
      <div className="flex justify-end">
        <Link href="/admin/about/addPartner" className="self-end">
          <Button variant="default" className="m-4">
            Add Partner
          </Button>
        </Link>
      </div>
      <PartnerTable />
    </div>
  );
}
