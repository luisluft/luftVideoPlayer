const video = document.querySelector("video");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const playButton = document.querySelector("#play-button");
const volumeIcon = document.querySelector("#volume-icon");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");
const currentTime = document.querySelector(".time-elapsed");
const durationTime = document.querySelector(".time-duration");
const fullscreenButton = document.querySelector(".fullscreen");

// Play & Pause ----------------------------------- //
function showPlayIcon() {
  playButton.classList.replace("fa-pause", "fa-play");
  playButton.setAttribute("title", "Play");
}

function togglePlay() {
  if (video.paused) {
    video.play();
    playButton.classList.replace("fa-play", "fa-pause");
    playButton.setAttribute("title", "Pause");
  } else {
    video.pause();
    showPlayIcon();
  }
}

// Progress Bar ---------------------------------- //

// Volume Controls --------------------------- //

// Change Playback Speed -------------------- //

// Fullscreen ------------------------------- //

// Event listeners
playButton.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("ended", showPlayIcon);
