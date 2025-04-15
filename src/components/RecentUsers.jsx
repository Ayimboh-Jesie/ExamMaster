import React, { useEffect, useState } from 'react';
import axiosInstance from "../config/axios.js";

const RecentUsers = () => {
    const [recentUsers, setRecentUsers] = useState([]);

    useEffect(() => {
        // Simulate fetching data (replace this with your actual API endpoint)
        const fetchUsers = async () => {
            const response = await axiosInstance.get('/users');
            const data = await response.data;
            setRecentUsers(data.slice(0, 8));
        };

        fetchUsers();
    }, []);

    return (
        <div className="space-y-4 bg-white border border-gray-200 p-3 rounded-lg shadow-sm">
            <h1 className={`font-semibold mb-4`}>Recent Users</h1>
            {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center space-x-4">
                    <div className={`flex justify-center items-center bg-red-100 text-red-500 rounded-full w-12 h-12 uppercase`}>
                        {user.name.substring(0,2)}
                    </div>
                    <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-gray-500 text-sm">{user.email}</p>
                    </div>
                    <div className=" border-b border-gray-200"></div>
                </div>
            ))}
        </div>
    );
};

export default RecentUsers;
