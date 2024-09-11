"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { UserActionsDropdown } from "../UserActionsDropdown";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { PencilLine } from "lucide-react";
import { source_serif_4 } from "@/app/fonts";
import { useSession } from "next-auth/react";

const NavBar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { push } = useRouter();

  useEffect(() => {
    if(session && session.user){
      sessionStorage.setItem("profile", JSON.stringify(session.user));
    }
  }, [session]);
  
  const goToCreatePost = () => {
    push("/blog/create");
  };

  const renderAuthActions = () => {
    if (session) return null;
    return (
      <>
        <Link
          href={"/signup"}
          className={clsx(
            "text-sm font-medium text-muted-foreground hover:text-zinc-800 dark:hover:text-zinc-200 flex flex-col justify-center",
            {
              [active_link_class]: pathname === "/signup",
            }
          )}
          prefetch={false}
        >
          SignUp
        </Link>
        <Link
          href={"api/auth/signin"}
          className={clsx(
            "text-sm font-medium text-muted-foreground hover:text-zinc-800 dark:hover:text-zinc-200 flex flex-col justify-center",
            {
              [active_link_class]: pathname === "api/auth/signin",
            }
          )}
          prefetch={false}
        >
          Login
        </Link>
      </>
    );
  };

  let active_link_class =
    "underline underline-offset-4 text-zinc-800 dark:text-zinc-200";

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center w-full border-b">
      <Link
        href="/"
        className="flex items-center justify-center"
        prefetch={false}
      >
        <Image src="/images/logo.svg" width={40} height={40} alt="Logo" />
        <p
          className={`${source_serif_4.className} font-semibold text-2xl ml-2`}
        >
          neko.
        </p>
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
        {renderAuthActions()}
        {session && !pathname?.includes("/blog/create") ? (
          <Button
            onClick={goToCreatePost}
            size={"default"}
            className="flex gap-2"
          >
            <PencilLine color="#ffffff" size={18} />
            Write
          </Button>
        ) : null}
        {session ? <UserActionsDropdown /> : null}
      </nav>
    </header>
  );
};

export default NavBar;
