"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const TermsAndCondition = () => {
  const [terms, setTerms] = useState([
    { title: "Term 1", content: "This is the first term." },
    { title: "Term 2", content: "This is the second term." },
  ]);

  const addNewTerm = () => {
    setTerms([...terms, { title: "", content: "" }]);
  };

  const updateTerm = (index, updatedTerm) => {
    setTerms((prev) =>
      prev.map((term, i) => (i === index ? updatedTerm : term))
    );
  };

  interface Term {
    title: string;
    content: string;
  }

  const deleteTerm = (index: number): void => {
    setTerms((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Terms & Conditions</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {terms.map((term, index) => (
          <Card key={index} className="shadow-md p-4 relative">
            <CardHeader>
              <h2 className="text-lg font-semibold">Card {index + 1}</h2>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  updateTerm(index, {
                    title: formData.get("title"),
                    content: formData.get("content"),
                  });
                }}
                className="space-y-3"
              >
                <Input
                  type="text"
                  name="title"
                  defaultValue={term.title}
                  placeholder="Enter heading"
                  className="border rounded-md p-2"
                />
                <Textarea
                  name="content"
                  defaultValue={term.content}
                  placeholder="Enter description"
                  className="border rounded-md p-2"
                />
                <div className="flex justify-between">
                  <Button type="submit">Save Changes</Button>
                  <Button
                    type="button"
                    onClick={() => deleteTerm(index)}
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    Delete
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-end items-end p-2">
        <Button className="" onClick={addNewTerm}>
          Add Term
        </Button>
      </div>
    </div>
  );
};

export default TermsAndCondition;
