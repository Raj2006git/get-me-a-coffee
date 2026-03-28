import { NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/models/User";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Incoming Data:", body);

    if (!body.email) {
      return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 });
    }

    await mongoose.connect("mongodb://localhost:27017/coffee");

    const updatedUser = await User.findOneAndUpdate(
      { email: body.email },
      {
        name: body.name,
        username: body.username,
        credentials: body.credentials,
        profilePicture: body.profilePicture,
      },
      { new: true, upsert: false }
    );

    if (!updatedUser) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (err) {
    console.error("Update Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
