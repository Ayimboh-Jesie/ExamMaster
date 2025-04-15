import React from 'react';

export const Delete = ({ row, onDelete }) => {
    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete ${row.title}?`)) {
            onDelete(row._id);
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="block px-4 py-2 text-sm text-red-600 w-full text-left hover:bg-gray-100"
        >
            Delete
        </button>
    );
};
