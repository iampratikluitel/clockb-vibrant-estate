import { currentUser } from "@/lib/auth";
import { connectDb } from "@/lib/mongodb";
import TeamMember from "@/model/about/team-member-add";
import Appointment from "@/model/appoinment";
import NewsLetter from "@/model/Newsletter";
import UpcommingProject from "@/model/Projects/ProjectDescription";
import { NextResponse } from "next/server";

export const GET = async () => {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json("Forbidden", { status: 403 });
  }

  try {
    await connectDb();

    const currentDate = new Date();
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const startOfNextMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );

    const NewsLetterCount = await NewsLetter.countDocuments({
      subscribedDate: {
        $gte: startOfMonth,
        $lt: startOfNextMonth,
      },
    });

    const AppointmentCount = await Appointment.countDocuments({});

    const ProjectCount = await UpcommingProject.countDocuments({
      category: "ongoing",
    });

    const UsersCount = await TeamMember.countDocuments({
      addedDate: {
        $gte: startOfMonth,
        $lt: startOfNextMonth,
      },
    });

    return NextResponse.json(
      {
        NewsLetterCount,
        AppointmentCount,
        ProjectCount,
        UsersCount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};
