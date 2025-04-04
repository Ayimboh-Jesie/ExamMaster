import React from 'react'

function Comment({answer, onClose}) {
  return (
    <div className="bg-white p-6 rounded-lg max-w-md w-full">
      <h3 className="font-semibold mb-4">Comment on:</h3>
      <p className="mb-2">"{answer.title}"</p>
      <p className="text-sm text-gray-600 mb-4">
        Posted by: {answer.answeredBy.name}
      </p>

      <text className="" placeholder="Write your comment here">

      </text>

      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        Close
      </button>
    </div>
  )
}

export default Comment