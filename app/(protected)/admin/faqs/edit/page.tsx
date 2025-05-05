import React from "react";
import { connectDb } from "@/lib/mongodb";
import { FAQsCategory } from "@/model/FAQs";
import FAQForm from "../../components/FAQs/FAQForm";

type Props = {
  params: {};
  searchParams: {id: string};
}

const EditFaq = async(props: Props) => {
  const { id } = props.searchParams;

  await connectDb();
  const categories = await FAQsCategory.find({ status: true }).lean();
  const plainCategories = categories.map((category: any) => ({
    ...category,
    _id: category._id.toString(),
  }));

  return <FAQForm type={"Edit"} faqCategory={plainCategories} />;
};

export default EditFaq;
