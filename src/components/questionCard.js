import React from "react";

function QuestionCard(props) {
  return (
    <div className="card-container">
      <span className="tag">{props.data.category}</span>
      <h2 dangerouslySetInnerHTML={{ __html: props.data.question }} />
    </div>
  );
}

export default QuestionCard;
