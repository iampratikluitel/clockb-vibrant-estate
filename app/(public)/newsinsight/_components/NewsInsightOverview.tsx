import { NEWSINSIGHT } from "@/lib/types";
import { Poppins } from "next/font/google";

const inter = Poppins({ subsets: ["latin"], weight: ["700", "300"] });

interface props {
  NewsInsightBySlug: NEWSINSIGHT | undefined;
}

const NewsInsightOverview = ({ NewsInsightBySlug }: props) => {
  return (
    <div className="px-4">
      <div
        className={inter.className}
        dangerouslySetInnerHTML={{
          __html: NewsInsightBySlug?.overview as string,
        }}
      ></div>
    </div>
  );
};

export default NewsInsightOverview