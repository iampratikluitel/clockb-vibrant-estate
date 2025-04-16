import { MINIOURL } from "@/lib/constants";
import React, { useEffect, useState } from "react";

interface Investment {
  name: string;
  description: string;
  logo: string;
  points?: string[];
}

export default function InvestmentCircle() {
  const [investmentCircle, setInvestmentCircle] = useState<Investment | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/public/about/investment-circle");
        const data = await response.json();
        setInvestmentCircle(data);
      } catch (error) {
        console.log("Error fetching Data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-estates-primary mb-4">
                {investmentCircle?.name || "Managed by Investment Circle"}
              </h2>
            </div>

            <div className="bg-estates-primary/5 rounded-xl p-8 border border-estates-primary/20">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/3 flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-estates-primary/10 rounded-full transform -rotate-6"></div>
                    <div className="relative bg-estates-primary/20 rounded-full">
                      <img
                        src={investmentCircle ? `${MINIOURL}/${investmentCircle.logo}` : ""}
                        alt=""
                        className="h-24 w-24 object-cover rounded-full"
                      />
                      {/* <Users className="h-16 w-16 text-estates-primary" /> */}
                    </div>
                  </div>
                </div>
                <div className="md:w-2/3">
                  <p className="text-lg text-gray-700 mb-6">
                    The entire project is backed and managed by a structured
                    Investment Circle, ensuring financial security, risk
                    mitigation, and project success through expert governance.
                  </p>

                  {/* Dynamically generated points */}
                {investmentCircle?.points && (
                  <ul className="space-y-3">
                    {investmentCircle.points.map((point, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 mr-2 mt-1">
                          <div className="w-5 h-5 rounded-full bg-estates-primary flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        </div>
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
