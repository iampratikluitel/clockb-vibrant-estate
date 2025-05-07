import React from "react";
import FAQForm from "../../components/FAQs/FAQForm";
import { connectDb } from "@/lib/mongodb";
import { FAQsCategory } from "@/model/FAQs";

const AddFaq = async () => {
  await connectDb();
  const categories = await FAQsCategory.find({ status: true}).lean();
  const plainCategories = categories.map((category: any) => ({
    ...category,
    _id: category._id.toString(),
  }))

  return (
    <div>
      <FAQForm type={"Add"} faqCategory={plainCategories} />
    </div>
  );
};

export default AddFaq;
