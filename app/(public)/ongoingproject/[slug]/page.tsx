import { DOMAIN, MINIOURL } from "@/lib/constants";
import { connectDb } from "@/lib/mongodb";
import UpcommingProject from "@/model/Projects/ProjectDescription";
import ProjectDetailComponents from "../_components/ProjectDetailComponents";
import { PROJECTDESCRIPTION } from "@/lib/types";

export async function generateMetadata({ params }: any) {
  await connectDb();
  const projects = (await UpcommingProject.findOne({
    status: true,
    slug: params.slug,
  }).lean()) as unknown as PROJECTDESCRIPTION;
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
