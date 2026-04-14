import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = String(credentials?.email || "").trim();
        const password = String(credentials?.password || "").trim();

        const validEmail = process.env.ADMIN_EMAIL?.trim();
        const validPassword = process.env.ADMIN_PASSWORD?.trim();

        if (!validEmail || !validPassword) {
          console.error("AUTH FATAL: ADMIN_EMAIL and ADMIN_PASSWORD env vars must be set");
          return null;
        }

        if (
          email.toLowerCase() === validEmail.toLowerCase() &&
          password === validPassword
        ) {
          return { id: "1", name: "KLE Admin", email: validEmail };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
});
