import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    // Simulate API call
    if (email === "demo@example.com" && password === "password") {
      setUser({ id: 1, name: "Demo User", email });
      return true;
    }
    return false;
  };

  const register = async (name, email, password) => {
    // Simulate API call
    setUser({ id: Date.now(), name, email });
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 