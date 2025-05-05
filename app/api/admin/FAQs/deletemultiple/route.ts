import { currentUser } from "@/lib/auth";
import { connectDb } from "@/lib/mongodb";
import { FAQs } from "@/model/FAQs";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (request: NextRequest) => {
    console.log("Running DELETE request: Admin DELETE Multiple FAQs by id");
    const user = await currentUser();
   
    try {
      await connectDb();
      const { faqIds } = await request.json();
      if (user) {
        // Fetch Blogs to delete
        const faqsToDelete = await FAQs.find({
            _id: { $in: faqIds },
            });

        if (!faqsToDelete || faqsToDelete.length === 0) {
            return NextResponse.json({ message: "No FAQs Found" }, { status: 404 });
        }
        await FAQs.deleteMany({
            _id: { $in: faqIds },
          });
          console.log("FAQs Deleted")
          return NextResponse.json({ message: "FAQs Deleted" }, { status: 201 });

      }else{
        return NextResponse.json(JSON.stringify("Forbidden"), { status: 200 });
      }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });  
    }
}