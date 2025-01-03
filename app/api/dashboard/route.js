import connectDB, { disconnectDB } from "@/source/db";
import { NextResponse } from "next/server";
import WorkModel from "@/models/WorkModel";

export async function GET(req) {
  try {
    await connectDB();
    const result = await WorkModel.find();
    if (result.length <= 0) {
      return NextResponse.json({ message: "No works found" });
    }
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.log("Error in fetching works", err);
    return NextResponse.json({ message: "Error in fetching works" });
  } finally {
    await disconnectDB();
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { title, description } = body;
    console.log(title, description);
    const work = new WorkModel({ title, description });
    const result = await work.save();
    if (!result) {
      return NextResponse.json({ message: "Failed to add work" });
    }
    return NextResponse.json(
      { message: "Work added successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.log("Error in fetching works", err);
    return NextResponse.json({ message: "Error in fetching works" });
  } finally {
    await disconnectDB();
  }
}

export async function DELETE(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { title, description } = body;
    console.log(title);
    const result = await WorkModel.deleteOne({ title });
    if (!result) {
      return NextResponse.json({ message: "Failed to add work" });
    }
    return NextResponse.json(
      { message: "Work Deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.log("Error in fetching works", err);
    return NextResponse.json({ message: "Error in fetching works" });
  } finally {
    await disconnectDB();
  }
}

export async function PUT(req)
{
    try {
        await connectDB();
        const body = await req.json();
        const { title, updatedDescription } = body;
        console.log(title);


        const result = await WorkModel.findOneAndUpdate(
            { title: title},  
            { $set: { description: updatedDescription } }, 
            {
                upsert: false,             
                returnDocument: 'after'    
            }
        );
        
        console.log(result);
        
        if (!result) {
          return NextResponse.json({ message: "Failed to update work" });
        }
        return NextResponse.json(
          { message: "Work updated successfully" },
          { status: 200 }
        );
      } catch (err) {
        console.log("Error in fetching works", err);
        return NextResponse.json({ message: "Error in fetching works" });
      } finally {
        await disconnectDB();
      }
}
