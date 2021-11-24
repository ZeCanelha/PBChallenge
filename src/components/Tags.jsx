import React from "react";

const Tags = (props) => {
  const { tags, mapper } = props;
  return (
    <div className="tags-container">
      <div className="tag-content">
        <span className="border-text not-selectable">Person</span>
        {mapper(tags.Person)}
      </div>
      <div className="tag-content">
        <h3 className="border-text not-selectable">Place</h3>
        {mapper(tags.Place)}
      </div>
      <div className="tag-content">
        <span className="border-text not-selectable">Organization</span>
        {mapper(tags.Organization)}
      </div>
      <div className="tag-content not-selectable">
        <span className="border-text">Event</span>
        {mapper(tags.Event)}
      </div>
    </div>
  );
};

export default Tags;
