"use client";

import { useSearchParams } from "next/navigation";
import TeamMemberForm from "../../components/about/TeamMemberForm";
import { useGetAdminTeamMemberByIdQuery } from "@/store/api/Admin/adminAboutPage";

const Edit = () => {
  const search = useSearchParams();
  const _id = search.get("id") as string;

  const { data: ExistingDetail, isLoading: Loading } =
    useGetAdminTeamMemberByIdQuery(_id);

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
