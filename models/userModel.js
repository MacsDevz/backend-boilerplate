import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const user = mongoose.model("user", schema);

export default user;
