import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username:String,
  email: String,
  password: String,
  works_list: [
    {
      title: String,
      description: String,
      date: Date,
    },
  ]
});

export default mongoose.models.Work || mongoose.model("Work", UserSchema);
