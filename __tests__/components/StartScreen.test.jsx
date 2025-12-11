/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import StartScreen from "../../components/screens/StartScreen";
import { useGame, useGameDispatch } from "../../state/GameContext";
import { getGreetingImage } from "../../services/waifuPics";
import { playSound } from "../../services/audio";

// Mock hooks and services
jest.mock("../../state/GameContext", () => ({
  useGame: jest.fn(),
  useGameDispatch: jest.fn(),
}));

jest.mock("../../services/waifuPics", () => ({
  getGreetingImage: jest.fn(),
}));

jest.mock("../../services/audio", () => ({
  playSound: jest.fn(),
}));

// Mock Lucide icons
jest.mock("lucide-react", () => ({
  Play: () => <div data-testid="play-icon" />,
  Settings: () => <div data-testid="settings-icon" />,
  Shield: () => <div data-testid="shield-icon" />,
}));

// Mock AdminPanel
jest.mock("../../components/admin/AdminPanel", () => () => (
  <div data-testid="admin-panel" />
));

describe("StartScreen", () => {
  const mockDispatch = jest.fn();
  const mockState = {
    greetingImage: "http://example.com/image.jpg",
    soundEnabled: true,
    showAdminPanel: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useGameDispatch.mockReturnValue(mockDispatch);
    useGame.mockReturnValue(mockState);
    getGreetingImage.mockResolvedValue("http://example.com/new-image.jpg");
  });

  it("renders correctly", async () => {
    render(<StartScreen />);

    expect(screen.getByText("Yandere AI: Love.exe")).toBeInTheDocument();
    expect(screen.getByText("Welcome, Master! 💕")).toBeInTheDocument();

    // Check for buttons
    expect(screen.getByText("Choose Your Waifu")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("loads greeting image on mount", async () => {
    render(<StartScreen />);

    await waitFor(() => {
      expect(getGreetingImage).toHaveBeenCalled();
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "SET_GREETING_IMAGE",
        image: "http://example.com/new-image.jpg",
      });
    });
  });

  it("handles start game click", () => {
    render(<StartScreen />);

    const startButton = screen.getByText("Choose Your Waifu");
    fireEvent.click(startButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_GAME_STATE",
      gameState: "waifuSelect",
    });
    expect(playSound).toHaveBeenCalledWith("click", true);
  });

  it("handles settings click", () => {
    render(<StartScreen />);

    const settingsButton = screen.getByText("Settings");
    fireEvent.click(settingsButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_SHOW_SETTINGS",
      show: true,
    });
    expect(playSound).toHaveBeenCalledWith("click", true);
  });
});
