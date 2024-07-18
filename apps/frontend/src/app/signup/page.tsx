import { Button, Input } from "@nextui-org/react";
import React from "react";

const page = () => {
  return (
    <div className="grid sm:grid-cols-2 content-center items-center h-full">
      <div className="hidden sm:block">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium
          beatae sunt asperiores, minima ipsum pariatur consequuntur accusamus.
          Dignissimos tempore culpa illo vero, nesciunt labore. Qui,
          exercitationem dolorem. Ad, sit rerum.
        </p>
      </div>
      <div className="mx-auto w-1/2">
      <div className="flex justify-center flex-col gap-4 w-full">
        <h3 className="text-center">Signup/Login</h3>
        <Input placeholder="Email" size="sm"/>
        <Input placeholder="Password" size="sm"/>
        <Button radius="sm">Login</Button>
      </div>
      </div>
    </div>
  );
};

export default page;
