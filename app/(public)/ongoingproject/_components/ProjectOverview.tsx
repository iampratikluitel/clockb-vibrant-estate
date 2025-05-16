import { PROJECTDESCRIPTION } from "@/lib/types";
import { Poppins } from "next/font/google";

const inter = Poppins({ subsets: ["latin"], weight: ["700", "300"] });

interface props {
  ProjectBySlug: PROJECTDESCRIPTION | undefined;
}

const ProjectOverview = ({ ProjectBySlug }: props) => {
  return (
    <div className="px-4">
      <article
          className={`ProseMirror tiptap-content mt-3 text-[#454F5B] md:text-lg leading-8 text-sm font-normal  transition delay-300 font-publicsans`}
          dangerouslySetInnerHTML={{
            __html: ProjectBySlug?.overview as string,
          }}
        />
    </div>
  );
};

export default ProjectOverview