import he from 'he';

export default function Question({ questionObj }) {
    const { correct_answer, incorrect_answers  } = questionObj;

    const question = he.decode(questionObj.question)
    const correctIndex = Math.floor(Math.random() * 4);
    const allAnswers = incorrect_answers.toSpliced(correctIndex, 0, correct_answer).map(answer => he.decode(answer));

    const allAnswersRadios = allAnswers.map(answer => (
        <label>
            {answer}
            <input type="radio" name={correct_answer} value={answer} />
        </label>
    ));

    return (
        <>
        <h3>{question}</h3>
        <div>{allAnswersRadios}</div>
        <hr />
        </>
    )

}