import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

function Tags() {
    return (
        <div>
             <div className=" h-screen">
        <Navbar />
      <div className="flex">
      <aside className="w-2/12">
        <Sidebar />
        </aside>
        <div style={{padding:"24px 24px"}} className="w-full px-12 my-12 gap-3">
<h1 className='text-2xl font-bold'>Tags</h1><br></br>
<p>A tag is a keyword or label that categorizes your question with other, similar questions. Using <br/>the right tags makes it easier for others to find and answer your question.</p>
<br></br>
<p className='text-blue-300'>sow all my synonyms</p><br></br>
<div
          style={{ padding: "4px", marginTop: "5px" }}
          className="border border-gray-200 rounded-lg w-[17%] text-center flex gap-3 items-center">
<span className="pi pi-search p-3"></span>
          <input
            type="text"
            placeholder="filter by name"
            className=""
          />
        </div><br></br>
          <div style={{padding:'12px'}} className="w-[25%] h-[30%] flex justify-between border border-gray-200 flex-col">
            <button className='bg-gray-100 w-[30%] h-[20%] border rounded-lg border-none outline-none focus:outline focus:border-0 '>javascript</button>
          <p>For questions about programming in ECMAScript (JavaScript/JS)</p>
          <div className='flex justify-between'>
            <p>25756533</p>
            <p>questions</p>
          </div>
          </div>
        </div>
         
      </div>
      
        </div>
        </div>
    )
}
export default Tags