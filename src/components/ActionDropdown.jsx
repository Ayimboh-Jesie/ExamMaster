import React, { useState } from 'react';
import { View } from './View.jsx';
import { Edit } from './Edit';
import { Delete } from './Delete';

const ActionDropdown = ({   row,
                            onDelete,
                            type = "default",
                            CustomView,
                            CustomEdit,
                            CustomDelete
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const ViewComponent = CustomView || View;
    const EditComponent = CustomEdit || Edit;
    const DeleteComponent = CustomDelete || Delete;

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={toggleDropdown}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
            >
                Actions
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                    <ul className="py-1">
                        <li>
                            <ViewComponent row={row} type={type} />
                        </li>
                        <li>
                            <EditComponent row={row} type={type} />
                        </li>
                        <li>
                            <DeleteComponent row={row} type={type} onDelete={onDelete} />
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ActionDropdown;
