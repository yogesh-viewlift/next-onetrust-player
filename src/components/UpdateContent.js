"use client";
import React, { useState } from "react";
import {
  setVideoId,
  setApiBaseUrl,
  setAccessToken,
  clearAppStorage,
} from "@/lib/helper";

export default function UpdateContent() {
  const [videoId, setVid] = useState("");
  const [apiBaseUrl, setApi] = useState("");
  const [token, setTok] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const validateUrl = (url) => {
    try {
      return Boolean(new URL(url));
    } catch {
      return false;
    }
  };

  const handleUpdate = () => {
    setError("");
    setSuccess(false);

    if (videoId.trim()) setVideoId(videoId.trim());

    if (apiBaseUrl.trim()) {
      if (!validateUrl(apiBaseUrl)) {
        setError("Invalid API Base URL");
        return;
      }
      setApiBaseUrl(apiBaseUrl.trim());
    }

    if (token.trim()) setAccessToken(token.trim());

    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-white text-gray-900 py-4 px-6 shadow flex justify-between items-center">
        <a
          href="/"
          className="text-blue-600 hover:underline text-sm font-medium"
        >
          ← Back to Player
        </a>
        <button
          onClick={clearAppStorage}
          className="bg-gray-600 text-white px-4 py-1 rounded hover:bg-gray-700 text-sm"
        >
          Clear Storage
        </button>
      </header>

      <main className="flex items-center justify-center p-6">
        <div className="w-full max-w-lg bg-white rounded-xl shadow p-6 space-y-4">
          <h2 className="text-lg font-semibold mb-2">Update Content</h2>

          {error && (
            <p className="text-red-600 font-medium text-sm">{error}</p>
          )}
          {success && (
            <p className="text-green-600 font-medium text-sm">
              Values updated successfully.
            </p>
          )}

          <div>
            <label className="block text-sm font-medium">Video ID</label>
            <input
              value={videoId}
              onChange={(e) => setVid(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded"
              placeholder="Enter Video ID"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">API Base URL</label>
            <input
              value={apiBaseUrl}
              onChange={(e) => setApi(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded"
              placeholder="https://your-api.url"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Token</label>
            <input
              value={token}
              onChange={(e) => setTok(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded"
              placeholder="Enter Token"
            />
          </div>

          <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            Update
          </button>
        </div>
      </main>
    </div>
  );
}
