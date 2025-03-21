import { createContext, useState } from "react";

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const openLoginModal = () =>{ console.log("opening modal in context"); setIsLoginOpen(true); console.log("open state:", isLoginOpen)};
  const closeLoginModal = () => setIsLoginOpen(false);

  const openSignUpModal = () => setIsSignUpOpen(true);
  const closeSignUpModal = () => setIsSignUpOpen(false);

  return (
    <ModalContext.Provider
      value={{
        isLoginOpen,
        openLoginModal,
        closeLoginModal,
        isSignUpOpen,
        openSignUpModal,
        closeSignUpModal,
        setIsLoginOpen,
        setIsSignUpOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };