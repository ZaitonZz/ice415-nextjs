"use client";
import React, { createContext, useContext } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const loading = status === "loading";
  const isAuthenticated = status === "authenticated";

  const login = async (email, password) => {
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (result?.error) {
      throw new Error(result.error);
    }
    return result;
  };

  const logout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  const register = async (username, email, password) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    
    const data = await res.json();
    
    if (!res.ok) {
      throw new Error(data.message || "Registration failed");
    }
    
    // Auto login after register
    await login(email, password);
  };

  const value = {
    user: session?.user,
    isAdmin: session?.user?.isAdmin,
    loading,
    isAuthenticated,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
