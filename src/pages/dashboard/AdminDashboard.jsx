import React, {useEffect, useState} from 'react';
import StatsCard from "../../components/StatsCard.jsx";
import {useQuestions} from "../../context/QuestionsContext.jsx";
import {useAuth} from "../../context/AuthContext.jsx";
import axiosInstance from "../../config/axios.js";
import QuestionDataList from "./questions/QuestionDataList.jsx";
import RecentUsers from "../../components/RecentUsers.jsx";
import ActionDropdown from "../../components/ActionDropdown.jsx";

function AdminDashboard({questionCount, answerCount}) {
    const {questions, isLoading} = useQuestions();
    const {user, isAuthenticated} = useAuth();

    const [allusers, setAllusers] = useState([]);
    console.log("user role:", user?.role);
    console.log("is authenticated:", isAuthenticated());
    const getAllUsers = async () => {
        try {
            if( user?.role === "admin") {
                const res = await axiosInstance.get("/users");
                setAllusers(res?.data);
                console.log("all users response", res);
            }
        }catch (error) {
            console.log("Error fetching all users",error);
        }
    }

    useEffect(() => {
        getAllUsers();
    }, [isAuthenticated(), user?.role]);
    return (
        <>
            <div className="p-2 my-3 mb-24">

                <div className="">
                    <p className="text-2xl font-semibold ">Welcome,   <span className="text-blue-700 capitalize ml-2">{user?.name}</span></p>
                </div>
                <div className="grid grid-cols-3 gap-3 mt-8 mb-20">

                    <StatsCard title="Users" value={allusers?.length} bg="bg-green-100" icon="pi pi-user text-2xl text-green-500" />
                    <StatsCard title="Questions Asked" value={questionCount} bg="bg-orange-100" icon="pi pi-question text-2xl text-orange-500" />
                    <StatsCard title="Answered Questions" value={answerCount} bg="bg-cyan-100" icon="pi pi-send text-2xl text-cyan-500" />

                </div>
                { isLoading ? (<p className="flex justify-center items-center text-xl font-black">Loading...</p>) : (

                    <div className={`w-full flex justify-between items-start gap-3 `}>
                        <div className="w-4/6">
                            <div className="overflow-x-auto rounded-lg shadow-lg p-3">
                                <table className="min-w-full bg-white">
                                    <thead className={`p-2 bg-gray-200 rounded-lg`}>
                                    <tr>
                                        <th className="p-2 text-left">Title</th>
                                        <th className="p-2 text-left">Asked By</th>
                                        <th className="p-2 text-left">createdAt</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {questions?.slice(0, 5).map((question)=> (
                                        <tr key={question._id} className="border-b hover:bg-gray-100">
                                            <td className="p-2">{question.title}</td>
                                            <td className="p-2">{question.askedBy?.name}</td>
                                            <td className="p-2">{new Date(question.createdAt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' })}</td>

                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="w-2/6">
                            <RecentUsers/>
                        </div>

                    </div>
                )
                }
            </div>
        </>
    );
}

export default AdminDashboard;