import React from "react";

const Tags = (props) => {
  const { tags, mapper } = props;
  return (
    <div className="tags-container">
      <div className="tag-content">
        <h3 className="border-text not-selectable">Person tags:</h3>
        {mapper(tags.Person)}
      </div>
      <div className="tag-content">
        <h3 className="border-text not-selectable">Place tags:</h3>
        {mapper(tags.Place)}
      </div>
      <div className="tag-content">
        <h3 className="border-text not-selectable">Organization tags:</h3>
        {mapper(tags.Organization)}
      </div>
      <div className="tag-content not-selectable">
        <h3 className="border-text">Event tags:</h3>
        {mapper(tags.Event)}
      </div>
    </div>
  );
};

export default Tags;
