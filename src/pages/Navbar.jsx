import React, { useState } from "react";
import Login from "./Login";
import Modal from "../components/Modal";
import SignUp from "./SignUp";
import AskQuestion from "./questions/AskQuestion";

function Navbar() {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSignUpModal, setOpenSignUpModal] = useState(false);
  const [openAskQuestionModal, setOpenAskQuestionModal] = useState(false);

  return (
    <>
      <div className="border-b border-gray-300">
        <div className="w-full flex justify-between items-center px-24 my-4">
          <img src="jess.png" alt="logo" className="w-[3%] h-[5%] rounded-full" />
          
          <div className="border rounded-lg w-[25%] text-center flex gap-3 items-center p-4 mt-1">
            <span className="pi pi-search p-3"></span>
            <input
              type="text"
              placeholder="search anything"
              className="border-none outline-none h-10 focus:outline-none"
            />
          </div>
          
          <div className="flex justify-between gap-2 w-[50%]">
            <button 
              onClick={() => setOpenAskQuestionModal(true)}
              className="border rounded-lg w-30 p-3 font-bold bg-blue-600 text-white"
            >
              Ask question
            </button>
            <button className="w-30 p-3 font-bold">Papers</button>
            <button className="w-30 p-3 font-bold">Level</button>
            <div className="w-fit flex justify-end items-center gap-4">
              <button
                onClick={() => setOpenLoginModal(true)}
                className="cursor-pointer border rounded-lg p-3 font-bold bg-black text-white"
              >
                Login
              </button>
              <button
                onClick={() => setOpenSignUpModal(true)}
                className="cursor-pointer p-3 font-bold border border-black/75 rounded-lg text-black"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {openAskQuestionModal && (
        <Modal open={openAskQuestionModal} onClose={() => setOpenAskQuestionModal(false)}>
          <AskQuestion />
        </Modal>
      )}
      {openLoginModal && (
        <Modal open={openLoginModal} onClose={() => setOpenLoginModal(false)}>
          <Login openSignUp={setOpenSignUpModal} closeLoginModal={setOpenLoginModal} />
        </Modal>
      )}
      {openSignUpModal && (
        <Modal open={openSignUpModal} onClose={() => setOpenSignUpModal(false)}>
          <SignUp openLogin={setOpenLoginModal} closeSignupModal={setOpenSignUpModal} />
        </Modal>
      )}
    </>
  );
}

export default Navbar;
