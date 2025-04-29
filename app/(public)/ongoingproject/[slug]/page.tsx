import { DOMAIN, MINIOURL } from "@/lib/constants";
import { connectDb } from "@/lib/mongodb";
import { UPCOMMINGPROJECT } from "@/lib/types";
import UpcommingProject from "@/model/project-description/project-description";
import ProjectDetailComponents from "../_components/ProjectDetailComponents";

export async function generateMetadata({ params }: any) {
  await connectDb();
  const projects = (await UpcommingProject.findOne({
    status: true,
    slug: params.slug,
  }).lean()) as UPCOMMINGPROJECT;
  const descriptionWithoutHtml = projects?.overview.replace(/<[^>]*>/g, "");

  return {
    title: `Projectestate | ${projects?.title}`,
    description: descriptionWithoutHtml,
    openGraph: {
      type: "website",
      url: `${DOMAIN}upcommingproject/${projects?.slug}`,
      title: `Projectestate | ${projects?.title}`,
      description: descriptionWithoutHtml,
      images: [
        {
          url: `${MINIOURL}projectestatelogo.png`,
        },
      ],
    },
  };
}

const ProjectDetailPage = () => {
  return <ProjectDetailComponents />;
};

export default ProjectDetailPage;
