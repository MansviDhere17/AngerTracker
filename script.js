const bgMusic = document.getElementById("bgMusic");
const clickSound = document.getElementById("clickSound");
const saveSound = document.getElementById("saveSound");
const muteToggle = document.getElementById("muteToggle");

let angerLevel = 0;

// Get saved mute and music time
let isMuted = localStorage.getItem("muted") === "true";
let musicTime = parseFloat(localStorage.getItem("musicTime")) || 0;

// Resume music from saved time
bgMusic.currentTime = musicTime;
bgMusic.muted = isMuted;
clickSound.muted = isMuted;
saveSound.muted = isMuted;
muteToggle.textContent = isMuted ? "🔇" : "🔊";

// Save music time every second
setInterval(() => {
  localStorage.setItem("musicTime", bgMusic.currentTime);
}, 1000);

// Mute toggle
muteToggle.addEventListener("click", () => {
  isMuted = !isMuted;
  bgMusic.muted = isMuted;
  clickSound.muted = isMuted;
  saveSound.muted = isMuted;
  muteToggle.textContent = isMuted ? "🔇" : "🔊";
  localStorage.setItem("muted", isMuted);
});

window.addEventListener("click", () => {
  bgMusic.play().catch(() => {});
}, { once: true });

function setLevel(level) {
  angerLevel = level;
  if (!isMuted) {
    clickSound.currentTime = 0;
    clickSound.play();
  }

  document.getElementById("feedback").textContent =
    level >= 4
      ? "Try calming exercise above. You’ve got this 💪"
      : "You're doing well. Stay calm 🌿";

  gsap.from("#feedback", { opacity: 0, y: -20, duration: 0.5 });
}

function saveEntry() {
  const reason = document.getElementById("reason").value;
  if (!reason) {
    alert("Please write something.");
    return;
  }

  if (!isMuted) {
    saveSound.currentTime = 0;
    saveSound.play();
  }

  const entry = {
    level: angerLevel,
    reason,
    date: new Date().toLocaleString(),
  };

  let logs = JSON.parse(localStorage.getItem("angerLogs")) || [];
  logs.push(entry);
  localStorage.setItem("angerLogs", JSON.stringify(logs));

  document.getElementById("reason").value = "";
  document.getElementById("feedback").textContent = "📝 Entry saved!";
  gsap.from("#feedback", { scale: 1.5, opacity: 0, duration: 0.4 });
}
