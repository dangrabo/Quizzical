import he from "he";

export default function Question({ questionObj, id, showAnswers, selected }) {
  const { correctAnswer, allAnswers } = questionObj;
  const question = he.decode(questionObj.question);
  
  const allAnswersRadios = allAnswers.map((answer, index) => {
    let answerClass = 
        answer === correctAnswer ? 'correct' :
        selected === answer ? 'incorrect' :
        'opaque';
    
    return (
      <div key={index}>
        <input type="radio" id={`${id}${index}`} name={id} value={answer} />
        <label className={showAnswers ? answerClass : 'while-selecting'} htmlFor={`${id}${index}`}>
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
