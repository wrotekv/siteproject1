const audio = document.querySelector("audio");
const playButton = document.getElementById("play");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return min + ":" + String(sec).padStart(2, "0");
}

function fillSlider(slider) {
  slider.style.setProperty("--progress", slider.value + "%");
}

function showDuration() {
  duration.textContent = formatTime(audio.duration);
}

playButton.addEventListener("click", function () {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

audio.addEventListener("play", function () {
  playButton.classList.add("playing");
});

audio.addEventListener("pause", function () {
  playButton.classList.remove("playing");
});

audio.addEventListener("loadedmetadata", showDuration);

audio.addEventListener("timeupdate", function () {
  if (!audio.duration) return;
  progress.value = (audio.currentTime / audio.duration) * 100;
  currentTime.textContent = formatTime(audio.currentTime);
  fillSlider(progress);
});

progress.addEventListener("input", function () {
  if (audio.duration) {
    audio.currentTime = (progress.value / 100) * audio.duration;
  }
  fillSlider(progress);
});

volume.addEventListener("input", function () {
  audio.volume = volume.value / 100;
  fillSlider(volume);
});

if (audio.duration) showDuration();
fillSlider(progress);
fillSlider(volume);
