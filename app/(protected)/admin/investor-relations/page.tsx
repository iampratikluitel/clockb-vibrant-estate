import React from "react";
import { Button } from "@/components/ui/button";
import Overview from "./overview/page";
import KeyHighlight from "./key-highlight/page";

const ProjectDescription = () => {
  return (
    <div className="full space-y-2">
      <div>
        <h1>Investor Relation</h1>
      </div>
      <Overview />
      <KeyHighlight />
      <div className="flex justify-end items-end">
        <Button variant="default">Submit</Button>
      </div>
    </div>
  );
};

export default ProjectDescription;
