import "./Tags.css";
import React from "react";
import Leftsidebar from "../../components/Leftsidebar/Leftsidebar";
import { tagsList } from "./TagList";
import TagsList from "./TagsList";

const Tags = () => {
  return (
    <div className="home-container-1">
      <Leftsidebar />
      <div className="home-container-2">
        <h1 className="tags-h1">Tags</h1>
        <p className="tags-p">
          A tag is a keyword or label that categorizes your question with other,
          similar questions.
        </p>
        <p className="tags-p">
          Using the right tags makes it easier for others to find and answer
          your question.
        </p>
        <div className="tags-list-container">
          {tagsList.map((tag, index) => (
            <TagsList tag={tag} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tags;
