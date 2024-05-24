import "./Questions.css";
import React, { useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import moment from "moment";
import copy from "copy-to-clipboard";

import upvote from "../../assets/sort-up.svg";
import downvote from "../../assets/sort-down.svg";
import Avatar from "../../components/Avatar/Avatar";
import DisplayAnswers from "./DisplayAnswers";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteQuestion,
  postAnswer,
  voteQuestion,
} from "../../actions/questionAction";

const QuestionsDetails = () => {
  const { id } = useParams();

  const questionsList = useSelector((state) => state.questionReducer);

  // var questionsList = [
  //   {
  //     _id: "1",
  //     upVotes: 3,
  //     downVotes: 2,
  //     noOfAnswers: 2,
  //     questionTitle: "why javascript is popular",
  //     questionBody: "It meant to be",
  //     questionTags: ["javascript", "c", "c++", "express"],
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

  const [answer, setAnswer] = useState("");
  const User = useSelector((state) => state.currentUserReducer);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const url = "http://localhost:3000";

  const handlePostAns = (e, answerLength) => {
    e.preventDefault();
    if (User === null) {
      alert("Login or Signup to answer a question");
      navigate("/Auth");
    } else {
      if (answer === "") {
        alert("Enter an answer before submitting");
      } else {
        dispatch(
          postAnswer({
            id,
            noOfAnswers: answerLength + 1,
            answerBody: answer,
            userAnswered: User.result.name,
            userId: User.result._id,
          })
        );
        setAnswer("");
      }
    }
  };

  const handleShare = () => {
    copy(url + location.pathname);
    alert("copied url : " + url + location.pathname);
  };

  const handleDelete = () => {
    dispatch(deleteQuestion(id, navigate));
  };

  const handleUpVote = () => {
    if (User === null) {
      alert("Login or Signup to continue");
      navigate("/Auth");
    } else {
      dispatch(voteQuestion(id, "upVote", User.result._id));
    }
  };

  const handleDownVote = () => {
    if (User === null) {
      alert("Login or Signup to continue");
      navigate("/Auth");
    } else {
      dispatch(voteQuestion(id, "downVote", User.result._id));
    }
  };
  return (
    <div className="question-details-page">
      {questionsList.data === null ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {questionsList.data
            .filter((question) => question._id === id)
            .map((question) => (
              <div key={question._id}>
                <section className="question-details-container">
                  <h1>{question.questionTitle}</h1>
                  <div className="question-details-container-2">
                    <div className="question-votes">
                      <img
                        onClick={handleUpVote}
                        src={upvote}
                        alt="upvote"
                        width="18"
                        className="votes-icon"
                      />
                      <p>
                        {question.upVotes.length - question.downVotes.length}
                      </p>
                      <img
                        onClick={handleDownVote}
                        src={downvote}
                        alt="downvote"
                        width="18"
                        className="votes-icon"
                      />
                    </div>
                    <div style={{ width: "100%" }}>
                      <p className="question-body">{question.questionBody}</p>
                      <div className="question-details-tags">
                        {question.questionTags.map((tag) => (
                          <p key={tag}>{tag}</p>
                        ))}
                      </div>
                      <div className="question-actions-user">
                        <div>
                          <button type="button" onClick={handleShare}>
                            Share
                          </button>

                          {User?.result?._id === question?.userId && (
                            <button type="button" onClick={handleDelete}>
                              Delete
                            </button>
                          )}
                        </div>
                        <div>
                          <p>asked {moment(question.postedOn).fromNow()}</p>
                          <Link
                            to={`/Users/${question.userId}`}
                            className="user-link"
                            style={{ color: "#0086d8" }}
                          >
                            <Avatar
                              backgroundColor="orange"
                              py="10px"
                              px="8px"
                              borderRadius="4px"
                            >
                              {question.userPosted.charAt(0).toUpperCase()}
                            </Avatar>
                            <div>{question.userPosted}</div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {question.noOfAnswers !== 0 && (
                  <section>
                    <h4>{question.noOfAnswers} answers</h4>
                    <DisplayAnswers
                      key={question._id}
                      question={question}
                      handleShare={handleShare}
                    />
                  </section>
                )}
                <section className="post-ans-container">
                  <h3>Your Answer</h3>
                  <form
                    onSubmit={(e) => {
                      handlePostAns(e, question.answer.length);
                    }}
                  >
                    <textarea
                      onChange={(e) => setAnswer(e.target.value)}
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      value={answer}
                    ></textarea>
                    <br />
                    <input
                      type="submit"
                      className="post-ans-btn"
                      value="Post Your Answer"
                    />
                  </form>
                  <p>
                    Browse other Question tagged{" "}
                    {question.questionTags.map((tag) => (
                      <Link to="/Tags" key={tag} className="ans-tags">
                        {" "}
                        {tag}{" "}
                      </Link>
                    ))}{" "}
                    or
                    <Link
                      to="/AskQuestion"
                      style={{ textDecoration: "none", color: "#009dff" }}
                    >
                      {" "}
                      ask your own question
                    </Link>
                  </p>
                </section>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default QuestionsDetails;
