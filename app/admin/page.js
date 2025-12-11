"use client";
import React, { useState } from "react";
import AdminPanel from "../../components/admin/AdminPanel";
import AdminLayout from "../../components/layouts/AdminLayout";

const AdminPage = () => {
  // Mock data for admin panel - you can replace this with actual data from API
  const [gameData, setGameData] = useState({
    gameState: "start",
    selectedWaifu: null,
    mood: "neutral",
    affection: 50,
    conversationCount: 0,
    currentDate: 0,
    storyProgress: 0,
    unlockedEndings: [],
  });

  const waifuTypes = {
    sweet: {
      name: "Aiko",
      personality: "Sweet & Caring",
      description:
        "A sweet, caring waifu who loves deeply and wants to protect you",
      color: "from-pink-400 to-red-500",
      icon: "💕",
      traits: ["loving", "protective", "romantic"],
      yandereTrigger: "possessive",
    },
    cheerful: {
      name: "Yuki",
      personality: "Cheerful & Energetic",
      description:
        "Always cheerful and full of energy, loves to make you smile",
      color: "from-blue-400 to-cyan-500",
      icon: "❄️",
      traits: ["energetic", "optimistic", "playful"],
      yandereTrigger: "jealous",
    },
    shy: {
      name: "Sakura",
      personality: "Shy & Gentle",
      description: "Gentle and shy, but has hidden strength and determination",
      color: "from-pink-300 to-purple-400",
      icon: "🌸",
      traits: ["shy", "gentle", "determined"],
      yandereTrigger: "clingy",
    },
    cool: {
      name: "Reina",
      personality: "Cool & Mature",
      description: "Mature and composed, but has a hidden intense side",
      color: "from-purple-400 to-indigo-500",
      icon: "🦋",
      traits: ["mature", "composed", "intense"],
      yandereTrigger: "obsessive",
    },
  };

  const achievementList = [
    {
      id: "first_love",
      name: "First Love",
      description: "Complete your first conversation",
      icon: "💕",
    },
    {
      id: "sweet_talker",
      name: "Sweet Talker",
      description: "Reach 80% affection",
      icon: "🍯",
    },
    {
      id: "photo_enthusiast",
      name: "Photo Enthusiast",
      description: "Take 10 screenshots",
      icon: "📸",
    },
  ];

  const giftList = [
    { id: "chocolate", name: "Chocolate", icon: "🍫", value: 10 },
    { id: "flowers", name: "Flowers", icon: "🌸", value: 15 },
    { id: "jewelry", name: "Jewelry", icon: "💎", value: 25 },
  ];

  const outfitList = {
    default: { name: "Default", description: "Original outfit", icon: "👗" },
    casual: { name: "Casual", description: "Comfy everyday wear", icon: "👕" },
    formal: { name: "Formal", description: "Elegant evening wear", icon: "👔" },
  };

  const handleUpdateGameData = (updates) => {
    setGameData((prev) => ({ ...prev, ...updates }));
  };

  return (
    <AdminLayout>
      <AdminPanel
        isOpen={true}
        onClose={() => {}} // Admin page is always open
        gameData={gameData}
        onUpdateGameData={handleUpdateGameData}
        waifuTypes={waifuTypes}
        achievementList={achievementList}
        giftList={giftList}
        outfitList={outfitList}
      />
    </AdminLayout>
  );
};

export default AdminPage;
