import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // This is where you would validate the user credentials
        // For demo purposes, we'll just check if the email/password is admin/admin
        
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        
        // In a real application, you would check the credentials against your database
        // For now, we'll just return a mock user
        if (credentials.email === "admin@example.com" && credentials.password === "password123") {
          return {
            id: "1",
            name: "Admin User",
            email: "admin@example.com",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
          };
        }
        
        return null;
      }
    })
  ],
  pages: {
    signIn: '/login',
    signUp: '/register',
    error: '/auth/error'
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // You can add custom claims here
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        // Add any custom session properties here
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
};