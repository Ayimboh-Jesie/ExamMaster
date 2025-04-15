import React, { useState } from 'react';

export const View = ({ row }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleView = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
        <>
            <button
                onClick={handleView}
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

                        <h2 className="text-xl font-bold mb-2">{row.title}</h2>

                        <p className="mb-2 text-sm text-gray-600">
                            <span className="font-medium">Asked by:</span> {row.askedBy?.name || 'Unknown'}
                        </p>

                        <p className="mb-4">
                            <span className="font-medium">Description:</span> {row.description}
                        </p>

                        {row.image ? (
                            <div className="mb-4">
                                <img
                                    src={`http://localhost:3000/${row.image}`}
                                    alt="Question"
                                    className="w-full h-48 object-cover rounded"
                                />
                            </div>
                        ) : (
                            <div className="mb-4 w-2/6">
                                <img
                                    src={`http://localhost:3000/uploads/image.png`}
                                    alt="Question"
                                    className="w-full h-48 object-contain rounded"
                                />
                            </div>
                        )}

                        <p className="text-sm text-gray-500">
                            <span className="font-medium">Course:</span> {row.course} |{" "}
                            <span className="font-medium">Exam Type:</span> {row.exam_type} |{" "}
                            <span className="font-medium">Field:</span> {row.study_field}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};
