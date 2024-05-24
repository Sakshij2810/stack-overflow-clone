import mongoose from "mongoose";
import Questions from "../models/Questions.js";

// post answer
export const postAnswer = async (req, res) => {
  const { id: _id } = req.params;
  const { noOfAnswers, answerBody, userAnswered, userId } = req.body;

  // console.log({ noOfAnswers, answerBody, userAnswered });

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("question unavailable...");
  }

  updateNoOfQuestions(_id, noOfAnswers);

  try {
    const updatedQuestion = await Questions.findByIdAndUpdate(_id, {
      $addToSet: {
        answer: [{ answerBody, userAnswered, userId }],
      },
    });

    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(404).json("Error in updating");
  }
};

//sakshi
// delete answer
export const deleteAnswer = async (req, res) => {
  const { id: _id } = req.params;
  const { answerId, noOfAnswers } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(404).json("question unavailable");
  }
  if (!mongoose.Types.ObjectId.isValid(answerId)) {
    res.status(404).json("answer unavailable");
  }

  updateNoOfQuestions(_id, noOfAnswers);

  try {
    const updatedQuestion = await Questions.updateOne(
      { _id },
      {
        $pull: { answer: { _id: answerId } },
      }
    );

    res.status(200).json("Successfully deleted...");
  } catch (error) {
    res.status(405).json(error);
  }
};

// update no of answers
const updateNoOfQuestions = async (_id, noOfAnswers) => {
  try {
    await Questions.findByIdAndUpdate(_id, {
      $set: { noOfAnswers: noOfAnswers },
    });
  } catch (error) {
    console.log(error);
  }
};
