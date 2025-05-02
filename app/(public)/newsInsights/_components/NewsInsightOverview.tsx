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
      <div
        className={inter.className}
        dangerouslySetInnerHTML={{
          __html: NewsinsightBySlug?.overview as string,
        }}
      ></div>
    </div>
  );
};

export default NewsInsightOverview;
