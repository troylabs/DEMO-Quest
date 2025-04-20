"use client";

import { UserData } from "@/types/userTypes";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: UserData | null;
  login: (email: string, password: string) => Promise<UserData | null>;
  logout: () => void;
  signup: (
    email: string,
    password: string,
    name: string
  ) => Promise<UserData | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface ProvideAuthProps {
  children: React.ReactNode;
}
export function ProvideAuth({ children }: ProvideAuthProps) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
function useProvideAuth() {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();
        if (response.ok) {
          setUser(data.user);
        } else {
          console.error("Error getting user", data);
        }
      } catch (error) {
        console.error("Error getting user", error);
      }
    };
    getUser();
  }, []);

  const signup = async (email: string, password: string, name: string) => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ email, password, name }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        return data.user;
      } else {
        console.error("Error signing up", data);
        return null;
      }
    } catch (error) {
      console.error("Error signing up", error);
      return null;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        return data.user;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error logging in", error);
      return null;
    }
  };

  const logout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setUser(null);
        window.location.href = "/"; // Redirect to login page
      }
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  return {
    user,
    signup,
    login,
    logout,
  };
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a ProvideAuth");
  }
  return context;
};
