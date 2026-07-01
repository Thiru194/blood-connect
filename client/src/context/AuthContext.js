import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getCurrentUser,
} from "../services/authService";

const AuthContext =
  createContext();

export const AuthProvider = ({
  children,
}) => {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadUser =
      async () => {
        const token =
          localStorage.getItem(
            "token"
          );

        if (!token) {
          setLoading(false);
          return;
        }

       try {
  const data =
    await getCurrentUser(
      token
    );

  setUser(
    data.user
  );
} catch (error) {
  console.log(error);
}finally {
          setLoading(false);
        }
      };

    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);