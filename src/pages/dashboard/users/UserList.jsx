import React, {useEffect, useState} from 'react';
import axiosInstance from "../../../config/axios.js";
import ActionDropdown from "../../../components/ActionDropdown.jsx";
import Modal from "../../../components/Modal.jsx";
import CreateUser from "./CreateUser.jsx";
import {useAuth} from "../../../context/AuthContext.jsx";
import {ViewUser} from "./ViewUser.jsx";
import SignUp from "../../SignUp.jsx";

function UserList() {
    const {isAuthenticated, user} = useAuth();
    const [openAddUserModal, setOpenAddUserModal] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(allUsers);
    const itemsPerPage = 5;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = allUsers.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(allUsers.length / itemsPerPage);

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const getAllUsers = async () => {
        try {
            if( user?.role === "admin") {
                const res = await axiosInstance.get("/users");
                setAllUsers(res?.data);
                console.log("all users response", res);
            }
        }catch (error) {
            console.log("Error fetching all users",error);
        }
    }

    const handleDelete = () =>{
        console.log("handleDelete");
    }

    useEffect(() => {
        getAllUsers();
    }, [isAuthenticated(), user?.role]);
    return (
        <>
            <div className={`flex justify-end mt-12`}>
                <button onClick={() => setOpenAddUserModal(true)}
                        className={`bg-blue-100 text-blue-500 p-2 rounded-lg hover:bg-blue-500 hover:text-white hover:shadow-md capitalize`}
                >
                    <i className={`pi pi-plus-circle`} ></i> Add User
                </button>
            </div>

            <div className="overflow-x-auto rounded-lg shadow-lg p-3 mt-12">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                    <tr>
                        <th className="p-2 text-left">Name</th>
                        <th className="p-2 text-left">Email</th>
                        <th className="p-2 text-left">Role</th>
                        <th className="p-2 text-left">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentItems.map((user) => (
                        <tr key={user._id} className="border-b hover:bg-gray-100">
                            <td className="p-2">{user.name}</td>
                            <td className="p-2">{user.email}</td>
                            <td className="p-2">{user.role}</td>
                            <td className="p-2">
                                <ActionDropdown
                                    row={user}
                                    onDelete={handleDelete}
                                    type="User"
                                    CustomView={ViewUser}
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
                open={openAddUserModal}
                onClose={()=>setOpenAddUserModal(false)}
            >
                <SignUp/>
            </Modal>
        </>
    );
}

export default UserList;