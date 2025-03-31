"use client";

import { MINIOURL } from "@/lib/constants";
import { Partner } from "@/lib/types";
import { Building } from "lucide-react";
import React, { useEffect, useState } from "react";

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
  const currentPartners = planningPartner.slice(indexOfFirstPartner, indexOfLastPartner);

  return (
    <>
      <section className="py-16 bg-estates-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-estates-primary mb-4">
                Engineering & Planning Partner
              </h2>
            </div>

            {currentPartners.map((partner) => (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <div className="flex justify-center mb-6">
                  <div className="bg-estates-primary/10 rounded-full p-0">
                    <img
                      src={`${MINIOURL}/${partner.logo}`}
                      alt={partner.name}
                      className="h-24 w-24 object-cover rounded-full"
                    />
                    {/* <Building className="h-10 w-10 text-estates-primary" /> */}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-estates-secondary mb-4">
                  {partner.name || "Innovate Urban Solutions"}
                </h3>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  {partner.description}
                  {/* Industry-leading experts in urban planning and sustainable
                infrastructure development. With a proven track record of
                successful projects across various regions, they bring
                unparalleled expertise to ensure our development meets the
                highest standards of quality and sustainability. */}
                </p>
                
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
