import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

interface AuthContextData {
  signed: boolean;
  user: object | null;
  signIn(email: string, password: string): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }: any) => {
  const [user, setUser] = useState<object | null>(null);

  useEffect(() => {
    const storagedUser = localStorage.getItem("@App:user");
    const storagedToken = localStorage.getItem("@App:token");

    if (storagedUser && storagedToken) {
      axios.defaults.headers.Authorization = `Bearer ${storagedToken}`;
      setUser(JSON.parse(storagedUser));
    }
  }, []);

  async function signIn(email: string, password: string) {
    const response = await axios.post("/login", { email, password });

    setUser(response.data.user);

    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    localStorage.setItem("@App:user", JSON.stringify(response.data.user));
    localStorage.setItem("@App:token", response.data.token);
  }

  function signOut() {
    localStorage.removeItem("@App:user");
    localStorage.removeItem("@App:token");

    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ signed: Boolean(user), user, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
