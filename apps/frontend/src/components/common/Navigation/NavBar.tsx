"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { UserActionsDropdown } from "../UserActionsDropdown";
import { ThemeToggle } from "../ThemeToggle";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useLogin from "@/hooks/useLogin";

const NavBar = () => {
  const pathname = usePathname();
  const { is_logged_in } = useLogin();
  const { push } = useRouter();

  const goToCreatePost = () => {
    push("/blog/create");
  };

  let active_link_class = "underline underline-offset-4 text-zinc-800 dark:text-zinc-200";

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center w-full">
      <Link
        href="/"
        className="flex items-center justify-center"
        prefetch={false}
      >
        <Image src="/images/logo.svg" width={40} height={40} alt="Logo" />
        <span className="sr-only">Blog Website</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          href="/"
          className={clsx(
            "text-sm font-medium text-muted-foreground hover:text-zinc-800 dark:hover:text-zinc-200 flex flex-col justify-center",
            {
              [active_link_class]: pathname === "/",
            }
          )}
          prefetch={false}
        >
          Home
        </Link>
        <Link
          href="/blog"
          className={clsx(
            "text-sm font-medium text-muted-foreground hover:text-zinc-800 dark:hover:text-zinc-200 flex flex-col justify-center",
            {
              [active_link_class]: pathname === "/blog",
            }
          )}
          prefetch={false}
        >
          Blog
        </Link>
        <Link
          href="/about"
          className={clsx(
            "text-sm font-medium text-muted-foreground hover:text-zinc-800 dark:hover:text-zinc-200 flex flex-col justify-center",
            {
              [active_link_class]: pathname === "/about",
            }
          )}
          prefetch={false}
        >
          About
        </Link>
        {is_logged_in && !pathname?.includes("/blog/create") ? (
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
