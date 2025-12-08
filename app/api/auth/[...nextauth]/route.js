import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/db";
import User from "@/lib/models/User.model";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter an email and password");
        }

        // Find user and include password for comparison
        const user = await User.findOne({ email: credentials.email }).select("+password");

        if (!user) {
          throw new Error("No user found with this email");
        }

        // Check if password matches
        const isMatch = await user.comparePassword(credentials.password);

        if (!isMatch) {
          throw new Error("Invalid password");
        }

        // Check if account is active
        if (!user.isActive) {
          throw new Error("Account is deactivated");
        }

        return {
          id: user._id.toString(),
          name: user.username,
          email: user.email,
          image: user.profilePicture,
          isAdmin: user.isAdmin,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
