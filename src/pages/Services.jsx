import React from 'react'

function Services() {
  return (
    <div>
    <section className="flex flex-col h-screen items-center justify-center p-8 md:p-12 lg:p-16 bg-blue-50">
      <h1 className="text-3xl font-black mb-6 text-gray-900">Our Services</h1><br/>
      <p className="text-lg text-center text-gray-700 max-w-2xl mb-8">
        Access thousands of past exam questions across various courses. 
        Search and filter questions by course, specialty, level, and year. 
        View answers and solutions for each question.
      </p><br/>

      <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
        <button className="bg-blue-600 w-40 h-13 cursor-pointer hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition">
          Sign Up Now
        </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button className="bg-orange-500 cursor-pointer hover:bg-orange-600 w-50 h-13 text-white font-bold py-3 px-6 rounded-lg shadow-md transition">
          Start Studying Today
        </button>
      </div>
    </section></div>
  )
}

export default Services