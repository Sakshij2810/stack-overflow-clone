import users from "../models/auth.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//signup controller
export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return res.status(404).json({ message: "User already Exist." }); // Add return statement here
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await users.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    return res.status(200).json({ result: newUser, token }); // Add return statement here
  } catch (error) {
    res.status(500).json("Something went wrong...");
  }
};

//login controller
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await users.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User don't Exist." }); // Add return statement here
    }

    const isPasswordCrt = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCrt) {
      return res.status(400).json({ message: "Invalid Credentials" }); // Add return statement here
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({ result: existingUser, token }); // Add return statement here
  } catch (error) {
    res.status(500).json("Something went wrong...");
  }
};
