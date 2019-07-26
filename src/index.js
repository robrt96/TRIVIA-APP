import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import "./styles.css";

function App() {
  const [question, SetQuestion] = useState({ results: {}, question: "" });
  const [record, setRecord] = useState(0);

  async function APICall() {
    axios
      .get("https://opentdb.com/api.php?amount=1&type=boolean")
      .then(function(response) {
        SetQuestion(response.data.results[0]);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  const answerChoice = choice => {
    if (choice === question.correct_answer) {
      setRecord(record + 1);
      APICall();
    } else {
      APICall();
    }
  };

  useEffect(() => {
    APICall();
  }, []);

  return (
    <div>
      <h1 className="title">Trivia App</h1>
      <div className="counter">Right Answers: {record}</div>

      <QuestionCard data={question} />
      <div className="ansArea">
        <button className="btn" onClick={() => answerChoice("True")}>
          Yes
        </button>
        <button className="btn" onClick={() => answerChoice("False")}>
          No
        </button>
        <button className="btn" onClick={() => APICall()}>
          New Question
        </button>
      </div>
    </div>
  );
}

function QuestionCard(props) {
  return (
    <div className="card-container">
      <span className="tag">{props.data.category}</span>
      <h2 dangerouslySetInnerHTML={{ __html: props.data.question }} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
