export function ensureVideoElement(wrapperId, videoId) {
  const existingVideo = document.getElementById(videoId);
  console.log("existingVideo")
  if (existingVideo) return;

  const newVideo = document.createElement("video");
  newVideo.setAttribute("id", videoId);
  newVideo.className = "video-js w-full h-full";
  newVideo.setAttribute("controls", "");

  const wrapper = document.getElementById(wrapperId);
  if (wrapper) {
    wrapper.appendChild(newVideo);
  } else {
    console.warn(`Wrapper with id "${wrapperId}" not found`);
  }
}
