import React from "react"
import StatsCard from "../../components/StatsCard.jsx";
import Question from "../../components/Question.jsx";
import {useQuestions} from "../../context/QuestionsContext.jsx";

const Home = ({isLoading}) =>{

    const {questions} = useQuestions();
    return(
        <>
            <div className="p-2 my-3 mb-24">

                <div className="">
                    <p className="text-2xl font-semibold ">Welcome,   <span className="text-blue-700 capitalize ml-2">{user?.name}</span></p>
                </div>
                <div className="grid grid-cols-3 gap-3 mt-8">

                    <StatsCard title="Users" value="12" bg="bg-green-100" />
                    <StatsCard title="Questions Asked" value={0} bg="bg-red-200" />
                    <StatsCard title="Answered Questions" value={0} bg="bg-green-100" />

                </div>
                { isLoading ? (<p className="flex justify-center items-center text-xl font-black">Loading...</p>) : (
                    <div className="w-full grid grid-cols-3 gap-4 mb-32 mt-12">
                        {questions?.map((question, index) => (
                            <Question key={index} question={question} />
                        ))}
                    </div>
                )
                }
            </div>
        </>
    );
}

export default Home