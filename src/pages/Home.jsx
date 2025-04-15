import {useContext, useEffect, useState} from "react";
import {useAuth} from "../context/AuthContext";
import {ModalContext} from "../context/ModalContext.jsx";
import UserDashboard from "./dashboard/UserDashboard.jsx";
import AdminDashboard from "./dashboard/AdminDashboard.jsx";
import {useQuestions} from "../context/QuestionsContext.jsx";

const Home = () => {

    const { questions, isLoading, getQuestions } = useQuestions();

    const {openLoginModal} = useContext(ModalContext)

    const {user, isAuthenticated} =  useAuth();

    const isAdmin = user?.role === 'admin';

    const filteredQuestions = questions?.filter(
        (question) => question.askedBy?._id === user?._id
    );



    const totalQuestions = isAdmin ? questions?.length : filteredQuestions?.length;

    const totalAnswers = isAdmin
        ? questions?.reduce((total, question) => total + question.answers.length, 0) // Count all answers across all questions
        : questions?.reduce((count, question) => {
            // Count only answered questions for the current user
            const isAnswered = question.answers.some(
                (answer) => answer.answeredBy?._id === user?._id
            );
            return isAnswered ? count + 1 : count;
        }, 0);

    const answeredQuestionsCount = questions?.reduce((count, question) => {
        const isAnswered = question.answers.some(
            (answer) => answer.answeredBy?._id === user?._id
        );
        return isAnswered ? count + 1 : count;
    }, 0);

    const questionsCount = isAdmin ? totalQuestions : filteredQuestions.length;
    const answersCount = isAdmin ? totalAnswers : answeredQuestionsCount;


    useEffect(() =>{
        getQuestions();
    },[]);

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center h-[80vh] text-center">
                <h2 className="text-2xl font-semibold mb-4">You're not logged in</h2>
                <p className="text-gray-600 mb-6">Please log in to view your dashboard and track your questions.</p>
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                    onClick={() => {
                        openLoginModal();
                    }}
                >
                    Go to Login
                </button>
            </div>
        );
    }

    return (
        <>
            {user.role === "admin" && questions ?
                <AdminDashboard questionCount={totalQuestions} answerCount={totalAnswers}/> :
                <UserDashboard
                    filteredQuestions={filteredQuestions}
                    answeredQuestionsCount={answersCount}
                />
            }

        </>
    );
}

export default Home;