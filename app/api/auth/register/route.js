import connectDB, { disconnectDB } from "@/source/db";
import { NextResponse } from "next/server";

import WorkModel from "@/models/WorkModel";

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, email, password } = body;
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }
    await connectDB();
    const existingUser = await WorkModel.findOne({ email: email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already found" },
        { status: 404 }
      );
    }

    const newUser = {
      username: username,
      email: email,
      password: password,
    };
    await WorkModel.create(newUser);
    return NextResponse.json(
      { message: "User created in successfully" },
      { status: 200 }
    );
    // TODO: Add validation and hashing logic
  } catch (err) {
    console.log("Error in fetching works", err);
    return NextResponse.json({ message: "Error in fetching works" });
  }
  finally {
    await disconnectDB();
  }
}
