import {useState} from 'react';
import ActionDropdown from "../../../components/ActionDropdown.jsx";
import {useQuestions} from "../../../context/QuestionsContext.jsx";
import axiosInstance from "../../../config/axios.js";
import {useAuth} from "../../../context/AuthContext.jsx";
import * as toast from "react-toastify";
import Modal from "../../../components/Modal.jsx";
import AskQuestion from "../../questions/AskQuestion.jsx";

function QuestionDataList() {
    const {questions, getQuestions} = useQuestions();
    const [currentPage, setCurrentPage] = useState(questions);
    const [openCreateQuestionModal, setOpenCreateQuestionModal] = useState(false);
    const itemsPerPage = 5;
    const {token} = useAuth();

    const handleDelete = async (questionId) => {
        try {
            const res = await axiosInstance.delete(`/questions/${questionId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });


            if (res.ok) {
                getQuestions();
                console.log("Question deleted successfully:", res.data);
                toast.success("Question deleted successfully");
            } else {
                console.error("Delete failed:", res.error);
                toast.error("Could not delete question data.");
            }
        } catch (err) {
            console.error("Error deleting question:", err.message);
        }

    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = questions.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(questions.length / itemsPerPage);

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <div className={`flex justify-end mt-12`}>
                <button onClick={() => setOpenCreateQuestionModal(true)} className={`bg-blue-100 text-blue-500 p-2 rounded-lg hover:bg-blue-500 hover:text-white hover:shadow-md capitalize`}><i className={`pi pi-file-plus`} ></i> Add question</button>
            </div>
        <div className="overflow-x-auto rounded-lg shadow-lg p-3 mt-12">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                <tr>
                    <th className="p-2 text-left">Title</th>
                    <th className="p-2 text-left">Course</th>
                    <th className="p-2 text-left">Exam Type</th>
                    <th className="p-2 text-left">Field of Study</th>
                    <th className="p-2 text-left">Actions</th>
                </tr>
                </thead>
                <tbody>
                {currentItems.map((row) => (
                    <tr key={row._id} className="border-b hover:bg-gray-100">
                        <td className="p-2">{row.title}</td>
                        <td className="p-2">{row.course}</td>
                        <td className="p-2">{row.exam_type}</td>
                        <td className="p-2">{row.study_field}</td>
                        <td className="p-2">
                            <ActionDropdown
                                row={row}
                                onDelete={handleDelete}
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="flex justify-center mt-4 space-x-2">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => goToPage(i + 1)}
                        className={`px-3 py-1 rounded ${
                            currentPage === i + 1
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
            <Modal
                open={openCreateQuestionModal}
                onClose={()=> setOpenCreateQuestionModal(false)}
            >
                <AskQuestion onClose={()=> setOpenCreateQuestionModal(false)} />
            </Modal>
        </>
    );
}

export default QuestionDataList;