import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      profile: {
        first_name: string;
        last_name: string;
        id: string;
        email: string;
      },
      token: string;
    };
  }
}
