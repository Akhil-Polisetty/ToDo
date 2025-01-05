import connectDB, { disconnectDB } from "@/source/db";
import { NextResponse } from "next/server";

import WorkModel from "@/models/WorkModel";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;
    console.log(body);
    console.log(email , password);
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }
    await connectDB();
    const existingUser = await WorkModel.findOne({ email: email });
    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    console.log("The existing password is ",existingUser.password);
    console.log("got passwoord as ",password);
    console.log(existingUser.password == password);
    if(existingUser.password != password) {
      return NextResponse.json({ message: "Password is incorrect" }, { status: 400 });

    }
    return NextResponse.json(
      existingUser,
      { message: "User logged in successfully" },
      { status: 200 }
    );

  } catch (err) {
    console.log("Error in fetching works", err);
    return NextResponse.json({ message: "Error in fetching works" });
  }
}
