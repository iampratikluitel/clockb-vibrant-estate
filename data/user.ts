import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  console.log("🔹 Searching for user with email:", email);
  
  try {
    const user = await db.user.findUnique({
      where: { email },
    });

    console.log("🔹 Found user:", user);
    return user;
  } catch (error) {
    console.error("❌ Error fetching user from database:", error);
    return null;
  }
};
