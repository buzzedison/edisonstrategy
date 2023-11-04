import { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import jsonwebtoken from 'jsonwebtoken';
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  jwt: {
    encode: ({ secret, token }) => {
      const encodedToken = jsonwebtoken.sign(
        {
          ...token,
          iss: "YourApp",
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        secret
      );
      return encodedToken;
    },
    decode: async ({ secret, token }) => {
      const decodedToken = jsonwebtoken.verify(token!, secret);
      return decodedToken as JWT;
    },
  },
  theme: {
    colorScheme: "light",
    logo: "/logo.svg",
  },
  callbacks: {
    async session({ session }) {
      // No need to fetch user profile, just return the session
      return session;
    },
    async signIn({ user }: { user: User }) {
      // No need to check if user exists or create a new user
      return true;
    },
  },
};
