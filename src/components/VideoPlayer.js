"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import VLPlayerCore from "@viewlift/player/esm/index";
import "@viewlift/player/esm/bundle.css";
import { getApiBaseUrl, getToken, getVideoId } from "@/lib/helper";
import { ensureVideoElement } from "@/lib/utils";

export default function VideoPlayer() {
  const VlCore = VLPlayerCore();
  const [error, setError] = useState("");
  const [isPlayerInitialized, setIsPlayerInitialized] = useState(false);

  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(""), 5000);
  };

  const initializePlayer = async () => {
    if (isPlayerInitialized) return;

    try {
      ensureVideoElement("player-wrapper", "my-player");

      const videoId = getVideoId(); // e.g., from localStorage
      const apiBaseUrl = getApiBaseUrl();
      const token = await getToken();

      const config = {
        playerId: "my-player",
        videoId: videoId || "2d6d8f3c-7393-41e4-ae1f-1a4f577e1c87",
        token,
        apiBaseUrl,
        muted: "true",
        autoplay: "true",
        skin: "defaultV2"
      };

      console.log("Player config:", config);
      await VlCore.init(config);
      setIsPlayerInitialized(true);
    } catch (e) {
      const errorMsg =
        typeof e === "string"
          ? e
          : e?.response?.data?.errorCode || e?.msg || "Something went wrong";
      console.error("Player Init Error:", e);
      showError(errorMsg);
    }
  };

  useEffect(() => {
    initializePlayer();

    return () => {
      try {
        VlCore?.dispose("my-player");
        setIsPlayerInitialized(false);
      } catch (err) {
        console.warn("Dispose failed:", err);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-white text-gray-900 py-4 px-6 shadow flex justify-between items-center">
        <h1 className="text-xl font-semibold">VL Player Demo</h1>
        <Link href="/update" className="text-blue-600 hover:underline text-sm">
          Update Content
        </Link>
      </header>

      <main className="flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-4xl bg-white rounded-xl shadow overflow-hidden">
          <div id="player-wrapper" className="w-full aspect-video bg-black relative">
            {!isPlayerInitialized && (
              <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/70">
                <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="text-center mt-4 text-red-600 font-medium">
            {error}
          </div>
        )}
      </main>
    </div>
  );
}
