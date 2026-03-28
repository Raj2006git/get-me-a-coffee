import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import mongoose from "mongoose";
import User from "@/models/User";
import Payment from "@/models/Payment";

let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  await mongoose.connect("mongodb://localhost:27017/coffee");
  isConnected = true;
}


export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET
    }),
    // Add more providers here if needed
  ],
  // Add more NextAuth config options here if needed
  

  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        await connectDB();

        const email = user.email;
        if (!email) return false;

        let currentUser = await User.findOne({ email });

        if (!currentUser) {
          const newUser = new User({
            email,
            username: email.split("@")[0],
          });
          await newUser.save();
          user.name = newUser.username;
        } else {
          user.name = currentUser.username;
        }

        return true;
      } catch (err) {
        console.error("Error in signIn callback:", err);
        return false;
      }
    },
  },
});