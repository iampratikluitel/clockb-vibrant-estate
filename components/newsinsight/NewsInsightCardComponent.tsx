import { MINIOURL } from "@/lib/constants";
import { paths } from "@/lib/paths";
import { NEWSINSIGHT } from "@/lib/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface Props {
  element: NEWSINSIGHT;
}

const NewsInsightCardComponent = ({ element }: Props) => {
  return (
    <section className="p-4 bg-white">
      <div
        key={element._id}
        className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
      >
        <div className="h-48 overflow-hidden">
          <img
            src={`${MINIOURL}${element.image}`}
            alt={element.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-5">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-medium text-estates-primary bg-blue-50 px-2 py-1 rounded">
              {element.category.name}
            </span>
            <span className="text-xs text-gray-500">
              {new Date(element.addedDate).toLocaleDateString()}
            </span>
          </div>
          <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">
            {element.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3 mb-4">
            {element.overview}
          </p>
          <Link
            href={`${paths.public.newsinsight}/${element.slug}`}
            className="text-estates-primary p-0 h-auto inline-flex items-center"
          >
            Read more
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsInsightCardComponent;
