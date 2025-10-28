import he from "he";

export default function Question({ questionObj, id, showAnswers, selected }) {
  const { correct_answer, incorrect_answers } = questionObj;

  const question = he.decode(questionObj.question);
  const correctAnswer = he.decode(correct_answer);
  const correctIndex = Math.floor(Math.random() * 4);
  const allAnswers = incorrect_answers
    .toSpliced(correctIndex, 0, correct_answer)
    .map((answer) => he.decode(answer));

  const allAnswersRadios = allAnswers.map((answer, index) => {
    let answerClass = 
        answer === correctAnswer ? 'correct' :
        selected === answer ? 'incorrect' :
        'opaque';
    
    return (
      <div key={index}>
        <input type="radio" id={`${id}${index}`} name={id} value={answer} />
        <label className={showAnswers ? answerClass : ''} htmlFor={`${id}${index}`}>
          {answer}
        </label>
      </div>
    );
  });

  return (
    <>
      <h3>{question}</h3>
      <div className="answers">{allAnswersRadios}</div>
      <hr />
    </>
  );
}
