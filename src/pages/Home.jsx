import React, {useEffect} from "react";
import {useAuth} from "../context/AuthContext";
import {useQuestions} from "../context/QuestionsContext";
import Question from "../components/Question";

const Home = () => {

    const {user} =  useAuth();

    console.log("user in home:", user?.name)

    const { questions, isLoading, error, getQuestions } = useQuestions();

    console.log("questions from context:", questions);

      useEffect(() =>{
        getQuestions();
      },[]);

    return (
        <>
            <div className="p-2 my-3 mb-24">

                <div className="">
                    <p className="text-2xl font-semibold ">Welcome back,  <span className="text-blue-700 capitalize">{user?.name}</span></p>
                </div>
                 <div className="grid grid-cols-3 gap-3 mt-8">
                     <div className="flex justify-between items-center border border-gray-300 rounded-lg p-5 w-94">
                         <p className="text-lg font-medium mb-8">Question asked</p>
                         <p className="w-12 h-12 bg-green-100 rounded-lg p-3 text-lg">12</p>
                     </div>
                     <div className="flex justify-between items-center border border-gray-300 rounded-lg p-5 w-94">
                         <p className="text-lg font-medium mb-8">Answered Question </p>
                         <p className="w-12 h-12 bg-green-100 rounded-lg p-3 text-lg">2</p>
                     </div>
                     <div className="flex justify-between items-center border border-gray-300 rounded-lg p-5 w-94">
                         <p className="text-lg font-medium mb-8">Reputation</p>
                         <p className="w-12 h-12 bg-green-100 rounded-lg p-3 text-lg">3</p>
                     </div>

                 </div>
                     { isLoading ? (<p className="flex justify-center items-center text-xl font-black">Loading...</p>) : (
                         <div className="w-full grid grid-cols-3 gap-4 mb-32 mt-12">
                               {questions?.map((question, index)=>(
                                 <Question key={index} question={question}/>
                               ))}
                         </div>
                         )
                     }
            </div>

        </>
    );
}

export default Home;