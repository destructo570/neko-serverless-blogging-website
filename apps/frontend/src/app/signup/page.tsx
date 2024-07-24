"use client";
import { useRouter } from 'next/navigation';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useMemo, useState } from "react";
import { signIn, signUp } from "@/api/api";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const page = (props) => {
  const {} = props;
  const [selected_tab, setSelectedTab] = useState("signin");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { push } = useRouter();
  const is_login = useMemo(() => selected_tab === "signin", [selected_tab]);

  const onLogin = async () => {
    const payload = {
      email,
      password,
    };
    
    const response = await signIn(payload);
    console.log("response2", response);
    // if(response && response?.status === 200){
    //   push("/blog");
    // }
  };

  const onSignup = async () => {
    const payload = {
      email,
      password,
      first_name,
      last_name
    };
    
    const response = await signUp(payload);
    console.log("response2", response);
    // if(response && response?.status === 200){
    //   push("/blog");
    // }
  }

  const onSelectedTabChange = (item) => {
    setSelectedTab(item);
  };

  return (
    <div className="mx-auto min-w-[448px] max-w-md space-y-6 min-h-screen py-40">
      <div className="space-y-2 text-center">
        <Tabs
          defaultValue={"signin"}
          className=""
          onValueChange={onSelectedTabChange}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
        </Tabs>
        <h1 className="text-3xl font-bold pt-6">
          {is_login ? "Login" : "Sign Up"}
        </h1>
        <p className="text-muted-foreground">
          {is_login
            ? "Login with your email and password."
            : "Create your account to get started."}
        </p>
      </div>
      <form className="space-y-4">
        {!is_login ? (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">First Name</Label>
              <Input id="first-name" placeholder="John" required value={first_name} onChange={(e) => setFirstName(e?.target?.value)}/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last Name</Label>
              <Input id="last-name" placeholder="Doe" required value={last_name} onChange={(e) => setLastName(e?.target?.value)}/>
            </div>
          </div>
        ) : null}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="example@acme.com"
            required
            value={email}
            onChange={(e) => setEmail(e?.target?.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e?.target?.value)}
          />
        </div>
        <Button
          type='button'
          className="w-full"
          onClick={is_login ? onLogin : onSignup}
        >
          {is_login ? "Login" : "Sign Up"}
        </Button>
      </form>
    </div>
  );
};

export default page;
