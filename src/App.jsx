import { useState, useEffect } from "react";
import Question from "./Question";

function App() {
  const [showHome, setShowHome] = useState(true);
  const [questions, setQuestions] = useState(null);

  // fetch data
  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&type=multiple')
      .then(res => res.json())
      .then(data => {
        if (data.response_code == 0) setQuestions(data.results);
      })
  }, []);

  // generate question components in array
  let questionsCompArray;
  if (questions != null) {
    questionsCompArray = questions.map(question => (<Question key={question.correct_answer} questionObj={question} />))
  }

  // check answers
  function checkAnswers(answers) {
    console.log(answers);
  }

  // show home screen
  if (showHome) {
    return (
      <div id="home-div" className="main-container">
        <h1>Quizzical</h1>
        <button id="home-button" onClick={() => setShowHome(false)}>
          Start quiz
        </button>
      </div>
    );
  }

  // show questions
  return (
    <div id="questions-div" className="main-container">
      <form action={checkAnswers}>
        {questionsCompArray}
        <button>Check answers</button>
      </form>
    </div>
  )
}

export default App;
