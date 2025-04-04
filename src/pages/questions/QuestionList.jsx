import React, {useEffect, useState} from "react";
import { Questions } from "../../constants/Questions";
import Question from "../../components/Question";
import axiosInstance from "../../config/axios";
import Home from "../Home";
import {useQuestions} from "../../context/QuestionsContext";

function QuestionList() {

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

        ) : (
        <div className="w-full grid grid-cols-3 gap-4 mb-32">
              {questions?.map((question, index)=>(
                <Question key={index} question={question}/>
              ))}
        </div>
        )
    }
    </>
  );
}

export default QuestionList;
