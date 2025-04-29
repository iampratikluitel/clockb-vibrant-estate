import { UPCOMMINGPROJECT } from "@/lib/types";
import { Poppins } from "next/font/google";

const inter = Poppins({ subsets: ["latin"], weight: ["700", "300"] });

interface props {
  ProjectBySlug: UPCOMMINGPROJECT | undefined;
}

const ProjectOverview = ({ ProjectBySlug }: props) => {
  return (
    <div className="px-4">
      <div
        className={inter.className}
        dangerouslySetInnerHTML={{
          __html: ProjectBySlug?.overview as string,
        }}
      ></div>
    </div>
  );
};

export default ProjectOverview