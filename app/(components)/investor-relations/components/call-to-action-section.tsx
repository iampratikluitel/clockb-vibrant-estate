"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { toast } from "sonner";

export default function CallToAction() {
  const [email, setEmail] = useState("");

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Request sent! We'll get back to you as soon as possible.");
    setEmail("");
  };

  return (
    <>
      <section className="py-16 bg-estates-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              Join Our Growing Investment Network
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-3xl mx-auto">
              Be part of Nepal's next major real estate success story. Invest in
              Saukhel Real Estate and secure long-term financial growth.
            </p>
            <form
              onSubmit={handleContactSubmit}
              className="flex flex-col md:flex-row gap-3 max-w-lg mx-auto mb-8"
            >
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-white/10 text-white border-white/20 placeholder:text-white/50"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                type="submit"
                variant="default"
                className="bg-white text-estates-primary hover:bg-white/90"
              >
                Request Information
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
