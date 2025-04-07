import React from 'react';

const FileDisplay = ({ filePath }) => {
    if (!filePath) return null;

    const filename = filePath.split('/').pop();
    const fileExtension = filename.split('.').pop().toLowerCase();

    const isImage = ['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension);
    const isPDF = fileExtension === 'pdf';
    const isDocument = ['doc', 'docx', 'txt'].includes(fileExtension);

    const fileUrl = `http://localhost:3000/${filePath}`;

    return (
        <div className=" w-full flex justify-centent items-center mt-3 p-3 border border-gray-200 mb-3">

            {isImage ? (
                <div className="mt-2">
                    <img
                        src={fileUrl}
                        alt={filename}
                        className="w-full h-auto max-h-60 bg-cover bg-center"
                    />
                </div>
            ) : isPDF ? (
                <div className="mt-2 p-2 bg-white rounded border flex items-center">
                    <i className="pi pi-file-pdf text-red-500 text-2xl mr-2"></i>
                    <span>PDF Document</span>
                </div>
            ) : isDocument ? (
                <div className="mt-2 p-2 bg-white rounded border flex items-center">
                    <i className="pi pi-file-word text-blue-500 text-2xl mr-2"></i>
                    <span>Document File</span>
                </div>
            ) : (
                <div className="mt-2 p-2 bg-white rounded border flex items-center">
                    <i className="pi pi-file text-gray-500 text-2xl mr-2"></i>
                    <span>File Attachment</span>
                </div>
            )}
        </div>
    );
};

export default FileDisplay;