import { DOMAIN, MINIOURL } from "@/lib/constants";
import { connectDb } from "@/lib/mongodb";
import { NEWSINSIGHT } from "@/lib/types";
import NewsInsight from "@/model/NewsInsights/News";
import NewsInsightsPost from "../_components/NewsInsightPost";

export async function generateMetadata({ params }: any) {
  await connectDb();
  const newsinsight = (await NewsInsight.findOne({
    status: true,
    slug: params.slug,
  }).lean()) as NEWSINSIGHT;
  const descriptionWithoutHtml = newsinsight?.overview.replace(/<[^>]*>/g, "");

  return {
    title: `Projectestate | ${newsinsight?.title}`,
    description: descriptionWithoutHtml,
    openGraph: {
      type: "website",
      url: `${DOMAIN}courses/${newsinsight?.slug}`,
      title: `Projectestate | ${newsinsight?.title}`,
      description: descriptionWithoutHtml,
      images: [
        {
          url: `${MINIOURL}projectestate.png`,
        },
      ],
    },
  };
}

const NewsInsightDetailPage = () => {
  return <NewsInsightsPost />;
};

export default NewsInsightDetailPage;
