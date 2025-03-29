import { FileText, BriefcaseIcon, ArrowUpRight, Handshake, Building, ArrowRight } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button';

export default function TermAndCondition() {
  return (
    <>
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
                <h3 className="text-xl font-semibold text-estates-secondary">
                  Investment Requirements
                </h3>
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
                <h3 className="text-xl font-semibold text-estates-secondary">
                  Project Management & Taxation
                </h3>
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
                <h3 className="text-xl font-semibold text-estates-secondary">
                  Exit Options
                </h3>
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
                <h3 className="text-xl font-semibold text-estates-secondary">
                  Project Development Contribution
                </h3>
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
              <h3 className="text-xl font-semibold text-estates-secondary">
                Institutional & Large-Scale Investors
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              We facilitate custom investment projects under the investor's
              brand or institution.
            </p>
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/contact")}
              className="group"
            >
              Still Have Questions? Contact Us Today!
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>
      </>
  )
}

const TermItem = ({ text }: { text: string }) => (
    <li className="flex items-start">
      <div className="w-2 h-2 bg-estates-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
      <span className="text-gray-600">{text}</span>
    </li>
  );