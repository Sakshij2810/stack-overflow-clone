import React from "react";
import Leftsidebar from "../../components/Leftsidebar/Leftsidebar";
import Rightsidebar from "../../components/Rightsidebar/Rightsidebar";
import QuestionsDetails from "./QuestionsDetails";
const DisplayQuestion = () => {
  return (
    <div className="home-container-1">
      <Leftsidebar />
      <div className="home-container-2">
        <QuestionsDetails />

        <Rightsidebar />
      </div>
    </div>
  );
};

export default DisplayQuestion;
