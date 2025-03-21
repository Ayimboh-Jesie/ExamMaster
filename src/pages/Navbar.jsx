import React, { useState, useContext } from "react";
import Login from "./Login";
import Modal from "../components/Modal";
import SignUp from "./SignUp";
import AskQuestion from "./questions/AskQuestion";
import {ModalContext} from "../context/ModalContext";
import {useAuth} from "../context/AuthContext";

function Navbar() {
  const { closeLoginModal, setIsLoginOpen, isLoginOpen, isSignUpOpen, closeSignUpModal } = useContext(ModalContext);
  const [openSignUpModal, setOpenSignUpModal] = useState(false);
  const [openAskQuestionModal, setOpenAskQuestionModal] = useState(false);
  const [openDropDown, setOpenDropDown] = useState(false);

  const {user, isAuthenticated, logOut} = useAuth();


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
              {
                isAuthenticated() ? (
                    <button onClick={() => setOpenDropDown(!openDropDown)} className="flex justify-center items-center text-xl uppercase text-white rounded-full bg-green-600 w-12 h-12 cursor-pointer">
                        {user?.name.substring(0, 2)}
                    </button>
                ):(
                    <>
                    <button
                        onClick={() => setIsLoginOpen(true)}
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
                      </>
                )
              }

            </div>
          </div>
        </div>
      </div>

      {isLoginOpen && (
        <Modal open={isLoginOpen} onClose={closeLoginModal}>
            <Login  />
        </Modal>
          )}



      {openAskQuestionModal && (
        <Modal open={openAskQuestionModal} onClose={() => setOpenAskQuestionModal(false)}>
          <AskQuestion onClose={() => setOpenAskQuestionModal(false)}/>
        </Modal>
      )}
      {openSignUpModal && (
        <Modal open={isSignUpOpen} onClose={closeSignUpModal}>
          <SignUp  />
        </Modal>
      )}

      { isAuthenticated() ? openDropDown && (
            <div className="absolute top-20 right-2 bg-white w-32 rounded-lg p-4 shadow-md text-lg space-y-3">
                <button className="capitalize">
                    dashboard
                </button>
                <button onClick={logOut} className="capitalize">
                    logout
                </button>
            </div>
          ) : <></>}
    </>
  );
}

export default Navbar;
