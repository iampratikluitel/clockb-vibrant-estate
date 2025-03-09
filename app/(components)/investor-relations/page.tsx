"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Download, 
  MapPin, 
  TrendingUp, 
  ShieldCheck, 
  Building, 
  Calendar, 
  Phone, 
  Mail, 
  Users, 
  BriefcaseIcon, 
  CheckCircle, 
  ArrowRight, 
  FileText,
  DollarSign,
  BarChart,
  Handshake,
  Clock,
  ArrowUpRight
} from "lucide-react";

const InvestmentRelations = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const handleDownload = () => {
    toast({
      title: "Download started",
      description: "Your investment brochure is being downloaded.",
    });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Request sent!",
      description: "We'll get back to you as soon as possible.",
    });
    setEmail("");
  };

  const handleScheduleVisit = () => {
    window.location.href = "/contact";
  };

  return (
    <div className="min-h-screen bg-estates-gray-100">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-estates-gray-100 via-white to-estates-gray-200 opacity-60" />
        <div className="absolute top-20 left-0 w-64 h-64 bg-estates-primary/5 rounded-full blur-3xl -translate-x-1/2" />
        <div className="absolute bottom-20 right-0 w-96 h-96 bg-estates-primary/5 rounded-full blur-3xl translate-x-1/2" />
        
        {/* Content */}
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-estates-primary mb-4 tracking-tight animate-fade-in">
              Invest in the Future of Real Estate at Saukhel
            </h1>
            <p className="text-xl md:text-2xl font-medium text-estates-secondary mb-6 animate-fade-in delay-100">
              Secure. Profitable. Transparent.
            </p>
            <p className="text-gray-600 md:text-lg mb-8 max-w-3xl mx-auto animate-fade-in delay-200">
              The Saukhel Real Estate Project offers a unique opportunity to be part of a high-value investment in one of Nepal's most promising locations. With a proven track record of 2X land value appreciation, a strategic location, and transparent investment policies, we ensure secure and rewarding investments.
            </p>
            <Button 
              variant="cta" 
              size="xl"
              onClick={handleDownload}
              className="animate-fade-in delay-300"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Investment Brochure
            </Button>
          </div>
        </div>
      </section>

      {/* Key Highlights Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-estates-secondary mb-6 tracking-tight">
              Key Highlights
            </h2>
            <div className="w-24 h-1.5 bg-estates-primary mx-auto mb-8 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Location & Connectivity */}
            <div className="bg-estates-gray-100 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-estates-gray-200 group">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-full bg-[#D3E4FD] flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="h-7 w-7 text-estates-primary" />
                </div>
                <h3 className="text-xl font-semibold text-estates-secondary">Prime Location & Connectivity</h3>
              </div>
              <ul className="space-y-3">
                <HighlightItem text="The site is approximately 8 KM from Ekantakuna Ring Road and 4.5 KM from Bhaisipati." />
                <HighlightItem text="Located close to the Kathmandu-Terai Fast Track Road, which connects Kathmandu to Nijgadh International Airport." />
                <HighlightItem text="Connected to the Bagmati Bridge, soon to be completed, linking Dakshinkali Nagarpalika and Lalitpur Metropolitan City." />
              </ul>
            </div>

            {/* Residential & Commercial */}
            <div className="bg-estates-gray-100 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-estates-gray-200 group">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-full bg-[#F2FCE2] flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Building className="h-7 w-7 text-estates-primary" />
                </div>
                <h3 className="text-xl font-semibold text-estates-secondary">Ideal for Residential & Commercial Purposes</h3>
              </div>
              <ul className="space-y-3">
                <HighlightItem text="The east-facing project site is near Pharping Reservoir and Pharping Hydropower, one of Asia's oldest power stations." />
                <HighlightItem text="Strategically located opposite the planned Lalitpur Smart City." />
              </ul>
            </div>

            {/* Investment Potential */}
            <div className="bg-estates-gray-100 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-estates-gray-200 group">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-full bg-[#FDE1D3] flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-7 w-7 text-estates-primary" />
                </div>
                <h3 className="text-xl font-semibold text-estates-secondary">High Investment Potential</h3>
              </div>
              <ul className="space-y-3">
                <HighlightItem text="Approximately 3 KM from the proposed Fast Track Bus Stop." />
                <HighlightItem text="Close to the Dry Port, a major logistics hub, making it attractive for commercial use." />
                <HighlightItem text="Land prices are fairly valued, making this a high ROI opportunity compared to similar locations in Kathmandu." />
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Model Section - REDESIGNED */}
      <section className="py-20 bg-estates-gray-100 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-estates-secondary mb-6 tracking-tight">
              Investment Model: How It Works
            </h2>
            <div className="w-24 h-1.5 bg-estates-primary mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-10">
              A seamless and secure investment process designed for maximum returns.
            </p>
          </div>

          <div className="max-w-5xl mx-auto relative">
            {/* Main timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-estates-primary/80 via-estates-primary to-estates-primary/20 transform -translate-x-1/2 hidden md:block"></div>

            <div className="space-y-0">
              {/* Step items */}
              <div className="md:grid md:grid-cols-2 gap-8 mb-24 relative">
                <div className="md:col-span-2 flex justify-center mb-8">
                  <div className="w-20 h-20 rounded-full bg-estates-primary text-white flex items-center justify-center text-2xl font-bold z-10 shadow-lg animate-pulse">1</div>
                </div>
                <div className="md:col-span-2 text-center mb-8">
                  <h3 className="text-2xl font-bold text-estates-secondary mb-3">Choose Your Investment Plan</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">Select from our range of flexible investment options tailored to your financial goals and risk tolerance. Short-term and long-term plans available with transparent terms.</p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-estates-primary">
                  <h4 className="text-lg font-semibold text-estates-primary mb-3">Short-Term Growth</h4>
                  <p className="text-gray-600 mb-4">2-3 year investment horizon with competitive returns and flexible exit options.</p>
                  <DollarSign className="h-12 w-12 text-estates-primary/20" />
                </div>
                <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-estates-primary mt-6 md:mt-0">
                  <h4 className="text-lg font-semibold text-estates-primary mb-3">Long-Term Appreciation</h4>
                  <p className="text-gray-600 mb-4">4+ year investment with maximized returns and priority land selection rights.</p>
                  <BarChart className="h-12 w-12 text-estates-primary/20" />
                </div>
              </div>

              {/* Step 2 */}
              <div className="md:grid md:grid-cols-2 gap-8 mb-24 relative">
                <div className="md:col-span-2 flex justify-center mb-8">
                  <div className="w-20 h-20 rounded-full bg-estates-primary text-white flex items-center justify-center text-2xl font-bold z-10 shadow-lg">2</div>
                </div>
                <div className="md:col-span-2 text-center mb-8">
                  <h3 className="text-2xl font-bold text-estates-secondary mb-3">Legal & Financial Due Diligence</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">Our transparent process ensures you have access to all legal documents and financial projections before you invest.</p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-estates-primary">
                  <h4 className="text-lg font-semibold text-estates-primary mb-3">Documentation</h4>
                  <p className="text-gray-600 mb-4">Complete legal verification of property titles and investment agreements.</p>
                  <FileText className="h-12 w-12 text-estates-primary/20" />
                </div>
                <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-estates-primary mt-6 md:mt-0">
                  <h4 className="text-lg font-semibold text-estates-primary mb-3">Financial Analysis</h4>
                  <p className="text-gray-600 mb-4">Detailed ROI projections and risk assessment for informed decision-making.</p>
                  <ShieldCheck className="h-12 w-12 text-estates-primary/20" />
                </div>
              </div>

              {/* Step 3 */}
              <div className="md:grid md:grid-cols-2 gap-8 mb-24 relative">
                <div className="md:col-span-2 flex justify-center mb-8">
                  <div className="w-20 h-20 rounded-full bg-estates-primary text-white flex items-center justify-center text-2xl font-bold z-10 shadow-lg">3</div>
                </div>
                <div className="md:col-span-2 text-center mb-8">
                  <h3 className="text-2xl font-bold text-estates-secondary mb-3">Investment Confirmation</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">Secure your position in the Saukhel Real Estate Project with our simple and efficient investment process.</p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-estates-primary">
                  <h4 className="text-lg font-semibold text-estates-primary mb-3">Secure Transaction</h4>
                  <p className="text-gray-600 mb-4">Protected investment channels with full documentation and receipts.</p>
                  <Handshake className="h-12 w-12 text-estates-primary/20" />
                </div>
                <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-estates-primary mt-6 md:mt-0">
                  <h4 className="text-lg font-semibold text-estates-primary mb-3">Ownership Confirmation</h4>
                  <p className="text-gray-600 mb-4">Receive official documentation confirming your investment stake.</p>
                  <CheckCircle className="h-12 w-12 text-estates-primary/20" />
                </div>
              </div>

              {/* Step 4 */}
              <div className="md:grid md:grid-cols-2 gap-8 mb-24 relative">
                <div className="md:col-span-2 flex justify-center mb-8">
                  <div className="w-20 h-20 rounded-full bg-estates-primary text-white flex items-center justify-center text-2xl font-bold z-10 shadow-lg">4</div>
                </div>
                <div className="md:col-span-2 text-center mb-8">
                  <h3 className="text-2xl font-bold text-estates-secondary mb-3">Value Appreciation & Project Growth</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">Watch your investment grow as we develop the project and implement infrastructure improvements.</p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-estates-primary">
                  <h4 className="text-lg font-semibold text-estates-primary mb-3">Development Timeline</h4>
                  <p className="text-gray-600 mb-4">Regular updates on construction progress and infrastructure development.</p>
                  <Clock className="h-12 w-12 text-estates-primary/20" />
                </div>
                <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-estates-primary mt-6 md:mt-0">
                  <h4 className="text-lg font-semibold text-estates-primary mb-3">Value Growth</h4>
                  <p className="text-gray-600 mb-4">Track your investment's appreciation through our investor portal.</p>
                  <TrendingUp className="h-12 w-12 text-estates-primary/20" />
                </div>
              </div>

              {/* Step 5 */}
              <div className="md:grid md:grid-cols-2 gap-8 relative">
                <div className="md:col-span-2 flex justify-center mb-8">
                  <div className="w-20 h-20 rounded-full bg-estates-primary text-white flex items-center justify-center text-2xl font-bold z-10 shadow-lg">5</div>
                </div>
                <div className="md:col-span-2 text-center mb-8">
                  <h3 className="text-2xl font-bold text-estates-secondary mb-3">Exit & Profit Realization</h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">Multiple exit options allow you to realize profits or continue your investment journey with us.</p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-estates-primary">
                  <h4 className="text-lg font-semibold text-estates-primary mb-3">Cash Exit</h4>
                  <p className="text-gray-600 mb-4">Sell your investment stake for immediate cash returns with no hidden fees.</p>
                  <DollarSign className="h-12 w-12 text-estates-primary/20" />
                </div>
                <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-estates-primary mt-6 md:mt-0">
                  <h4 className="text-lg font-semibold text-estates-primary mb-3">Land Acquisition</h4>
                  <p className="text-gray-600 mb-4">Convert your investment into premium land plots based on current valuation.</p>
                  <MapPin className="h-12 w-12 text-estates-primary/20" />
                </div>
              </div>
            </div>

            <div className="text-center mt-16">
              <Button 
                variant="cta"
                size="xl"
                onClick={() => window.location.href = "/contact"}
                className="group"
              >
                Start Your Investment Journey Today!
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Terms & Conditions Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-estates-secondary mb-6 tracking-tight">
              Terms & Conditions
            </h2>
            <div className="w-24 h-1.5 bg-estates-primary mx-auto mb-8 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Investment Requirements */}
            <div className="bg-estates-gray-100 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-estates-gray-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-lg bg-estates-primary/10 flex items-center justify-center mr-4">
                  <FileText className="h-6 w-6 text-estates-primary" />
                </div>
                <h3 className="text-xl font-semibold text-estates-secondary">Investment Requirements</h3>
              </div>
              <ul className="space-y-3">
                <TermItem text="Minimum investment: NPR 5 Lakhs per investor." />
                <TermItem text="Investors opting to exit with land must invest a minimum for 8 aana options." />
                <TermItem text="Lock-in period: Minimum 2 years from the investment date." />
              </ul>
            </div>

            {/* Project Management & Taxation */}
            <div className="bg-estates-gray-100 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-estates-gray-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-lg bg-estates-primary/10 flex items-center justify-center mr-4">
                  <BriefcaseIcon className="h-6 w-6 text-estates-primary" />
                </div>
                <h3 className="text-xl font-semibold text-estates-secondary">Project Management & Taxation</h3>
              </div>
              <ul className="space-y-3">
                <TermItem text="The Investment Circle P. Ltd. will oversee the development and management of the Saukhel Real Estate Project – II." />
                <TermItem text="Government taxes will be deducted at source before returns are paid." />
              </ul>
            </div>

            {/* Exit Options */}
            <div className="bg-estates-gray-100 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-estates-gray-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-lg bg-estates-primary/10 flex items-center justify-center mr-4">
                  <ArrowUpRight className="h-6 w-6 text-estates-primary" />
                </div>
                <h3 className="text-xl font-semibold text-estates-secondary">Exit Options</h3>
              </div>
              <ul className="space-y-3">
                <TermItem text="Cash Exit: Investment amount + returns will be paid after deducting fees and taxes." />
                <TermItem text="Land Exit: Investors will select land equivalent to their investment value + returns (after fees and taxes)." />
                <TermItem text="Priority for land selection will be based on investment amount and date." />
              </ul>
            </div>

            {/* Project Development Contribution */}
            <div className="bg-estates-gray-100 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-estates-gray-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-lg bg-estates-primary/10 flex items-center justify-center mr-4">
                  <Handshake className="h-6 w-6 text-estates-primary" />
                </div>
                <h3 className="text-xl font-semibold text-estates-secondary">Project Development Contribution</h3>
              </div>
              <ul className="space-y-3">
                <TermItem text="No additional development fees will be charged to investors." />
                <TermItem text="Due to project planning and regulations, approximately 30% of the land will be allocated for roads, open spaces, and amenities (±5% variation expected)." />
              </ul>
            </div>
          </div>

          {/* Institutional Investors */}
          <div className="max-w-6xl mx-auto mt-8 bg-estates-gray-100 rounded-xl p-8 shadow-md border border-estates-gray-200">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-lg bg-estates-primary/10 flex items-center justify-center mr-4">
                <Building className="h-6 w-6 text-estates-primary" />
              </div>
              <h3 className="text-xl font-semibold text-estates-secondary">Institutional & Large-Scale Investors</h3>
            </div>
            <p className="text-gray-600 mb-6">
              We facilitate custom investment projects under the investor's brand or institution.
            </p>
            <Button 
              variant="outline" 
              onClick={() => window.location.href = "/contact"}
              className="group"
            >
              Still Have Questions? Contact Us Today!
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Investment Team Section */}
      <section className="py-16 bg-estates-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-estates-secondary mb-6 tracking-tight">
              Meet the Investment Circle
            </h2>
            <div className="w-24 h-1.5 bg-estates-primary mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              The Saukhel Real Estate Project is managed by a highly experienced team dedicated to delivering profitable and secure investments.
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

      {/* Call to Action Section */}
      <section className="py-16 bg-estates-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              Join Our Growing Investment Network
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-3xl mx-auto">
              Be part of Nepal's next major real estate success story. Invest in Saukhel Real Estate and secure long-term financial growth.
            </p>
            <form onSubmit={handleContactSubmit} className="flex flex-col md:flex-row gap-3 max-w-lg mx-auto mb-8">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-white/10 text-white border-white/20 placeholder:text-white/50"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="submit" variant="default" className="bg-white text-estates-primary hover:bg-white/90">
                Request Information
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-estates-secondary mb-6 tracking-tight">
                Get In Touch
              </h2>
              <div className="space-y-6">
                <ContactItem 
                  icon={<Calendar className="h-6 w-6 text-estates-primary" />} 
                  text="Schedule a Site Visit"
                  action={
                    <Button variant="outline" size="sm" onClick={handleScheduleVisit}>
                      Book Now
                    </Button>
                  }
                />
                <ContactItem 
                  icon={<Phone className="h-6 w-6 text-estates-primary" />} 
                  text="Call Us: 01-4526267/8"
                  action={
                    <Button variant="outline" size="sm" onClick={() => window.open('tel:01-4526267')}>
                      Call
                    </Button>
                  }
                />
                <ContactItem 
                  icon={<Mail className="h-6 w-6 text-estates-primary" />} 
                  text="Email: info@projestates.com"
                  action={
                    <Button variant="outline" size="sm" onClick={() => window.open('mailto:info@projestates.com')}>
                      Email
                    </Button>
                  }
                />
                <ContactItem 
                  icon={<MapPin className="h-6 w-6 text-estates-primary" />} 
                  text="Visit Us: Furtiman Marg-5, Bishalnagar, Kathmandu, Nepal"
                  action={
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => window.open('https://maps.google.com/?q=Bishalnagar,Kathmandu,Nepal', '_blank')}
                    >
                      View Map
                    </Button>
                  }
                />
              </div>
            </div>
            <div className="bg-estates-gray-100 p-8 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-estates-secondary mb-6">Investor Support</h3>
              <p className="text-gray-600 mb-6">
                Our dedicated investor relations team is available to assist you with any inquiries about the Saukhel Real Estate Project and investment opportunities.
              </p>
              <div className="flex flex-col space-y-4">
                <Button variant="cta" onClick={() => window.location.href = "/project-description"}>
                  View Project Details
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" onClick={() => window.location.href = "/faqs"}>
                  Frequently Asked Questions
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Helper Components
const HighlightItem = ({ text }: { text: string }) => (
  <li className="flex items-start">
    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
    <span className="text-gray-600">{text}</span>
  </li>
);

const TermItem = ({ text }: { text: string }) => (
  <li className="flex items-start">
    <div className="w-2 h-2 bg-estates-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
    <span className="text-gray-600">{text}</span>
  </li>
);

const TeamCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) => (
  <div className="bg-white p-8 rounded-xl shadow-md text-center border border-estates-gray-200 hover:shadow-lg transition-all duration-300 group">
    <div className="w-20 h-20 rounded-full bg-estates-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-estates-secondary mb-4 group-hover:text-estates-primary transition-colors">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const ContactItem = ({ 
  icon, 
  text, 
  action 
}: { 
  icon: React.ReactNode; 
  text: string; 
  action: React.ReactNode;
}) => (
  <div className="flex items-center justify-between bg-estates-gray-100 p-4 rounded-lg border border-estates-gray-200 hover:border-estates-primary/20 transition-colors group">
    <div className="flex items-center">
      <div className="mr-4">{icon}</div>
      <span className="text-gray-600">{text}</span>
    </div>
    <div>
      {action}
    </div>
  </div>
);

export default InvestmentRelations;

