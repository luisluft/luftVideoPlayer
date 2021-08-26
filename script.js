const speed = document.querySelector(".player-speed");
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
function calculateTime(time) {
  const minutes = Math.floor(time / 60);

  let seconds = Math.floor(time % 60);
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  return `${minutes}:${seconds}`;
}

function updateProgress() {
  progressBar.style.width = `${(100 * video.currentTime) / video.duration}%`;
  currentTime.textContent = `${calculateTime(video.currentTime)} / `;
  durationTime.textContent = `${calculateTime(video.duration)}`;
}

function setProgress(event) {
  const clickedTime = event.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${100 * clickedTime}%`;
  video.currentTime = clickedTime * video.duration;
  console.log("clickedTime :", clickedTime);
}

// Volume Controls --------------------------- //
let lastVolume = 1;

function updateVolumeIcon(volume) {
  volumeIcon.className = "";
  if (volume > 0.7) volumeIcon.classList.add("fas", "fa-volume-up");
  if (volume <= 0.7 && volume > 0.3) volumeIcon.classList.add("fas", "fa-volume-down");
  if (volume <= 0.3 && volume > 0) volumeIcon.classList.add("fas", "fa-volume-off");
  if (volume === 0) volumeIcon.classList.add("fas", "fa-volume-mute");
}

function changeVolume(event) {
  let clickedVolume = event.offsetX / volumeRange.offsetWidth;
  volumeBar.style.width = `${clickedVolume * 100}%`;
  video.volume = clickedVolume;

  updateVolumeIcon(clickedVolume);

  lastVolume = clickedVolume;
}

function toggleMute() {
  volumeIcon.className = "";

  if (video.volume) {
    lastVolume = video.volume;
    video.volume = 0;
    volumeBar.style.width = 0;
    updateVolumeIcon(0);
    volumeIcon.setAttribute("title", "Unmute");
  } else {
    video.volume = lastVolume;
    volumeBar.style.width = `${lastVolume * 100}%`;
    updateVolumeIcon(lastVolume);
    volumeIcon.setAttribute("title", "Mute");
  }
}

// Change Playback Speed -------------------- //

function changeSpeed() {
  video.playbackRate = speed.value;
}

// Fullscreen ------------------------------- //

// Event listeners
playButton.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("ended", showPlayIcon);
video.addEventListener("timeupdate", updateProgress);
video.addEventListener("canplay", updateProgress);
progressRange.addEventListener("click", setProgress);
volumeRange.addEventListener("click", changeVolume);
volumeIcon.addEventListener("click", toggleMute);
speed.addEventListener("change", changeSpeed);
