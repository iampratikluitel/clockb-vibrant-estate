'use client'

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { QuoteIcon } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Project Estates has provided me with a secure and profitable investment opportunity that exceeded my expectations.",
    name: "Sarah Johnson",
    role: "Real Estate Investor",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&auto=format&fit=crop&q=80",
  },
  {
    quote: "The team's professionalism and transparency throughout the investment process made me feel confident in my decision.",
    name: "Michael Chen",
    role: "Property Developer",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=150&h=150&auto=format&fit=crop&q=80",
  },
  {
    quote: "Their market insights and strategic approach to real estate investments have consistently delivered strong returns.",
    name: "Emma Rodriguez",
    role: "Investment Banker",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&auto=format&fit=crop&q=80",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Investors Say
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <Carousel
          opts={{
            loop: true,
            align: "center",
          }}
          className="max-w-4xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-full">
                <div className="bg-estates-gray-100 p-8 md:p-10 rounded-lg shadow-md flex flex-col items-center text-center animate-fade-in">
                  <QuoteIcon 
                    className="w-12 h-12 text-blue-600 mb-6 opacity-50" 
                    strokeWidth={1.5} 
                  />
                  
                  <blockquote className="text-lg md:text-xl font-medium text-gray-800 mb-8">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div className="flex flex-col items-center">
                    <Avatar className="w-16 h-16 border-2 border-blue-600 mb-4">
                      <AvatarImage src={testimonial.image} alt={testimonial.name} />
                      <AvatarFallback className="bg-blue-600 text-white">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="flex justify-center gap-4 mt-8">
            <CarouselPrevious variant="outline" size="lg" className="static transform-none" />
            <CarouselNext variant="outline" size="lg" className="static transform-none" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
