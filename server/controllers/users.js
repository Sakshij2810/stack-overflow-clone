import mongoose from "mongoose";
import User from "../models/auth.js";

export const fetchAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    const allUsersDetails = [];
    allUsers.forEach((user) => {
      allUsersDetails.push({
        _id: user._id,
        name: user.name,
        about: user.about,
        tags: user.tags,
        joinedOn: user.joinedOn,
      });
    });

    res.status(200).json(allUsersDetails);
  } catch (error) {
    res.status(404).json({ message: error, message });
  }
};

export const updateProfile = async (req, res) => {
  const { id: _id } = req.params;
  const { name, about, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Question Unavailable...");
  }

  try {
    const updatedProfile = await User.findByIdAndUpdate(
      _id,
      { $set: { name: name, about: about, tags: tags } },
      { new: true }
    );

    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(405).json({ message: error.message });
  }
};
