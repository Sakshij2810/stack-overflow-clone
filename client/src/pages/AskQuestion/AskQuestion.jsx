import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AskQuestion.css";
import { useNavigate } from "react-router-dom";
import { askQuestion } from "../../actions/questionAction";

const AskQuestion = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const User = useSelector((state) => state.currentUserReducer);

  const [questionTitle, setQuestionTitle] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [questionTags, setQuestionTags] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log({ questionBody, questionTags, questionTitle });

    if (User === null) {
      alert("Login or Signup to continue");
      navigate("/Auth");
    } else {
      dispatch(
        askQuestion(
          {
            questionTitle,
            questionBody,
            questionTags,
            userPosted: User.result.name,
            userId: User.result._id,
          },
          navigate
        )
      );
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setQuestionBody(questionBody + "\n");
    }
  };

  return (
    <div className="ask-question">
      <div className="ask-ques-container">
        <h1>Ask a public Question</h1>
        <form onSubmit={handleSubmit}>
          <div className="ask-form-container">
            <label htmlFor="ask-ques-title">
              <h4>Title</h4>
              <p>
                Be specific and imagine you’re asking a question to another
                person
              </p>
              <input
                onChange={(e) => {
                  setQuestionTitle(e.target.value);
                }}
                type="text"
                id="ask-ques-title"
                placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
              />
            </label>
            <label htmlFor="ask-ques-body">
              <h4>Body</h4>
              <p>
                Include all the information someone would need to answer your
                question
              </p>
              <textarea
                onKeyPress={handleEnter}
                onChange={(e) => {
                  setQuestionBody(e.target.value);
                }}
                id="ask-ques-body"
                cols="30"
                rows="10"
              ></textarea>
            </label>
            <label htmlFor="ask-ques-tags">
              <h4>Tags</h4>
              <p>Add up to 5 tags to describe what your question is about</p>
              <input
                onChange={(e) => {
                  setQuestionTags(e.target.value.split(" "));
                }}
                type="text"
                id="ask-ques-tags"
                placeholder="e.g. (xml typescript wordpress)"
              />
            </label>
          </div>
          <input
            type="submit"
            value="Reivew your question"
            className="review-btn"
          />
        </form>
      </div>
    </div>
  );
};

export default AskQuestion;
