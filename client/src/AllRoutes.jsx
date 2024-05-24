import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Auth from "./pages/Auth/Auth.jsx";
import Questions from "./pages/Questions/Questions.jsx";
import AskQuestion from "./pages/AskQuestion/AskQuestion.jsx";
import DisplayQuestion from "./pages/Questions/DisplayQuestion.jsx";
import Tags from "./pages/Tags/Tags.jsx";
import Users from "./pages/Users/Users.jsx";
import UserProfile from "./pages/UserProfile/UserProfile.jsx";

const AllRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" Component={Home} />
      <Route exact path="/Auth" Component={Auth} />
      <Route exact path="/Questions" Component={Questions} />
      <Route exact path="/AskQuestion" Component={AskQuestion} />
      <Route exact path="/Questions/:id" Component={DisplayQuestion} />
      <Route exact path="/Tags" Component={Tags} />
      <Route exact path="/Users" Component={Users} />
      <Route exact path="/Users/:id" Component={UserProfile} />
    </Routes>
  );
};

export default AllRoutes;
