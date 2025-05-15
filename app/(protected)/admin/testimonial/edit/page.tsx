"use client";

import { useSearchParams } from "next/navigation";
import TestimonialForm from "../../components/testimonial/testimonialForm";
import { useGetAdminTestimonialsByIdQuery } from "@/store/api/Admin/adminTestimonials";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { paths } from "@/lib/paths";

const Edit = () => {
  const search = useSearchParams();
  const _id = search.get("id") as string;

  const { data: ExistingDetail, isLoading: Loading } =
    useGetAdminTestimonialsByIdQuery(_id);

  return (
    <div className="p-4 bg-white">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={paths.admin.dashboard}>
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={paths.admin.testimonial}>
              Testimonials
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit Testimonials</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
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
    </div>
  );
};

export default Edit;
