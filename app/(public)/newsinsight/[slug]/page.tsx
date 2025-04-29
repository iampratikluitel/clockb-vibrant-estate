import { DOMAIN, MINIOURL } from "@/lib/constants";
import { connectDb } from "@/lib/mongodb";
import { NEWSINSIGHT } from "@/lib/types";
import NewsInsight from "@/model/NewsInsights/News";
import NewsInsightDetailComponents from "../_components/NewsInsightDetailComponents";

export async function generateMetadata({ params }: any) {
  await connectDb();
  const newsInsight = (await NewsInsight.findOne({
    status: true,
    slug: params.slug,
  }).lean()) as NEWSINSIGHT;
  const descriptionWithoutHtml = newsInsight?.overview.replace(/<[^>]*>/g, "");

  return {
    title: `Projectestate | ${newsInsight?.title}`,
    description: descriptionWithoutHtml,
    openGraph: {
      type: "website",
      url: `${DOMAIN}newsinsight/${newsInsight?.slug}`,
      title: `Projectestate | ${newsInsight?.title}`,
      description: descriptionWithoutHtml,
      images: [
        {
          url: `${MINIOURL}projectestatelogo.png`,
        },
      ],
    },
  };
}

const NewsDetailPage = () => {
  return <NewsInsightDetailComponents />;
};

export default NewsDetailPage;
