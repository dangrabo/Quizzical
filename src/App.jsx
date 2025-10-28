import { useState, useEffect } from "react";
import he from 'he';
import Question from "./Question";

function App() {
  const [showHome, setShowHome] = useState(true);
  const [questions, setQuestions] = useState(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [selected, setSelected] = useState([]);

  // fetch data
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        if (data.response_code == 0) setQuestions(data.results);
      });
  }, []);

  // generate question components in array
  let questionsCompArray;
  if (questions != null) {
    questionsCompArray = questions.map((question, index) => (
      <Question
        key={index}
        questionObj={question}
        id={index}
        showAnswers={showAnswers}
        selected={selected[index]}
      />
    ));
  }

  // check answers
  function checkAnswers(formData) {
    const selectedAnswers = [];
    for (let i = 0; i < 5; i++) {
      selectedAnswers.push(formData.get(`${i}`));
    }

    if (selectedAnswers.includes(null)) {
      alert('Please select an answer for each question');
      return
    } 

    getNumRight();
    setSelected(selectedAnswers);
    setShowAnswers(true);
  }

  function getNumRight() {
    let numRight = 0;
    
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
        {!showAnswers ? (
          <button className="check-again-btn">Check answers</button>
        ) : (
          <div id="play-again-div">
            <p>You scored 3/5 correct answers</p>
            <button type="button" className="check-again-btn">Play again</button>
          </div>
        )}
      </form>
    </div>
  );
}

export default App;


/* TODO:

home screen styling
Fix the styling on the bottom div after submitting answers
fix fucntionality for play again button
adjust functionality to check that all answers were selected before submitting form


  */
