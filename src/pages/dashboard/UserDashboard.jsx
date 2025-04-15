import React, {useContext, useEffect, useState} from 'react'
import StatsCard from "../../components/StatsCard.jsx";
import Question from "../../components/Question.jsx";
import {useAuth} from "../../context/AuthContext.jsx";
import {useQuestions} from "../../context/QuestionsContext.jsx";
import Modal from "../../components/Modal.jsx";
import AskQuestion from "../questions/AskQuestion.jsx";

function UserDashboard({filteredQuestions, answeredQuestionsCount}) {
  const {user} =  useAuth();
  const {questions, isLoading} = useQuestions();
  const [openAskQuestionModal, setOpenAskQuestionModal] = useState(false);

  console.log("filteredQuestions from user dashboard:", filteredQuestions);

  return (
    <>
      <div className="p-2 my-3 mb-24">

        <div className="">
          <p className="text-2xl font-semibold ">Welcome,   <span className="text-blue-700 capitalize ml-2">{user?.name}</span></p>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-8">

          <StatsCard title="Questions Asked" value={filteredQuestions?.length || 0} bg="bg-red-200" icon="pi pi-question text-2xl text-orange-500"/>
          <StatsCard title="Answered Questions" value={answeredQuestionsCount || 0} bg="bg-green-100" icon="pi pi-send text-2xl text-cyan-500"/>

        </div>
        { isLoading ? (<p className="flex justify-center items-center text-xl font-black">Loading...</p>) : (
            <div className="w-full mt-12 mb-32">
              {filteredQuestions?.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-center col-span-3">
                    <p className="text-lg mb-4">You haven't asked any questions yet.</p>
                    <button
                        onClick={() => {setOpenAskQuestionModal(true)}}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Ask a Question
                    </button>
                  </div>
              ) : (
                  <div className="grid grid-cols-3 gap-4">
                    {filteredQuestions.map((question, index) => (
                        <Question key={index} question={question} />
                    ))}
                  </div>
              )}
            </div>
        )
        }
      </div>

      <Modal
          open={openAskQuestionModal}
          onClose={() => setOpenAskQuestionModal(false)}
      >
        <AskQuestion onClose={() => setOpenAskQuestionModal(false)} />
      </Modal>
    </>
  )
}

export default UserDashboard