import mongoose from "mongoose";

const QuestionSchema = mongoose.Schema({
  questionTitle: { type: String, required: "Question must have a title" },
  questionBody: { type: String, required: "Question must have a body" },
  questionTags: { type: [String], required: "Question must have a tags" },
  upVotes: { type: [String], default: [] },
  downVotes: { type: [String], default: [] },
  noOfAnswers: { type: Number, default: 0 },
  userPosted: { type: String, required: "Question must have an author" },
  userId: { type: String },
  postedOn: { type: Date, default: Date.now },
  answer: [
    {
      answerBody: { type: String },
      userAnswered: { type: String },
      userId: { type: String },
      answeredOn: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.model("Question", QuestionSchema);
