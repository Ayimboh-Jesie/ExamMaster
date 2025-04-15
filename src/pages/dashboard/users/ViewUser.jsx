import React, {useState} from 'react';
import PropTypes from 'prop-types';

ViewUser.propTypes = {

};

export function ViewUser(row) {

    const [isOpen, setIsOpen] = useState(false);

    const handleView = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
        <>
            <button
                onClick={() => {
                    console.log("user: ", row.row.name); handleView()}}
                className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
            >
                View
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl relative">
                        <button
                            onClick={handleClose}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        >
                            ✖
                        </button>

                        <div className={`flex gap-6 items-center`}>

                            {row.image ? (
                                <div className="mb-4">
                                    <img
                                        src={`http://localhost:3000/${row.row.image}`}
                                        alt="Question"
                                        className="w-full h-48 object-cover rounded"
                                    />
                                </div>
                            ) : (
                                <div className="mb-4 w-2/6">
                                    <img
                                        src={`http://localhost:3000/uploads/user.jpg`}
                                        alt="Question"
                                        className="w-full h-64 object-contain rounded"
                                    />
                                </div>
                            )}
                            <div className={`flex flex-col gap-3`}>
                                <p>Name: <span>{row.row.name?.substring()}</span></p>
                                <p>Email: <span>{row.row.email}</span></p>
                                <p>Role: <span>{row?.row.role ?  row?.row.role: "User"}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

// export default ViewUser;