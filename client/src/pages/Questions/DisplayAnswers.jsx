import React from "react";
import { Link, useParams } from "react-router-dom";
import Avatar from "../../components/Avatar/Avatar";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { deleteAnswer } from "../../actions/questionAction";

const DisplayAnswers = ({ question, handleShare }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const User = useSelector((state) => state.currentUserReducer);

  const handleDelete = (answerLength, answerId) => {
    dispatch(
      deleteAnswer({
        id,
        answerId,
        noOfAnswers: answerLength - 1,
      })
    );
  };
  return (
    <div>
      {question.answer.map((ans) => (
        <div className="display-ans" key={ans._id}>
          <p>{ans.answerBody}</p>
          <div className="question-actions-user">
            <div>
              <button type="button" onClick={handleShare}>
                Share
              </button>

              {User?.result?._id === ans?.userId && (
                <button
                  onClick={(e) => {
                    handleDelete(question.noOfAnswers, ans._id);
                  }}
                  type="button"
                >
                  Delete
                </button>
              )}
            </div>
            <div>
              <p>answered {moment(question.postedOn).fromNow()}</p>
              <Link
                to={`/Users/${ans.userId}`}
                className="user-link"
                style={{ color: "#0086d8" }}
              >
                <Avatar
                  backgroundColor="lightgreen"
                  py="10px"
                  px="8px"
                  borderRadius="4px"
                >
                  {ans.userAnswered.charAt(0).toUpperCase()}
                </Avatar>
                <div>{ans.userAnswered}</div>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayAnswers;
