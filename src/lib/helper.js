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
  const site = getSiteName();
  const deviceId = getDeviceId();
  const platform = getPlatform();

  if (!baseUrl || !site) {
    console.error("Missing required parameters: baseUrl or site");
    return null;
  }

  const url = `${baseUrl}/identity/anonymous-token?site=${encodeURIComponent(site)}&platform=${platform}&deviceId=${encodeURIComponent(deviceId)}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": getXApiKey(),
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch token: ${res.status}`);
    }

    const data = await res.json();
    const token = data?.authorizationToken || data?.accessToken;

    if (token) {
      // setAccessToken(token);
      return token;
    }

    return null;
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

const DEFAULT_VIDEO_ID = "9ed7dee0-c719-11ec-bc25-a195c2a34357";
const ENV_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const ENV_X_API_KEY = process.env.NEXT_PUBLIC_ENV_X_API_KEY;

export const getVideoId = () => getItem("videoId") || DEFAULT_VIDEO_ID;
export const setVideoId = (id) => setItem("videoId", id);

export const getApiBaseUrl = () => getItem("apiBaseUrl") || ENV_API_BASE_URL || "";
export const setApiBaseUrl = (url) => setItem("apiBaseUrl", url);

export const getSiteName = () => getItem("siteName") || "liv-golf";
export const setSiteName = (site) => setItem("siteName", site);

export const getXApiKey = () => getItem("xApiKey") || ENV_X_API_KEY || "";
export const setXApiKey = (apiKey) => setItem("xApiKey", apiKey);

export const getDeviceId = () => getItem("deviceId") || "browser-debb7038-dec4-5860-9581-fb619bf73145";
export const setDeviceId = (id) => setItem("deviceId", id);

export const getPlatform = () => getItem("platform") || "web_browser";
export const setPlatform = (name) => setItem("platform", name);

// =============================
// Clear all app-related storage
// =============================

export function clearAppStorage() {
  if (!isBrowser()) return;
  localStorage.removeItem("videoId");
  localStorage.removeItem("apiBaseUrl");
  deleteCookie("access_token");
}
