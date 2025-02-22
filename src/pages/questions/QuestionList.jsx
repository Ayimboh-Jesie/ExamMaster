import React from "react";
import { Questions } from "../../constants/Questions";
import Question from "../../components/Question";

function QuestionList() {
  return (
    <div className="w-full grid grid-cols-3 gap-4">
      {Questions.map((question)=>(
        <Question question={question}/>
      ))}
    </div>
  );
}

export default QuestionList;
