import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(
    localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  );

  const logout = () => {
    localStorage.removeItem("userInfo");
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider value={{ userInfo, setUserInfo, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
