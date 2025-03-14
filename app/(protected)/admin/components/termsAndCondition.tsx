"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const TermsAndCondition = () => {
  const [terms, setTerms] = useState([
    { id: 1, title: "Term 1", content: "This is the first term." },
    { id: 2, title: "Term 2", content: "This is the second term." },
  ]);

  const addNewTerm = () => {
    const newTerm = {
      id: terms.length + 1,
      title: `Term ${terms.length + 1}`,
      content: "This is a dynamically added term.",
    };
    setTerms([...terms, newTerm]);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Terms & Conditions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {terms.map((term) => (
          <Card key={term.id} className="shadow-md">
            <CardHeader>
              <CardTitle>{term.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{term.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button className="mt-4" onClick={addNewTerm}>
        Add Term
      </Button>
    </div>
  );
};

export default TermsAndCondition;
