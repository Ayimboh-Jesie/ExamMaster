import React, { useState } from "react";
import Login from "./Login";
import Modal from "../components/Modal";
import SignUp from "./SignUp";
import { Link } from "react-router-dom";



function Navbar() {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSignUpModal, setOpenSignUpModal] = useState(false);
  return (
    <>
      <div
        style={{ padding: "12px", marginTop: "3px" }}
        className="border-b border-gray-300"
      >
        <div className="w-full flex justify-between items-center">
          <img
            src="jess.png"
            alt="logo"
            className="w-[3%] h-[5%] rounded-full"
          />
          <div
            style={{ padding: "4px", marginTop: "5px" }}
            className="border rounded-lg w-[25%] text-center flex gap-3 items-center"
          >
            <span className="pi pi-search p-3"></span>
            <input
              type="text"
              placeholder="search anything"
              className="border-none outline-none  h-10 focus:outline focus:border-0"
            />
          </div>
          
         
          <div className="flex justify-center gap-2 w-[40%]">
            <button className="border rounded-lg w-30 p-3 font-bold bg-blue-600">
              Ask question
            </button>
            <button className="w-30 p-3 font-bold">
              Papers
            </button><button className="w-30 p-3 font-bold">
              Level
            </button>
            <button
              onClick={() => setOpenLoginModal(true)}
              className=" cursor-pointer border rounded-lg w-20 font-bold bg-black text-white"
            >
  
              Login
            </button>
            
            <button
              onClick={() => setOpenSignUpModal(true)}
              className=" w-[20%] h-10 cursor-pointer font-bold text-black"
            >
              Sign Up
            </button>

            {/* <Link>Sign Up</Link> */}
          </div>
        </div>
      </div>
      {openLoginModal && (
        <Modal
          open={openLoginModal}
          onClose={() => {
            setOpenLoginModal(false);
          }}
        >
          <Login openSignUp={setOpenSignUpModal} closeLoginModal={setOpenLoginModal}/>
        </Modal>
      )}
      {openSignUpModal && (
        <Modal
          open={openSignUpModal}
          onClose={() => {
            setOpenSignUpModal(false);
          }}
        >
          <SignUp openLogin={setOpenLoginModal} closeSignupModal={setOpenSignUpModal} />
        </Modal>
      )}
    
    </>
  );
}

export default Navbar;
