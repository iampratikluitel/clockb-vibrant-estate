"use client";
import React, { useEffect, useState } from "react";
import FAQForm from "./FAQForm";

interface props {
  type: "Add" | "Edit";
  id: string;
}

const FAQBeforeForm = ({ type, id }: props) => {
  const [existingDetail, setExistingDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (type === "Edit" && id) {
      fetch(`/api/admin/faqs/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setExistingDetail(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching FAQ:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [type, id]);
  return (
    <>
      {loading ? (
        <div className="h-[100vh] w-full flex justify-center items-center">
          <p className="loader"></p>
        </div>
      ) : (
        <FAQForm type={type} ExistingDetail={existingDetail} />
      )}
    </>
  );
};

export default FAQBeforeForm;
