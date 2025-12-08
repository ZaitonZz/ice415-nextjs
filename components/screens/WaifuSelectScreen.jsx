"use client";
import React, { useState, useEffect } from "react";
import { useGame, useGameDispatch } from "../../state/GameContext";
import { conversations } from "../../data/conversations";
import { getMoodImage } from "../../services/waifuPics";
import { playSound } from "../../services/audio";
import { getAllWaifus, getWaifuImageUrl } from "../../services/waifuApi";
import { useMusic } from "../../hooks/useMusic";

const WaifuSelectScreen = () => {
  const state = useGame();
  const dispatch = useGameDispatch();
  const { playMusic } = useMusic();
  const [waifus, setWaifus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadWaifus();
  }, []);

  const loadWaifus = async () => {
    try {
      setLoading(true);
      const response = await getAllWaifus(true); // Only get active waifus
      
      // Additional frontend filter to ensure only active waifus are shown
      const activeWaifus = response.data.filter(waifu => waifu.isActive !== false);
      
      setWaifus(activeWaifus);
      setError(null);
    } catch (err) {
      console.error("Error loading waifus:", err);
      setError("Failed to load waifus. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectWaifu = async (waifu) => {
    try {
      console.log("Selecting waifu:", waifu);

      // Create a compatible waifu key from the name
      const waifuKey = waifu.name.toLowerCase();

      dispatch({ type: "SET_SELECTED_WAIFU", waifu: waifuKey });
      dispatch({ type: "SET_WAIFU_DATA", waifuData: waifu }); // Store full waifu object
      dispatch({ type: "SET_GAME_STATE", gameState: "playing" });
      dispatch({ type: "SET_MOOD", mood: "neutral" });
      dispatch({ type: "SET_AFFECTION", affection: 50 });
      dispatch({ type: "SET_CONVERSATION_COUNT", count: 0 });
      dispatch({ type: "RESET_HISTORY" });

      // Get first conversation (fallback to sweet if not found)
      const firstConversation =
        conversations[waifuKey]?.[0] || conversations.sweet?.[0];
      console.log("First conversation:", firstConversation);

      if (firstConversation) {
        dispatch({
          type: "SET_DIALOGUE",
          dialogue: firstConversation.question,
        });
        dispatch({ type: "SET_CHOICES", choices: firstConversation.choices });
      } else {
        dispatch({
          type: "SET_DIALOGUE",
          dialogue: `Hello! I'm ${waifu.name}. I'm ready to chat with you!`,
        });
        dispatch({ type: "SET_CHOICES", choices: [] });
      }

      // Load image from waifu emotions
      dispatch({ type: "SET_LOADING", loading: true });
      const normalEmotion = waifu.emotions.find((e) => e.emotion === "normal");
      if (normalEmotion) {
        const imageUrl = getWaifuImageUrl(normalEmotion.imageUrl);
        dispatch({ type: "SET_IMAGE", image: imageUrl });
      } else {
        // Fallback to old method
        const imageUrl = await getMoodImage("neutral");
        dispatch({ type: "SET_IMAGE", image: imageUrl });
      }
      dispatch({ type: "SET_LOADING", loading: false });

      // Play music
      if (state.musicEnabled) {
        playMusic();
      }

      playSound("click", state.soundEnabled);
    } catch (error) {
      console.error("Error in selectWaifu:", error);
      dispatch({
        type: "SET_DIALOGUE",
        dialogue: `Hello! I'm ${waifu.name}. I'm ready to chat with you!`,
      });
      dispatch({ type: "SET_CHOICES", choices: [] });
      dispatch({ type: "SET_LOADING", loading: false });
    }
  };

  const handleBack = () => {
    dispatch({ type: "SET_GAME_STATE", gameState: "start" });
    playSound("click", state.soundEnabled);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-purple-900 flex items-center justify-center">
        <div className="text-white text-2xl">Loading waifus...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-2xl mb-4">{error}</div>
          <button
            onClick={loadWaifus}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-purple-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Choose Your Waifu 💕
          </h1>
          <p className="text-xl text-purple-200 mb-8">
            Each waifu has a unique personality and 10 conversations waiting for
            you!
          </p>
          <button
            onClick={handleBack}
            className="text-purple-300 hover:text-white underline"
          >
            ← Back to Menu
          </button>
        </div>

        {waifus.length === 0 ? (
          <div className="text-center text-white">
            <p className="text-xl mb-4">No waifus available yet.</p>
            <p className="text-purple-200">Please contact an administrator.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {waifus.map((waifu) => {
              const normalEmotion = waifu.emotions.find(
                (e) => e.emotion === "normal"
              );
              return (
                <div
                  key={waifu._id}
                  className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                  onClick={() => handleSelectWaifu(waifu)}
                >
                  {normalEmotion && (
                    <div className="w-full h-48 overflow-hidden bg-white/5">
                      <img
                        src={getWaifuImageUrl(normalEmotion.imageUrl)}
                        alt={waifu.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6 text-center">
                    <div className="text-4xl mb-2">{waifu.icon}</div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {waifu.name}
                    </h3>
                    <p className="text-purple-200 font-semibold mb-2">
                      {waifu.personality}
                    </p>
                    <p className="text-purple-300 text-sm mb-4">
                      {waifu.description}
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {waifu.traits.map((trait, index) => (
                        <span
                          key={index}
                          className="bg-white/20 text-white text-xs px-2 py-1 rounded-full"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default WaifuSelectScreen;

