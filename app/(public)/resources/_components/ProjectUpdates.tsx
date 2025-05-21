import ReportTable from "@/components/report/reporttable";
import { BarChart2, Construction, Home } from "lucide-react";

export default function ProjectUpdates({
  selectedTab,
  setSelectedTab,
  filteredReports,
  loading,
}: {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  filteredReports: any[];
  loading: boolean;
}) {
  return (
    <section className="mb-20 animate-fade-in" style={{ animationDelay: "0.3s" }}>
      <div className="border-l-4 border-estates-primary pl-4 mb-8">
        <h2 className="text-3xl font-bold text-estates-secondary">
          Project Updates & Reports
        </h2>
        <p className="text-gray-600 mt-2">Stay informed about project progress</p>
      </div>
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <div className="flex border-b">
          <button
            className={`py-4 px-6 font-medium flex items-center gap-2 ${
              selectedTab === "quarterly"
                ? "bg-estates-primary text-white"
                : "hover:bg-gray-50"
            }`}
            onClick={() => setSelectedTab("quarterly")}
          >
            <BarChart2 className="h-5 w-5" />
            Quarterly Progress Reports
          </button>
          <button
            className={`py-4 px-6 font-medium flex items-center gap-2 ${
              selectedTab === "construction"
                ? "bg-estates-primary text-white"
                : "hover:bg-gray-50"
            }`}
            onClick={() => setSelectedTab("construction")}
          >
            <Construction className="h-5 w-5" />
            Construction & Development
          </button>
          <button
            className={`py-4 px-6 font-medium flex items-center gap-2 ${
              selectedTab === "land"
                ? "bg-estates-primary text-white"
                : "hover:bg-gray-50"
            }`}
            onClick={() => setSelectedTab("land")}
          >
            <Home className="h-5 w-5" />
            Land Allocation & Valuation
          </button>
        </div>
        <div className="p-6">
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-estates-primary"></div>
            </div>
          ) : (
            <div>
              <p className="text-gray-600 mb-4">
                {selectedTab === "quarterly" &&
                  "Updates on land development, infrastructure progress, and key milestones achieved each quarter."}
                {selectedTab === "construction" &&
                  "Detailed engineering plans, zoning information, and site maps for the development."}
                {selectedTab === "land" &&
                  "Reports and documentation for investors opting for land exit strategy."}
              </p>
              <ReportTable data={filteredReports} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}