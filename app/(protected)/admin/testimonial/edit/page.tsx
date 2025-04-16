"use client";

import { useSearchParams } from "next/navigation";
import TestimonialForm from "../../components/testimonial/testimonialForm";
import { useGetAdminTestimonialsByIdQuery } from "@/store/api/Admin/adminTestimonials";

const Edit = () => {
  const search = useSearchParams();
  const _id = search.get("id") as string;

  const { data: ExistingDetail, isLoading: Loading } =
    useGetAdminTestimonialsByIdQuery(_id);

  return (
    <>
      {Loading ? (
        <div className="w-full h-[100vh] flex justify-center items-center">
          <p className="loader"></p>
        </div>
      ) : (
        <>
          {ExistingDetail && (
            <TestimonialForm type={"Edit"} ExistingDetail={ExistingDetail} />
          )}
        </>
      )}
    </>
  );
};

export default Edit;
