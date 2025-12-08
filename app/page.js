"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Heart,
  Play,
  Shield,
  Users,
  Trophy,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function LandingPage() {
  const router = useRouter();

  const features = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Multiple Personalities",
      description:
        "Choose from 6 unique waifu personalities, each with their own traits and stories",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Dynamic Interactions",
      description:
        "Your choices matter! Experience different moods and reactions based on your decisions",
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Achievements & Progress",
      description:
        "Unlock achievements, outfits, and special endings as you play",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Date System",
      description:
        "Go on virtual dates to various locations and build your relationship",
    },
  ];

  const waifuTypes = [
    {
      name: "Aiko",
      personality: "Sweet & Caring",
      icon: "💕",
      color: "from-pink-400 to-red-500",
    },
    {
      name: "Yuki",
      personality: "Cheerful & Energetic",
      icon: "❄️",
      color: "from-blue-400 to-cyan-500",
    },
    {
      name: "Sakura",
      personality: "Shy & Gentle",
      icon: "🌸",
      color: "from-pink-300 to-purple-400",
    },
    {
      name: "Mai",
      personality: "Friendly & Smiling",
      icon: "☀️",
      color: "from-yellow-400 to-orange-500",
    },
    {
      name: "Hana",
      personality: "Welcoming & Warm",
      icon: "🌺",
      color: "from-green-400 to-emerald-500",
    },
    {
      name: "Luna",
      personality: "Mysterious & Enigmatic",
      icon: "🌙",
      color: "from-purple-600 to-indigo-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              💕 Yandere AI Game
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="px-6 py-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-8 animate-fade-in-up">
              Find Your Perfect
              <span className="block bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mt-2">
                AI Companion
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto animate-fade-in-up delay-100">
              Experience a unique relationship simulation powered by advanced AI.
              Chat, date, and build a connection with your ideal waifu.
            </p>
            <div className="flex justify-center space-x-6 animate-fade-in-up delay-200">
              <button
                onClick={() => router.push("/register")}
                className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-xl"
              >
                <Play className="w-6 h-6" />
                <span>Start Playing Now</span>
              </button>
              <button
                onClick={() => router.push("/login")}
                className="flex items-center space-x-2 px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 rounded-full font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg border border-gray-200"
              >
                <span>Login</span>
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-white/50 backdrop-blur-sm rounded-3xl my-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Game Features
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need for an immersive experience
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Waifu Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Meet the Waifus
          </h2>
          <p className="text-xl text-gray-600">
            Who will you choose to be your companion?
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {waifuTypes.map((waifu, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${waifu.color} opacity-90 transition-opacity duration-300 group-hover:opacity-100`}
              ></div>
              <div className="relative p-8 text-white h-full flex flex-col items-center justify-center text-center">
                <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {waifu.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2">{waifu.name}</h3>
                <p className="text-white/90 font-medium">{waifu.personality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                💕 Yandere AI Game
              </div>
              <p className="text-gray-500 mt-2">
                © 2025 Yandere AI Game. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <Link
                href="/admin/login"
                className="text-gray-500 hover:text-purple-600 transition-colors flex items-center space-x-2"
              >
                <Shield className="w-4 h-4" />
                <span>Admin Access</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
