import React, {useEffect} from "react";
import Question from "../../components/Question";
import {useQuestions} from "../../context/QuestionsContext";
import {useAuth} from "../../context/AuthContext.jsx";
import QuestionDataList from "../dashboard/questions/QuestionDataList.jsx";

function QuestionList() {

  const {user} = useAuth();

  const userRole = user?.role

  const { questions, isLoading, error, getQuestions } = useQuestions();

  useEffect(() =>{
    getQuestions();
  },[]);

  return (
      <>
    { isLoading ? (
        <div className="w-full h-full flex flex-col gap-2 justify-center items-center">
            <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>
            <p> Loading...</p>
        </div>

        ) :
        (
            userRole === "admin" ? (<QuestionDataList/> ):(
                <div className="w-full grid grid-cols-3 gap-4 mb-32">
                  {questions?.map((question, index) => (
                      <Question key={index} question={question}/>
                  ))}
                </div>)

        )
    }
    </>
  );
}

export default QuestionList;
