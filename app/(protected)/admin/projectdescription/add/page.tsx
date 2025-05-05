import React from "react";
import AddProjectForm from "../../components/projectDescription/projectForm";
import { connectDb } from "@/lib/mongodb";
import ProjectCategory from "@/model/Projects/ProjectCategory";

const AddProject = async () => {
  await connectDb();
    const categories = await ProjectCategory.find({ status: true }).lean();
    const plainCategories = categories.map((category: any) => ({
      ...category,
      _id: category._id.toString(),
    }));

  return (
    <div className="px-5 py-10">
      <AddProjectForm type={"Add"} projectCategory={plainCategories} />
    </div>
  );
};

export default AddProject;
