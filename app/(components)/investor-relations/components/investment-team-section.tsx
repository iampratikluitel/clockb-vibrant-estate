import { Users, Building, ShieldCheck } from "lucide-react";
import React from "react";

export default function InvestmentTeamSection() {
  return (
    <>
      <section className="py-16 bg-estates-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-estates-secondary mb-6 tracking-tight">
              Meet the Investment Circle
            </h2>
            <div className="w-24 h-1.5 bg-estates-primary mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              The Saukhel Real Estate Project is managed by a highly experienced
              team dedicated to delivering profitable and secure investments.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <TeamCard
              icon={<Users className="h-10 w-10 text-estates-primary" />}
              title="Key Personnel"
              description="Industry experts with deep real estate and investment experience."
            />
            <TeamCard
              icon={<Building className="h-10 w-10 text-estates-primary" />}
              title="Engineering & Planning Partner"
              description="A leading urban planning and infrastructure firm."
            />
            <TeamCard
              icon={<ShieldCheck className="h-10 w-10 text-estates-primary" />}
              title="Strategic Guidance"
              description="Professionals committed to long-term investor success."
            />
          </div>
        </div>
      </section>
    </>
  );
}

const TeamCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="bg-white p-8 rounded-xl shadow-md text-center border border-estates-gray-200 hover:shadow-lg transition-all duration-300 group">
    <div className="w-20 h-20 rounded-full bg-estates-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-estates-secondary mb-4 group-hover:text-estates-primary transition-colors">
      {title}
    </h3>
    <p className="text-gray-600">{description}</p>
  </div>
);
