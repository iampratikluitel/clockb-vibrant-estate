import { auth } from "@/auth";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const authRoutes = ["/login", "/error", "/forgotpassword", "/resetpassword"];
  const isProtectedRoute = nextUrl.pathname.startsWith("/admin");
  const DEFAULT_ADMIN_REDIRECT = "/admin";

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_ADMIN_REDIRECT, nextUrl));
    }
    return ;
  }

  if (isProtectedRoute) {
    if (!isLoggedIn) {
      return Response.redirect(new URL("/login", nextUrl));
    }
  }
  return ;
});
// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
