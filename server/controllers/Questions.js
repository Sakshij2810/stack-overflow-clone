import Questions from "../models/Questions.js";
import mongoose from "mongoose";

//ask question
export const AskQuestion = async (req, res) => {
  const postQuestionData = req.body;

  const postQuestion = new Questions({ ...postQuestionData });

  try {
    await postQuestion.save();
    res.status(200).json("Posted a question successfully");
  } catch (error) {
    console.log(error);
    res.status(409).json("Couldn't post a new question");
  }
};

// get all questions
export const getAllQuestions = async (req, res) => {
  try {
    const questionsList = await Questions.find();
    res.status(200).json(questionsList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//delete question
export const deleteQuestion = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(404).send("Question unavailable...");
  }
  try {
    await Questions.findByIdAndDelete(_id);
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

//vote question
export const voteQuestion = async (req, res) => {
  const { id: _id } = req.params;

  const { value, userId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(404).json("Question unavailable...");
  }

  try {
    const question = await Questions.findById(_id);
    const upIndex = question.upVotes.findIndex((id) => id === String(userId));
    const downIndex = question.downVotes.findIndex(
      (id) => id === String(userId)
    );

    if (value === "upVote") {
      if (downIndex !== -1) {
        question.downVotes = question.downVotes.filter(
          (id) => id !== String(userId)
        );
      }

      if (upIndex === -1) {
        question.upVotes.push(userId);
      } else {
        question.upVotes = question.upVotes.filter(
          (id) => id !== String(userId)
        );
      }
    } else if (value === "downVote") {
      if (upIndex !== -1) {
        question.upVotes = question.upVotes.filter(
          (id) => id !== String(userId)
        );
      }

      if (downIndex === -1) {
        question.downVotes.push(userId);
      } else {
        question.downVotes = question.downVotes.filter(
          (id) => id !== String(userId)
        );
      }
    }

    await Questions.findByIdAndUpdate(_id, question);
    res.status(200).json({ message: "Voted successfully..." });

    // //clicked upVote button
    // if(value === "upVote"){
    //   // 1) Is user already downVoted? then delete user from downVote array
    //   if(downIndex !== -1){  // === -1 means downVote array is empty
    //     question.downVote.filter((id) => id !== userId)
    //   }

    //   // 2) User never vote
    //   if(upIndex === -1){
    //     question.upVote.push(userId)
    //   }else{  // 3) User already upVote but wants to be neutral
    //     question.upVote.filter((id) => id !== userId);
    //   }
    // }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "id not found" + error });
  }
};
