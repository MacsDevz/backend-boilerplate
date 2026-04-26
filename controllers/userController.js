import bcrypt from "bcrypt";
import user from "../models/userModel.js";

const register = async (req, res) => {
  const { name, username, password } = req.body;

  const hashedpassword = await bcrypt.hash(password, 10);
  const newRecord = await user.create({
    name,
    username,
    password: hashedpassword,
  });

  res.json({ message: "Successfully Registered" });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  //find the username in db
  const Users = await user.findOne({ username: username });

  if (!Users) {
    res.json({ error: "Invalid Credentials" });
  }

  //check password

  const isMatch = await bcrypt.compare(password, Users.password);
  if (!isMatch) {
    res.json({ error: "Invalid Credentials" });
    return;
  }
  //save to session
  req.session.userId = Users._id;

  res.json({ message: "Successfully Login" });
};

const logout = async (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res.json({ error: error.message });
    }

    res.clearCookie("connect.sid");
    res.json({ message: "Logout Successfully!" });
  });
};
export { register, login, logout };
