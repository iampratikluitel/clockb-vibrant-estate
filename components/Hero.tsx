'use client'

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1773&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-estates-secondary/80 to-estates-primary/70" /> {/* Gradient overlay */}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Transforming Real Estate into Value-Driven Investments
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
            Sustainable, Functional, and Profitable Developments for Investors
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              className="bg-estates-primary hover:bg-estates-primary/90 text-white font-semibold px-8 py-6 text-lg rounded-lg 
                transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-xl active:translate-y-0 
                shadow-lg hover:shadow-estates-primary/20 group"
            >
              <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              Download Brochure
            </Button>
            <Button
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/20 font-semibold px-8 py-6 text-lg rounded-lg
                transition-all duration-300"
            >
              Our Projects
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Feature Boxes */}
      <div className="absolute bottom-[-30px] left-0 right-0 px-4 hidden md:block">
        <div className="container mx-auto">
          <div className="grid grid-cols-3 gap-6">
            {[
              { title: "Premium Locations", desc: "Strategic properties in high-growth areas" },
              { title: "Sustainable Design", desc: "Eco-friendly construction with modern amenities" },
              { title: "High ROI", desc: "Consistent returns on investment portfolios" }
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg transform hover:-translate-y-2 transition-transform duration-300"
              >
                <h3 className="text-estates-primary font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-[2px] h-8 bg-white/50 rounded-full" />
      </div>
    </div>
  );
};

export default Hero;
