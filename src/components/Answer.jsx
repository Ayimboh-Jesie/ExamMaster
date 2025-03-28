import React from 'react'
import Navbar from '../pages/Navbar'
import Sidebar from '../pages/Sidebar'

function Answer() {
  return (
    // <div>Answer</div>
    <div className=" h-screen overflow-y-hidden">
        <Navbar />
        <hr />
      <div className="flex px-16 h-screen ">
      <aside className="w-2/12">
        <Sidebar />
      </aside>
      <div className='w-full'>
      <div className='flex p-4'>Your Answer</div>
      <textarea className='w-[70%] h-[50%] border p-8 m-4'>Write your Answers here!</textarea>
      <div>
      <button className='bg-blue-500 rounded-lg text-white w-[20%] h-[12%] p-4 m-4'>Post Your Answer</button>
      </div>
      </div>
</div>
</div>
  )
}

export default Answer