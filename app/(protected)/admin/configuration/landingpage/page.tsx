"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const LandingPageEditor = () => {
  const [heading, setHeading] = useState("Welcome to Our Website");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [content, setContent] = useState(
    "This is the default content for the landing page."
  );

  return (
    <div className="p-6 w-[100%] mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Landing Page Editor
      </h1>

      {/* Heading Input */}
      <div className="mb-4">
        <label className="block font-semibold text-gray-700">Heading</label>
        <Input
          type="text"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          className="mt-2"
        />
      </div>

      {/* Background Image Input */}
      <div className="mb-4">
        <label className="block font-semibold text-gray-700">
          Background Image URL
        </label>
        <Input
          type="text"
          placeholder="Paste image URL here"
          value={backgroundImage}
          onChange={(e) => setBackgroundImage(e.target.value)}
          className="mt-2"
        />
      </div>

      {/* Content Input */}
      <div className="mb-6">
        <label className="block font-semibold text-gray-700">Content</label>
        <Textarea
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-2"
        />
      </div>

      {/* Preview Section */}
      <div className="p-4 border rounded-lg bg-gray-50">
        <h2 className="text-xl font-semibold">Live Preview</h2>
        <div
          className="h-48 mt-2 flex items-center justify-center text-white font-bold text-2xl rounded-lg"
          style={{
            background: backgroundImage
              ? `url(${backgroundImage}) center/cover no-repeat`
              : "gray",
          }}
        >
          {heading}
        </div>
        <p className="mt-4 text-gray-700">{content}</p>
      </div>

      {/* Save Button */}
      <div className="mt-6">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default LandingPageEditor;
