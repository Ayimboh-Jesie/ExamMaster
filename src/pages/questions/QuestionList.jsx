import React, {useEffect, useState} from "react";
import { Questions } from "../../constants/Questions";
import Question from "../../components/Question";
import axiosInstance from "../../config/axios";

function QuestionList() {

  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getQuestions = async () =>{
    try{
        setIsLoading(true);
        const res =  await axiosInstance.get("/questions/");
        console.log("res question:", res.data.questions);
        console.log("response from api:", res);
        if(res){
            setIsLoading(false);
            setQuestions(res.data.questions);
        }
    }catch(err){
        console.log("something went wrong fetching questions", err);
    }finally{
        setIsLoading(false);
    }
  }

  useEffect(() =>{
    getQuestions();
  },[])
  return (
      <>
    { isLoading ? (<p className="flex justify-center items-center text-xl font-black">Loading...</p>) : (
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
