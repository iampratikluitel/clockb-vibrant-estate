"use client";

import { Briefcase, MenuIcon } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { paths } from "@/lib/paths";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const Menu = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  const handleLinkClick = () => {
    setOpen(false);
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="p-0">
            <MenuIcon className="h-12 w-12 cursor-pointer" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-full bg-black text-white p-0 border-none"
        >
          <SheetHeader className="px-6 py-4">
            <SheetTitle className="text-white">Menu</SheetTitle>
            <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100" />
          </SheetHeader>
          <nav className="flex flex-col md:hidden w-full h-full pt-8">
            <div className="flex flex-col items-center text-xl">
              <Link
                href={paths.public.home}
                onClick={handleLinkClick}
                className={`py-3 w-full text-center transition-colors ${
                  isActive(paths.public.home)
                    ? "bg-primary text-white"
                    : "hover:bg-gray-900"
                }`}
              >
                Home
              </Link>

              <Link
                href={`${paths.public.about}`}
                onClick={handleLinkClick}
                className={`py-3 w-full text-center transition-colors ${
                  isActive(paths.public.about)
                    ? "bg-primary text-white"
                    : "hover:bg-gray-900"
                }`}
              >
                About
              </Link>

              <Link
                href={paths.public.projectdescription}
                onClick={handleLinkClick}
                className={`py-3 w-full text-center transition-colors ${
                  isActive(paths.public.projectdescription)
                    ? "bg-primary text-white"
                    : "hover:bg-gray-900"
                }`}
              >
                Project Description
              </Link>

              <Link
                href={paths.public.investorelations}
                onClick={handleLinkClick}
                className={`py-3 w-full text-center transition-colors ${
                  isActive(paths.public.investorelations)
                    ? "bg-primary text-white"
                    : "hover:bg-gray-900"
                }`}
              >
                Investor Relations
              </Link>

              <Link
                href={paths.public.contact}
                onClick={handleLinkClick}
                className={`py-3 w-full text-center transition-colors ${
                  isActive(paths.public.contact)
                    ? "bg-primary text-white"
                    : "hover:bg-gray-900"
                }`}
              >
                Contact
              </Link>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Menu;
