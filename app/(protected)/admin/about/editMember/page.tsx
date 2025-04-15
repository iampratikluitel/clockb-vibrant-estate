"use client";

import { useSearchParams } from "next/navigation";
import TeamMemberForm from "../../components/about/TeamMemberForm";
import { useGetAdminMemberByIdQuery } from "@/store/api/Admin/adminTeamMember";

const Edit = () => {
  const search = useSearchParams();
  const _id = search.get("id") as string;

  const { data: ExistingDetail, isLoading: Loading } =
    useGetAdminMemberByIdQuery(_id);

  return (
    <>
      {Loading ? (
        <div className="w-full h-[100vh] flex justify-center items-center">
          <p className="loader"></p>
        </div>
      ) : (
        <>
          {ExistingDetail && (
            <TeamMemberForm type={"Edit"} ExistingDetail={ExistingDetail} />
          )}
        </>
      )}
    </>
  );
};

export default Edit;
