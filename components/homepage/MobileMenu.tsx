"use client";

import { MenuIcon, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { paths } from "@/lib/paths";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetClose,
  SheetContent,
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

  const isActive = (path: string) => pathname === path;

  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="p-0">
            <MenuIcon className="h-8 w-8 cursor-pointer" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>

        <SheetContent
          side="left"
          className="w-full bg-black text-white p-0 border-none"
        >
          <div className="flex justify-between items-center px-6 py-4">
            <h2 className="text-white text-2xl font-bold">Menu</h2>
          </div>

          <nav className="flex flex-col md:hidden w-full h-full pt-4">
            <div className="flex flex-col items-center text-xl">
              {[
                { label: "Home", path: paths.public.home },
                { label: "About", path: paths.public.about },
                { label: "Project Description", path: paths.public.projectdescription },
                { label: "Investor Relations", path: paths.public.investorelations },
                { label: "Contact", path: paths.public.contact },
              ].map(({ label, path }) => (
                <Link
                  key={path}
                  href={path}
                  onClick={handleLinkClick}
                  className={`py-3 w-full text-center transition-colors ${
                    isActive(path)
                      ? "bg-primary text-white"
                      : "hover:bg-gray-900"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Menu;
