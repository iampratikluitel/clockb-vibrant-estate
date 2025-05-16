import { NEWSINSIGHT } from "@/lib/types";
import { Lexend_Deca, Poppins } from "next/font/google";
import React from "react";

const inter = Poppins({ subsets: ["latin"], weight: ["700", "300"] });

const deca = Lexend_Deca({ subsets: ["latin"] });

interface props {
  NewsinsightBySlug: NEWSINSIGHT | undefined;
}

const NewsInsightOverview = ({ NewsinsightBySlug }: props) => {
  return (
    <div className="px-4">
      <article
          className={`ProseMirror tiptap-content mt-3 text-[#454F5B] md:text-lg leading-8 text-sm font-normal  transition delay-300 font-publicsans`}
          dangerouslySetInnerHTML={{
            __html: NewsinsightBySlug?.overview as string,
          }}
        />
    </div>
  );
};

export default NewsInsightOverview;