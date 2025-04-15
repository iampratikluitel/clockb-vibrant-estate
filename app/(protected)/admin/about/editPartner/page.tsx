"use client";

import { useGetAdminPartnerByIdQuery } from "@/store/api/Admin/adminPartner";
import { useSearchParams } from "next/navigation";
import PartnerForm from "../../components/about/partnerForm";

const Edit = () => {
  const search = useSearchParams();
  const _id = search.get("id") as string;

  const { data: ExistingDetail, isLoading: Loading } =
    useGetAdminPartnerByIdQuery(_id);

  return (
    <>
      {Loading ? (
        <div className="w-full h-[100vh] flex justify-center items-center">
          <p className="loader"></p>
        </div>
      ) : (
        <>
          {ExistingDetail && (
            <PartnerForm type={"Edit"} ExistingDetail={ExistingDetail} />
          )}
        </>
      )}
    </>
  );
};

export default Edit;
