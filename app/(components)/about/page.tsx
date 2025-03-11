"use client";

import {
  Building2,
  Download,
  Phone,
  FileText,
  MapPin,
  Users,
  LucideIcon,
  User,
  Briefcase,
  Shield,
  LineChart,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface TeamMemberProps {
  name: string;
  role: string;
  description: string;
  icon: LucideIcon;
  photoUrl?: string;
}

const TeamMember = ({
  name,
  role,
  description,
  icon: Icon,
  photoUrl,
}: TeamMemberProps) => {
  return (
    <div className="flex flex-col bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 gap-4">
      <div className="flex flex-col items-center">
        {photoUrl ? (
          <Avatar className="h-24 w-24 mb-2">
            <AvatarImage src={photoUrl} alt={name} />
            <AvatarFallback className="bg-estates-primary/10">
              <Icon className="h-8 w-8 text-estates-primary" />
            </AvatarFallback>
          </Avatar>
        ) : (
          <div className="flex items-center justify-center bg-estates-primary/10 rounded-full p-4 h-16 w-16 mb-2">
            <Icon className="h-8 w-8 text-estates-primary" />
          </div>
        )}
        <h3 className="text-lg font-bold text-estates-primary text-center">
          {name}
        </h3>
        <p className="text-estates-secondary font-medium mb-2 text-center">
          {role}
        </p>
      </div>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
};

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="bg-estates-gray-100 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-estates-primary mb-4">
                About Project Estates
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Learn about the team and partners behind our visionary real
                estate development project
              </p>
            </div>
          </div>
        </section>

        {/* Meet the Team Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-estates-primary mb-4">
                  Meet the Team
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Our experienced leadership team brings decades of combined
                  expertise in real estate development, finance, and project
                  management.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-16">
                <TeamMember
                  name="Prakash Tiwari"
                  role="Project Director"
                  description="Oversees strategic planning and execution."
                  icon={User}
                  photoUrl="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=300&h=300"
                />
                <TeamMember
                  name="Binay Devkota"
                  role="Investment Director"
                  description="Manages investor relations, financial strategy, and risk management."
                  icon={Briefcase}
                  photoUrl="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=300&h=300"
                />
                <TeamMember
                  name="Binod Subedi"
                  role="Chief Executive Officer"
                  description="Leads strategic, infrastructure planning and construction."
                  icon={Building}
                  photoUrl="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&h=300"
                />
                <TeamMember
                  name="Samjhana Thapa"
                  role="Head of Compliance"
                  description="Ensures all legal frameworks and investor protections."
                  icon={Shield}
                  photoUrl="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&h=300"
                />
                <TeamMember
                  name="Hamid Khan"
                  role="Head of Sales & Marketing"
                  description="Drives project awareness, sales, and investor engagement."
                  icon={LineChart}
                  photoUrl="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&h=300"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Engineering & Planning Partner Section */}
        <section className="py-16 bg-estates-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-estates-primary mb-4">
                  Engineering & Planning Partner
                </h2>
              </div>

              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <div className="flex justify-center mb-6">
                  <div className="bg-estates-primary/10 rounded-full p-5">
                    <Building className="h-10 w-10 text-estates-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-estates-secondary mb-4">
                  Innovate Urban Solutions
                </h3>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  Industry-leading experts in urban planning and sustainable
                  infrastructure development. With a proven track record of
                  successful projects across various regions, they bring
                  unparalleled expertise to ensure our development meets the
                  highest standards of quality and sustainability.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Managed by Investment Circle Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-estates-primary mb-4">
                  Managed by Investment Circle
                </h2>
              </div>

              <div className="bg-estates-primary/5 rounded-xl p-8 border border-estates-primary/20">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-1/3 flex justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-estates-primary/10 rounded-full transform -rotate-6"></div>
                      <div className="relative bg-estates-primary/20 rounded-full p-6">
                        <Users className="h-16 w-16 text-estates-primary" />
                      </div>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <p className="text-lg text-gray-700 mb-6">
                      The entire project is backed and managed by a structured
                      Investment Circle, ensuring financial security, risk
                      mitigation, and project success through expert governance.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 mr-2 mt-1">
                          <div className="w-5 h-5 rounded-full bg-estates-primary flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        </div>
                        <span className="text-gray-700">
                          Professional financial management and oversight
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 mr-2 mt-1">
                          <div className="w-5 h-5 rounded-full bg-estates-primary flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        </div>
                        <span className="text-gray-700">
                          Transparent investor communications and reporting
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 mr-2 mt-1">
                          <div className="w-5 h-5 rounded-full bg-estates-primary flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        </div>
                        <span className="text-gray-700">
                          Strategic risk assessment and mitigation protocols
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 bg-estates-primary text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                Ready to be part of this visionary real estate opportunity?
              </h2>
              <p className="text-xl mb-10 opacity-90">
                Join us in building the future of residential excellence
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors">
                  <Phone className="h-10 w-10 mx-auto mb-4 text-white" />
                  <h3 className="text-xl font-semibold mb-2">
                    Book a Consultation
                  </h3>
                  <p className="text-white/80 mb-4">
                    Speak with our investment advisors about opportunities.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors">
                  <FileText className="h-10 w-10 mx-auto mb-4 text-white" />
                  <h3 className="text-xl font-semibold mb-2">
                    Download Investment Brochure
                  </h3>
                  <p className="text-white/80 mb-4">
                    Get detailed information about our project and returns.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors">
                  <MapPin className="h-10 w-10 mx-auto mb-4 text-white" />
                  <h3 className="text-xl font-semibold mb-2">
                    Visit the Project Site
                  </h3>
                  <p className="text-white/80 mb-4">
                    See the development location and progress in person.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Button
                  variant="cta"
                  size="xl"
                  className="bg-white text-estates-primary hover:bg-white/90"
                >
                  <Phone className="w-5 h-5" />
                  Book a Consultation
                </Button>
                <Button
                  variant="cta"
                  size="xl"
                  className="border border-white bg-transparent hover:bg-white/10"
                >
                  <Download className="w-5 h-5" />
                  Download Brochure
                </Button>
                <Button
                  variant="cta"
                  size="xl"
                  className="border border-white bg-transparent hover:bg-white/10"
                >
                  <MapPin className="w-5 h-5" />
                  Visit Project Site
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
