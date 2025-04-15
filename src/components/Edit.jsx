import React, { useState } from 'react';

export const Edit = ({ row, onSave }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: row.title || '',
        description: row.description || '',
        course: row.course || '',
        exam_type: row.exam_type || '',
        study_field: row.study_field || '',
    });

    const handleEdit = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Call the onSave function or send an API request to update
        if (onSave) {
            await onSave(row._id, formData);
        }

        setIsOpen(false);
    };

    return (
        <>
            <button
                onClick={handleEdit}
                className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
            >
                Edit
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
                        <button
                            onClick={handleClose}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        >
                            ✖
                        </button>

                        <h2 className="text-xl font-bold mb-4">Edit Question</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Course</label>
                                <input
                                    type="text"
                                    name="course"
                                    value={formData.course}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Exam Type</label>
                                <input
                                    type="text"
                                    name="exam_type"
                                    value={formData.exam_type}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Field of Study</label>
                                <input
                                    type="text"
                                    name="study_field"
                                    value={formData.study_field}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};
