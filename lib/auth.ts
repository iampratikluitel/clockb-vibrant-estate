import { auth } from "@/auth";

export const currentUser = async () => {
  const session = await auth();
  console.log("🔹 Session:", session);
  return session?.user;
};