'use client';

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { QuoteIcon } from "lucide-react";
import { useGetPublicTestimonialsQuery } from "@/store/api/Public/publicTestimonails";
import { TESTIMONIALS } from "@/lib/types";
import PageLoader from "../PageLoader";

const Testimonials = () => {
  const { data, isLoading, error } = useGetPublicTestimonialsQuery("");

  const testimonials: TESTIMONIALS[] = data || [];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-md md:text-4xl font-bold text-gray-900 mb-4">
            What Our Investors Say
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <Carousel opts={{ loop: true, align: "center" }} className="max-w-4xl mx-auto">
          <CarouselContent>
            {testimonials.length > 0 ? (
              testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-full">
                  <div className="bg-estates-gray-100 p-8 md:p-10 rounded-lg shadow-md flex flex-col items-center text-center animate-fade-in">
                    <QuoteIcon className="w-12 h-12 text-blue-600 mb-6 opacity-50" strokeWidth={1.5} />
                    
                    <blockquote className="text-lg md:text-xl font-medium text-gray-800 mb-8">
                      &quot;{testimonial.description}
                    </blockquote>
                    
                    <div className="flex flex-col items-center">
                      <Avatar className="w-16 h-16 border-2 border-blue-600 mb-4">
                        <AvatarImage src={`/api/resources/download?filename=${encodeURIComponent(testimonial.image)}`} alt={testimonial.name} />
                        <AvatarFallback className="bg-blue-600 text-white">
                          {testimonial.name?.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                        <p className="text-gray-600 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))
            ) : (
              <p className="text-center text-gray-600"><PageLoader /></p>
            )}
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
