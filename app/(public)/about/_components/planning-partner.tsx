"use client";

import { Partner } from "@/lib/types";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function PlanningPartner() {
  const [planningPartner, setPlanningPartner] = useState<Partner[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const partnersPerPage = 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/public/about/partner");
        const data = await response.json();
        setPlanningPartner(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error("Error fetching the data:", error);
      }
    };
    fetchData();
  }, []);

  const indexOfLastPartner = currentPage * partnersPerPage;
  const indexOfFirstPartner = indexOfLastPartner - partnersPerPage;
  const currentPartners = planningPartner.slice(
    indexOfFirstPartner,
    indexOfLastPartner
  );

  const nextPage = () => {
    if (currentPage < Math.ceil(planningPartner.length / partnersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section className="py-16 bg-estates-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-estates-primary mb-4">
              Project Partners
            </h2>
          </div>

          <div className="relative">
            {/* Left Arrow */}
            <button
              onClick={prevPage}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white text-estates-primary w-10 h-10 rounded-full shadow-md flex items-center justify-center z-10 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentPage === 1}
              aria-label="Previous partner"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Partner Card */}
            {currentPartners.map((partner) => (
              <div
                key={partner?._id || partner?.name}
                className="bg-white rounded-xl shadow-md p-8 text-center mx-12"
              >
                <div className="flex justify-center mb-6">
                  {partner?.logo && (
                    <div className="bg-estates-primary/10 rounded-full p-0">
                      <Image
                        src={`/api/resources/download?filename=${encodeURIComponent(
                          partner.logo
                        )}`}
                        alt={partner.name}
                        width={96}
                        height={96}
                      />
                    </div>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-estates-secondary mb-4">
                  {partner?.name || "Managed by Investment Circle"}
                </h3>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  {partner?.description ||
                    "The entire project is backed and managed by a structured Investment Circle, ensuring financial security, risk mitigation, and project success through expert governance."}
                </p>
              </div>
            ))}

            {/* Right Arrow */}
            <button
              onClick={nextPage}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white text-estates-primary w-10 h-10 rounded-full shadow-md flex items-center justify-center z-10 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={
                currentPage ===
                Math.ceil(planningPartner.length / partnersPerPage)
              }
              aria-label="Next partner"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}