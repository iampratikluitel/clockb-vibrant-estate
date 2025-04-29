"use client";

import { MINIOURL } from "@/lib/constants";
import { useParams } from "next/navigation";
import React from "react";
import ProjectOverview from "./ProjectOverview";
import { useGetPublicUpcommingProjectBySlugQuery } from "@/store/api/Public/publicUpcommingProject";

const ProjectDetailComponents = () => {
  const { slug } = useParams();
  const { data: ProjectBySlug, isLoading: Loading } =
    useGetPublicUpcommingProjectBySlugQuery(slug as string);
  return (
    <div>
      <div>
        <img
          src={`${MINIOURL}${ProjectBySlug?.image}`}
          alt={ProjectBySlug?.title}
        />
      </div>
      <div>
        <h1>{ProjectBySlug?.title}</h1>
      </div>
      <div>
        <ProjectOverview ProjectBySlug={ProjectBySlug} />
      </div>
    </div>
  );
};

export default ProjectDetailComponents;
