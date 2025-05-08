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

          {currentPartners.map((partner) => (
            <div
              key={partner?._id || partner?.name} // key prop
              className="bg-white rounded-xl shadow-md p-8 text-center"
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

          {/* Pagination Controls */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevPage}
              className="bg-estates-primary text-white px-4 py-2 rounded-md disabled:opacity-50"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-lg text-estates-primary">
              Page {currentPage} of{" "}
              {Math.ceil(planningPartner.length / partnersPerPage)}
            </span>
            <button
              onClick={nextPage}
              className="bg-estates-primary text-white px-4 py-2 rounded-md disabled:opacity-50"
              disabled={
                currentPage ===
                Math.ceil(planningPartner.length / partnersPerPage)
              }
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
