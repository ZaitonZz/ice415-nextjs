"use client";
import React from "react";
import { GameProvider } from "../state/GameContext";
import ScreenRouter from "./ScreenRouter";
import MusicManager from "./MusicManager";

const AppRoot = () => {
  return (
    <GameProvider>
      <MusicManager />
      <ScreenRouter />
    </GameProvider>
  );
};

export default AppRoot;

