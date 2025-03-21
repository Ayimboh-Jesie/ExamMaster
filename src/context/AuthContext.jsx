import { useContext, createContext, useState, useEffect } from "react";
import axiosInstance from "../config/axios"

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("loggedUser") || "");

  useEffect(() => {
    const loggedUser = localStorage.getItem("loggedUser");
    const storedToken = localStorage.getItem("token");

    if (loggedUser && storedToken) {
      setUser(JSON.parse(loggedUser));
      setToken(storedToken);
    }
  }, []);


  const isAuthenticated = () => {
    return !!token;
  };

  const login = async (data) => {
      console.log("entered login context");
      setIsLoading(true);
    try {
      console.log("entered login try");
      const response = await axiosInstance.post("/users/login", data);
        console.log("login response from context", response);
      if (response.data) {
          setUser(response?.data?.user);
          setToken(response?.data?.token);
          localStorage.setItem("loggedUser", JSON.stringify(response?.data?.user));
          localStorage.setItem("token", response?.data?.token);
          window.location.href = '/';
          console.log("logged in user: ", user);
          return response;
        }
        throw new Error("Login failed: No data returned");
      } catch (err) {
        console.error(err);
        throw err;
      } finally {
        setIsLoading(false);
      }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("loggedUser");
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logOut, isLoading, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};