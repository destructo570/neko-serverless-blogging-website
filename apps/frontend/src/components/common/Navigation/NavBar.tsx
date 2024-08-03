"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { UserActionsDropdown } from "../UserActionsDropdown";
import { ThemeToggle } from "../ThemeToggle";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import useLogin from "@/hooks/useLogin";

const NavBar = () => {
  const pathname = usePathname();
  const { is_logged_in } = useLogin();
  const { push } = useRouter();

  const goToCreatePost = () => {
    push("/blog");
  };

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center w-full">
      <Link
        href="/"
        className="flex items-center justify-center"
        prefetch={false}
      >
        <MountainIcon className="h-6 w-6" />
        <span className="sr-only">Blog Website</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          href="/"
          className={clsx(
            "text-sm font-medium text-muted-foreground hover:text-slate-800 flex flex-col justify-center",
            {
              "underline underline-offset-4 text-slate-800": pathname === "/",
            }
          )}
          prefetch={false}
        >
          Home
        </Link>
        <Link
          href="/blog"
          className={clsx(
            "text-sm font-medium text-muted-foreground hover:text-slate-800 flex flex-col justify-center",
            {
              "underline underline-offset-4 text-slate-800":
                pathname === "/blog",
            }
          )}
          prefetch={false}
        >
          Blog
        </Link>
        <Link
          href="/about"
          className={clsx(
            "text-sm font-medium text-muted-foreground hover:text-slate-800 flex flex-col justify-center",
            {
              "underline underline-offset-4 text-slate-800":
                pathname === "/about",
            }
          )}
          prefetch={false}
        >
          About
        </Link>
        {is_logged_in ? (
          <Button onClick={goToCreatePost}>Create Post</Button>
        ) : null}
        <ThemeToggle />
        {is_logged_in ? <UserActionsDropdown /> : null}
      </nav>
    </header>
  );
};

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

export default NavBar;
