import { useState, useEffect } from "react";
import he from "he";
import Question from "./Question";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showHome, setShowHome] = useState(true);
  const [questions, setQuestions] = useState(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [selected, setSelected] = useState([]);
  const [playCount, setPlayCount] = useState(0);
  const [numRight, setNumRight] = useState();

  // fetch data
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        if (data.response_code == 0) {
          const formattedQuestions = data.results.map(apiQuestion => formatQuestion(apiQuestion));
          console.log(formattedQuestions);
          setQuestions(formattedQuestions);
        }
        else {
          console.log('Error loading data');
          setError(true);
        }
        setLoading(false);
      });
  }, [playCount, error]);

  // generate question components in array
  let questionsCompArray;
  if (questions != null) {
    questionsCompArray = questions.map((question, index) => {

      return (
        <Question
          key={index}
          questionObj={question}
          id={index}
          showAnswers={showAnswers}
          selected={selected[index]}
        />
      );
    });
  }

  function formatQuestion(apiQuestion) {
    let { correct_answer, incorrect_answers, question } = apiQuestion;
    const correctAnswer = he.decode(correct_answer);
    const correctIndex = Math.floor(Math.random() * 4);
    const allAnswers = incorrect_answers
      .toSpliced(correctIndex, 0, correctAnswer)
      .map((answer) => he.decode(answer));
    question = he.decode(question);

    return {
      question,
      allAnswers,
      correctAnswer,
    };
  }

  // check answers
  function checkAnswers(e) {
    e.preventDefault();
    const formData = new FormData(e.target)

    const selectedAnswers = [];
    for (let i = 0; i < 5; i++) {
      selectedAnswers.push(formData.get(`${i}`));
    }

    if (selectedAnswers.includes(null)) {
      alert("Please select an answer for each question");
      return;
    }

    setNumRight(getNumRight(questions, selectedAnswers));
    setSelected(selectedAnswers);
    setShowAnswers(true);
  }

  function getNumRight(questions, selectedAnswers) {
    let numRight = 0;
    for (let i = 0; i < 5; i++) {
      if (selectedAnswers[i] === questions[i].correctAnswer) numRight++;
    }
    return numRight;
  }

  function handleRestart() {
    setLoading(true);
    setError(false);
    setShowAnswers(false);
    setPlayCount((prev) => prev + 1);
  }

  // show loading screen
  if (loading) {
    return (
      <div id="home-div" className="main-container">
        <h1>Loading...</h1>
      </div>
    );
  }

  // show error screen
  if (error) {
    return (
      <div id="home-div" className="main-container">
        <h2>There was an error loading the quiz</h2>
        <p>Please wait 5-10 seconds before trying again</p>
        <button
          id="home-btn"
          className="check-again-btn"
          onClick={handleRestart}
        >
          Try Again
        </button>
      </div>
    );
  }

  // show home screen
  if (showHome) {
    return (
      <div id="home-div" className="main-container">
        <h1>Quizzical</h1>
        <button
          id="home-btn"
          className="check-again-btn"
          onClick={() => setShowHome(false)}
        >
          Start quiz
        </button>
      </div>
    );
  }

  // show questions
  return (
    <div id="questions-div" className="main-container">
      <form onSubmit={checkAnswers}>
        {questionsCompArray}
        {!showAnswers ? (
          <button  className="check-again-btn m-auto">Check answers</button>
        ) : (
          <div id="play-again-div">
            <p>You scored {numRight}/5 correct answers</p>
            <button
              onClick={handleRestart}
              type="button"
              className="check-again-btn"
            >
              Play again
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default App;