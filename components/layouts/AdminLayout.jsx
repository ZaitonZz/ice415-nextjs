"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import { Shield, LogOut, Home } from "lucide-react";
import Link from "next/link";

const AdminLayout = ({ children }) => {
  const { isAuthenticated, isAdmin, loading, user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading Admin Panel...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-red-200">
        <div className="text-center bg-white p-8 rounded-2xl shadow-2xl max-w-md">
          <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Access Denied
          </h1>
          <p className="text-gray-600 mb-6">
            You don't have admin privileges to access this area.
          </p>
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <Home className="w-4 h-4" />
            <span>Go to Home</span>
          </Link>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout from admin panel?")) {
      await logout();
      // Redirect to admin login after logout
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-purple-500" />
            <span className="text-xl font-bold">Admin Panel</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <div className="px-4 py-2 text-gray-400 text-sm uppercase tracking-wider font-semibold">
            Management
          </div>
          <Link
            href="/admin/waifus"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-purple-600 text-white shadow-lg"
          >
            <span className="text-xl"></span>
            <span>Waifus</span>
          </Link>
          {/* Add more admin links here */}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center space-x-3 px-4 py-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
              {user?.username?.[0]?.toUpperCase()}
            </div>
            <div>
              <p className="font-medium">{user?.username}</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-white shadow-sm md:hidden">
          <div className="px-4 py-3 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Shield className="w-6 h-6 text-purple-600" />
              <span className="font-bold text-gray-900">Admin Panel</span>
            </div>
            <button onClick={handleLogout} className="text-gray-600">
              <LogOut className="w-6 h-6" />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
