"use client";
import React, { useState } from "react";
import {
  setVideoId,
  setApiBaseUrl,
  setAccessToken,
  clearAppStorage,
  setSiteName,
  setXApiKey,
} from "@/lib/helper";

export default function UpdateContent() {
  const [videoId, setVid] = useState("");
  const [apiBaseUrl, setApi] = useState("");
  const [token, setTok] = useState("");
  const [siteName, setSite] = useState("");
  const [xApiKey, setKey] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [cleared, setCleared] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const validateUrl = (url) => {
    try {
      return Boolean(new URL(url));
    } catch {
      return false;
    }
  };

  const handleUpdate = () => {
    setError("");
    setSuccess("");

    if (
      !videoId.trim() &&
      (!apiBaseUrl.trim() &&
        !token.trim() &&
        !siteName.trim() &&
        !xApiKey.trim())
    ) {
      setError("Please enter at least one field to update.");
      return;
    }

    if (videoId.trim()) setVideoId(videoId.trim());

    if (showAdvanced) {
      if (apiBaseUrl.trim()) {
        if (!validateUrl(apiBaseUrl)) {
          setError("Invalid API Base URL");
          return;
        }
        setApiBaseUrl(apiBaseUrl.trim());
      }

      if (token.trim()) setAccessToken(token.trim());
      if (siteName.trim()) setSiteName(siteName.trim());
      if (xApiKey.trim()) setXApiKey(xApiKey.trim());
    }

    setSuccess("Values updated successfully.");
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleClearStorage = () => {
    clearAppStorage();
    setCleared(true);
    setTimeout(() => setCleared(false), 3000);
  };

  const isDisabled =
    !videoId.trim() &&
    (!showAdvanced ||
      (!apiBaseUrl.trim() &&
        !token.trim() &&
        !siteName.trim() &&
        !xApiKey.trim()));

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
          onClick={handleClearStorage}
          className="bg-gray-600 text-white px-4 py-1 rounded hover:bg-gray-700 text-sm"
        >
          Clear Storage
        </button>
      </header>

      <main className="flex items-center justify-center p-6">
        <div className="w-full max-w-lg bg-white rounded-xl shadow p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Update Content
          </h2>

          {error && <p className="text-red-600 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}
          {cleared && (
            <p className="text-green-600 text-sm">
              App storage cleared successfully.
            </p>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Video ID</label>
            <input
              value={videoId}
              onChange={(e) => setVid(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter Video ID"
            />
          </div>

          <div className="flex items-center space-x-2 mt-2">
            <input
              id="toggleAdvanced"
              type="checkbox"
              checked={showAdvanced}
              onChange={() => setShowAdvanced((prev) => !prev)}
              className="h-4 w-4 text-blue-600"
            />
            <label htmlFor="toggleAdvanced" className="text-sm">
              Update Config Settings (API, Token, Site Name, X-API Key)
            </label>
          </div>

          {showAdvanced && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">
                  API Base URL
                </label>
                <input
                  value={apiBaseUrl}
                  onChange={(e) => setApi(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="https://your-api.url"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Site Name
                </label>
                <input
                  value={siteName}
                  onChange={(e) => setSite(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="e.g. liv-golf"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  X-API Key
                </label>
                <input
                  value={xApiKey}
                  onChange={(e) => setKey(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter X-API Key"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Token</label>
                <input
                  value={token}
                  onChange={(e) => setTok(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter Token"
                />
              </div>
            </>
          )}

          <button
            onClick={handleUpdate}
            disabled={isDisabled}
            className={`${
              isDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white px-4 py-2 rounded w-full transition duration-200`}
          >
            Update
          </button>
        </div>
      </main>
    </div>
  );
}
