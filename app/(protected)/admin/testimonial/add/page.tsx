import React from "react";
import TestimonialForm from "../../components/testimonial/testimonialForm";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { paths } from "@/lib/paths";

const AddTestimonial = () => {
  return (
    <div className="p-4 bg-white">
      <Breadcrumb >
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
            <BreadcrumbPage>Add Testimonials</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <TestimonialForm type={"Add"} />
    </div>
  );
};

export default AddTestimonial;
