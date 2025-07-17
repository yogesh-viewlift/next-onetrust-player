// =======================
// Token-related helpers
// =======================

export async function getToken() {
  const existingToken = getAccessToken();
  if (existingToken) return existingToken;
  return await fetchToken();
}

async function fetchToken() {
  const baseUrl = getApiBaseUrl();
  if (!baseUrl) {
    console.error("Missing API base URL in env or localStorage");
    return null;
  }

  const url = `${baseUrl}/token/anonymous`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error("Failed to fetch token");

    const data = await res.json();
    const token = data?.accessToken || data?.token;

    if (token) setAccessToken(token);
    return token;
  } catch (err) {
    console.error("Error fetching token:", err);
    return null;
  }
}

function getAccessToken() {
  return getCookie("access_token");
}

export function setAccessToken(token) {
  setCookie("access_token", token, 7); // 7 days expiry
}

// =============================
// Cookie Helpers
// =============================

function setCookie(name, value, days = 7) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; path=/; expires=${expires}; Secure; SameSite=Lax`;
}

function getCookie(name) {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1] || null;
}

function deleteCookie(name) {
  document.cookie = `${name}=; Max-Age=0; path=/`;
}

// =============================
// LocalStorage Helpers
// =============================

function isBrowser() {
  return typeof window !== "undefined";
}

function getItem(key) {
  if (!isBrowser()) return null;
  return localStorage.getItem(key);
}

function setItem(key, value) {
  if (!isBrowser()) return;
  localStorage.setItem(key, value);
}

// =============================
// App-specific accessors
// =============================

const DEFAULT_VIDEO_ID = "6f72f710-f8e3-4605-95b2-9b3eb76f00e0";
const ENV_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getVideoId = () => getItem("videoId") || DEFAULT_VIDEO_ID;
export const setVideoId = (id) => setItem("videoId", id);

export const getApiBaseUrl = () => getItem("apiBaseUrl") || ENV_API_BASE_URL;
export const setApiBaseUrl = (url) => setItem("apiBaseUrl", url);

// =============================
// Clear all app-related storage
// =============================

export function clearAppStorage() {
  if (!isBrowser()) return;
  localStorage.removeItem("videoId");
  localStorage.removeItem("apiBaseUrl");
  deleteCookie("access_token");
}
