import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
   title:String,
   description:String
})

export default mongoose.models.Work || mongoose.model("Work", UserSchema);
