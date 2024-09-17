import React from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

const page = (props) => {
  return (
    <div className="flex flex-col h-screen bg-background text-foreground pt-24">
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="h-24 w-24">
          <AvatarImage
            src="https://avatars.githubusercontent.com/u/27971772?v=4"
            alt="@shadcn"
          />
        </Avatar>
        <div className="space-y-1 text-center">
          <h2 className="text-2xl font-bold">Vishal Kashi</h2>
          <p className="text-sm text-muted-foreground">Software Engineer</p>
        </div>
        <div className="flex space-x-4">
          <Link
            href="https://github.com/destructo570"
            className="text-sm font-medium underline underline-offset-4 hover:text-primary"
            prefetch={false}
          >
            github
          </Link>
          <Link
            href="https://www.destructo.dev/"
            className="text-sm font-medium underline underline-offset-4 hover:text-primary"
            prefetch={false}
          >
            website
          </Link>
          <Link
            href="https://twitter.com/destructo570"
            className="text-sm font-medium underline underline-offset-4 hover:text-primary"
            prefetch={false}
          >
            twitter
          </Link>
        </div>
      </div>
    </div>
  );
};

page.propTypes = {};

export default page;
