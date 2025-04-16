import { Button } from "@/components/ui/button";
import TeamMemberTable from "./team-member-table";
import Link from "next/link";

export default function TeamTab() {
  return (
    <div>
      <div className="flex justify-end">
        <Link href="/admin/about/addMember" className="self-end">
          <Button variant="default" className="m-4">
            Add Member
          </Button>
        </Link>
      </div>
      <TeamMemberTable />
    </div>
  );
}
