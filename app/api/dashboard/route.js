import connectDB, { disconnectDB } from "@/source/db";
import { NextResponse } from "next/server";
import WorkModel from "@/models/WorkModel";

export async function GET(req) {
  try {
    await connectDB();
    const searchParams = req.cookies.get("email");
    console.log(searchParams.value);
    const user = await WorkModel.findOne({ email: searchParams.value });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    // console.log(user);
    const works = user.works_list;
    // console.log(works);
    return NextResponse.json(user, { status: 200 });
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
    const searchParams = req.cookies.get("email");
    console.log(searchParams.value);
    const { title, description, date } = body;
    // console.log(title, description);
    console.log("The final date is " + date);
    const user = await WorkModel.findOne({ email: searchParams.value });
    // console.log("The user is ",user)
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }

    if (!Array.isArray(user.worklist)) {
      user.worklist = [];
    }

    const updatedUser = await WorkModel.findOneAndUpdate(
      { email: searchParams.value },
      { $push: { works_list: { title, description, date: date } } },
      { new: true } // This returns the updated document
    );

    console.log(updatedUser); // Log the updated user document
    if (!updatedUser) {
      return NextResponse.json({ message: "Failed to add work" });
    }

    return NextResponse.json(
      { message: "Task added successfully" },
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
    const searchParams = req.cookies.get("email");
    console.log(searchParams.value);
    const { title, description } = body;
    console.log(title);
    console.log(searchParams.value);
    const user = await WorkModel.findOne({ email: searchParams.value });
    console.log(user);

    // Filter the worklist to exclude the task with the matching title
    const originalWorklist = user.works_list;
    const updatedWorklist = originalWorklist.filter(
      (task) => task.title.toLowerCase() !== title.toLowerCase()
    );

    // Check if a task was removed
    if (originalWorklist.length === updatedWorklist.length) {
      return NextResponse.json(
        { message: "No matching task found to delete" },
        { status: 404 }
      );
    }

    // Update the user's worklist and save
    user.works_list = updatedWorklist;
    await user.save();

    return NextResponse.json(
      { message: "Work deleted successfully" },
      { status: 200 }
    );

  } catch (err) {
    console.log("Error in fetching works", err);
    return NextResponse.json({ message: "Error in fetching works" });
  } finally {
    await disconnectDB();
  }
}


// export async function DELETE(req) {
//   try {
//     await connectDB();
//     const body = await req.json();
//     const searchParams = req.cookies.get("email");
//     console.log(searchParams.value);
//     const { title, description } = body;
//     console.log(title);
//     console.log(searchParams.value);
//     const user=await WorkModel.findOne({email: searchParams.value});
//     console.log(user)
//     const result = await WorkModel.updateOne(
//       { email:searchParams.value },
//       { $pull: { work_list: { title } } },
//       {new:true}
//     );

// console.log("the result is ",result);

//     if (result.modifiedCount === 0) {
//       return NextResponse.json(
//         { message: "No matching work found to delete" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       { message: "Work deleted successfully" },
//       { status: 200 }
//     );
//   } catch (err) {
//     console.log("Error in fetching works", err);
//     return NextResponse.json({ message: "Error in fetching works" });
//   } finally {
//     await disconnectDB();
//   }
// }

export async function PUT(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { title, updatedDescription } = body;
    console.log(title);

    const result = await WorkModel.findOneAndUpdate(
      { title: title },
      { $set: { description: updatedDescription } },
      {
        upsert: false,
        returnDocument: "after",
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
