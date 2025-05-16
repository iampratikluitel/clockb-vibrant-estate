import {
  DollarSign,
  BarChart,
  FileText,
  ShieldCheck,
  Handshake,
  CheckCircle,
  Clock,
  TrendingUp,
  MapPin,
  ArrowRight,
} from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";

export default function InvestmentModelSection() {
  return (
    <>
      <section className="py-20 bg-estates-gray-100 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-estates-secondary mb-6 tracking-tight">
              Investment Model: How It Works
            </h2>
            <div className="w-24 h-1.5 bg-estates-primary mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-10">
              A seamless and secure investment process designed for maximum
              returns.
            </p>
          </div>

          <div className="max-w-5xl mx-auto relative">
            {/* Main timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-estates-primary/80 via-estates-primary to-estates-primary/20 transform -translate-x-1/2 hidden md:block"></div>

            <div className="space-y-0">
              {/* Step items */}
              <div className="md:grid md:grid-cols-2 gap-8 mb-24 relative">
                <div className="md:col-span-2 flex justify-center mb-8">
                  <div className="w-20 h-20 rounded-full bg-estates-primary text-white flex items-center justify-center text-2xl font-bold z-10 shadow-lg">
                    1
                  </div>
                </div>
                <div className="bg-estates-gray-100 md:col-span-2 text-center mb-8 p-4">
                  <h3 className="text-2xl font-bold text-estates-secondary mb-3">
                    Choose Your Investment Plan
                  </h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Select from our range of flexible investment options
                    tailored to your financial goals and risk tolerance.
                    Short-term and long-term plans available with transparent
                    terms.
                  </p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-estates-primary">
                  <h4 className="text-lg font-semibold text-estates-primary mb-3">
                    Short-Term Growth
                  </h4>
                  <p className="text-gray-600 mb-4">
                    2-3 year investment horizon with competitive returns and
                    flexible exit options.
                  </p>
                  <DollarSign className="h-12 w-12 text-estates-primary/20" />
                </div>
                <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-estates-primary mt-6 md:mt-0">
                  <h4 className="text-lg font-semibold text-estates-primary mb-3">
                    Long-Term Appreciation
                  </h4>
                  <p className="text-gray-600 mb-4">
                    4+ year investment with maximized returns and priority land
                    selection rights.
                  </p>
                  <BarChart className="h-12 w-12 text-estates-primary/20" />
                </div>
              </div>

              {/* Step 2 */}
              <div className="md:grid md:grid-cols-2 gap-8 mb-24 relative">
                <div className="md:col-span-2 flex justify-center mb-8">
                  <div className="w-20 h-20 rounded-full bg-estates-primary text-white flex items-center justify-center text-2xl font-bold z-10 shadow-lg">
                    2
                  </div>
                </div>
                <div className="bg-estates-gray-100 md:col-span-2 text-center mb-8 p-4">
                  <h3 className="text-2xl font-bold text-estates-secondary mb-3">
                    Legal & Financial Due Diligence
                  </h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Our transparent process ensures you have access to all legal
                    documents and financial projections before you invest.
                  </p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-estates-primary">
                  <h4 className="text-lg font-semibold text-estates-primary mb-3">
                    Documentation
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Complete legal verification of property titles and
                    investment agreements.
                  </p>
                  <FileText className="h-12 w-12 text-estates-primary/20" />
                </div>
                <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-estates-primary mt-6 md:mt-0">
                  <h4 className="text-lg font-semibold text-estates-primary mb-3">
                    Financial Analysis
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Detailed ROI projections and risk assessment for informed
                    decision-making.
                  </p>
                  <ShieldCheck className="h-12 w-12 text-estates-primary/20" />
                </div>
              </div>

              {/* Step 3 */}
              <div className="md:grid md:grid-cols-2 gap-8 mb-24 relative">
                <div className="md:col-span-2 flex justify-center mb-8 pt-24">
                  <div className="w-20 h-20 rounded-full bg-estates-primary text-white flex items-center justify-center text-2xl font-bold z-10 shadow-lg">
                    3
                  </div>
                </div>
                <div className="bg-estates-gray-100 md:col-span-2 text-center mb-8 p-4">
                  <h3 className="text-2xl font-bold text-estates-secondary mb-3">
                    Investment Confirmation
                  </h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Secure your position in the Saukhel Real Estate Project with
                    our simple and efficient investment process.
                  </p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-estates-primary">
                  <h4 className="text-lg font-semibold text-estates-primary mb-3">
                    Secure Transaction
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Protected investment channels with full documentation and
                    receipts.
                  </p>
                  <Handshake className="h-12 w-12 text-estates-primary/20" />
                </div>
                <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-estates-primary mt-6 md:mt-0">
                  <h4 className="text-lg font-semibold text-estates-primary mb-3">
                    Ownership Confirmation
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Receive official documentation confirming your investment
                    stake.
                  </p>
                  <CheckCircle className="h-12 w-12 text-estates-primary/20" />
                </div>
              </div>

              {/* Step 4 */}
              <div className="md:grid md:grid-cols-2 gap-8 mb-24 relative">
                <div className="md:col-span-2 flex justify-center mb-8 pt-24">
                  <div className="w-20 h-20 rounded-full bg-estates-primary text-white flex items-center justify-center text-2xl font-bold z-10 shadow-lg">
                    4
                  </div>
                </div>
                <div className="bg-estates-gray-100 md:col-span-2 text-center mb-8 p-4">
                  <h3 className="text-2xl font-bold text-estates-secondary mb-3">
                    Value Appreciation & Project Growth
                  </h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Watch your investment grow as we develop the project and
                    implement infrastructure improvements.
                  </p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-estates-primary">
                  <h4 className="text-lg font-semibold text-estates-primary mb-3">
                    Development Timeline
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Regular updates on construction progress and infrastructure
                    development.
                  </p>
                  <Clock className="h-12 w-12 text-estates-primary/20" />
                </div>
                <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-estates-primary mt-6 md:mt-0">
                  <h4 className="text-lg font-semibold text-estates-primary mb-3">
                    Value Growth
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Track your investment&apos;s appreciation through our investor
                    portal.
                  </p>
                  <TrendingUp className="h-12 w-12 text-estates-primary/20" />
                </div>
              </div>

              {/* Step 5 */}
              <div className="md:grid md:grid-cols-2 gap-8 relative">
                <div className="md:col-span-2 flex justify-center mb-8 pt-24">
                  <div className="w-20 h-20 rounded-full bg-estates-primary text-white flex items-center justify-center text-2xl font-bold z-10 shadow-lg">
                    5
                  </div>
                </div>
                <div className="bg-estates-gray-100 md:col-span-2 text-center mb-8 p-4">
                  <h3 className="text-2xl font-bold text-estates-secondary mb-3">
                    Exit & Profit Realization
                  </h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Multiple exit options allow you to realize profits or
                    continue your investment journey with us.
                  </p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-estates-primary">
                  <h4 className="text-lg font-semibold text-estates-primary mb-3">
                    Cash Exit
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Sell your investment stake for immediate cash returns with
                    no hidden fees.
                  </p>
                  <DollarSign className="h-12 w-12 text-estates-primary/20" />
                </div>
                <div className="bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-estates-primary mt-6 md:mt-0">
                  <h4 className="text-lg font-semibold text-estates-primary mb-3">
                    Land Acquisition
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Convert your investment into premium land plots based on
                    current valuation.
                  </p>
                  <MapPin className="h-12 w-12 text-estates-primary/20" />
                </div>
              </div>
            </div>

            <div className="text-center mt-16">
              <Button
                variant="cta"
                size="xl"
                onClick={() => (window.location.href = "/contact")}
                className="group"
              >
                Start Your Investment Journey Today!
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
