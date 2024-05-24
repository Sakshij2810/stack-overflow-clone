import React from "react";
import "./HomeMainbar.css";
import { useLocation, useNavigate } from "react-router-dom";
import QuestionList from "./QuestionList";
import { useSelector } from "react-redux";

const HomeMainbar = () => {
  const navigate = useNavigate();
  const user = 1;

  const questionsList = useSelector((state) => state.questionReducer);

  // var questionsList = [
  //   {
  //     _id: "1",
  //     upVotes: 3,
  //     downVotes: 2,
  //     noOfAnswers: 2,
  //     questionTitle: "why javascript is popular",
  //     questionBody: "It meant to be",
  //     questionTags: ["javascript"],
  //     userPosted: "sakshi",
  //     userId: 1,
  //     askedOn: "feb 3",
  //     answer: [
  //       {
  //         answerBody: "Answer from sayali",
  //         userAnswered: "sayali",
  //         userId: 3,
  //       },
  //     ],
  //   },
  //   {
  //     _id: "2",
  //     upVotes: 3,
  //     downVotes: 1,
  //     noOfAnswers: 1,
  //     questionTitle: "why React is popular",
  //     questionBody: "It meant to be",
  //     questionTags: ["javascript", "c", "express", "html"],
  //     userPosted: "vaishnavi",
  //     userId: 2,
  //     askedOn: "jan 15",
  //     answer: [
  //       {
  //         answerBody: "Answer",
  //         userAnswered: "sakshi",
  //         userId: 1,
  //       },
  //     ],
  //   },
  //   {
  //     _id: "3",
  //     upVotes: 6,
  //     downVotes: 2,
  //     noOfAnswers: 10,
  //     questionTitle: "what is a function?",
  //     questionBody: "It meant to be",
  //     questionTags: ["javascript", "R", "python"],
  //     userPosted: "sayali",
  //     userId: 3,
  //     askedOn: "jan 1",
  //     answer: [
  //       {
  //         answerBody: "Answer",
  //         userAnswered: "vaishnavi",
  //         userId: 2,
  //       },
  //     ],
  //   },
  // ];

  const location = useLocation();

  const checkAuth = () => {
    if (user === null) {
      alert("login or signup to ask a question");
      navigate("/Auth");
    } else {
      navigate("/AskQuestion");
    }
  };
  return (
    <div className="main-bar">
      <div className="main-bar-header">
        {location.pathname === "/" ? (
          <h1>Top Questions</h1>
        ) : (
          <h1>All Questions</h1>
        )}
        <button onClick={checkAuth} className="ask-btn">
          Ask Question
        </button>
      </div>
      <div>
        {questionsList.data === null ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <p>{questionsList.data.length} questions</p>
            <QuestionList questionsList={questionsList.data} />
          </>
        )}
      </div>
    </div>
  );
};

export default HomeMainbar;
