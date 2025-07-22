let player1, player2, player3, player4, player5;
const bgMusic = document.getElementById("bgMusic");
const muteToggle = document.getElementById("muteToggle");

let isMuted = localStorage.getItem("muted") === "true";
let musicTime = parseFloat(localStorage.getItem("musicTime")) || 0;
bgMusic.currentTime = musicTime;
bgMusic.muted = isMuted;
muteToggle.textContent = isMuted ? "🔇" : "🔊";

// Save music position
setInterval(() => {
  localStorage.setItem("musicTime", bgMusic.currentTime);
}, 1000);

muteToggle.addEventListener("click", () => {
  isMuted = !isMuted;
  bgMusic.muted = isMuted;
  muteToggle.textContent = isMuted ? "🔇" : "🔊";
  localStorage.setItem("muted", isMuted);
});

function showExercise(name) {
  // Hide all sections
  document.querySelectorAll(".exercise-section").forEach(el => el.style.display = "none");

  // Show selected section
  const section = document.getElementById(name);
  section.style.display = "block";

  // Animate with GSAP
  gsap.fromTo(
    section,
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
  );

  // If meditation, animate individual video boxes
  if (name === "meditation") {
    gsap.fromTo(
      "#meditationWrapper .video-box",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" }
    );
  }
}


// Breathing animation
gsap.to("#breatheCircle", {
  scale: 1.5,
  duration: 4,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut"
});

// Walking timer
let walkInterval;
function startWalking() {
  let seconds = 0;
  const timerDisplay = document.getElementById("walkTimer");
  clearInterval(walkInterval);
  timerDisplay.textContent = "Time: 00:00";

  walkInterval = setInterval(() => {
    seconds++;
    const min = String(Math.floor(seconds / 60)).padStart(2, '0');
    const sec = String(seconds % 60).padStart(2, '0');
    timerDisplay.textContent = `Time: ${min}:${sec}`;
    if (seconds >= 60) {
      clearInterval(walkInterval);
      alert("✅ Great job! One minute done.");
    }
  }, 1000);
}

// YouTube player setup
function onYouTubeIframeAPIReady() {
  player1 = new YT.Player('player1', {
    height: '200',
    width: '300',
    videoId: 'inpok4MKVLM', // mindfulness
    events: { onStateChange: handleYTStateChange }
  });

  player2 = new YT.Player('player2', {
    height: '200',
    width: '300',
    videoId: 'ZToicYcHIOU', // short meditation
    events: { onStateChange: handleYTStateChange }
  });

  player3 = new YT.Player('player3', {
    height: '200',
    width: '300',
    videoId: 'O-6f5wQXSu8', // anxiety relief
    events: { onStateChange: handleYTStateChange }
  });

  player4 = new YT.Player('player4', {
    height: '200',
    width: '300',
    videoId: '6p_yaNFSYao', // calm focus
    events: { onStateChange: handleYTStateChange }
  });

  player5 = new YT.Player('player5', {
    height: '200',
    width: '300',
    videoId: 'MIr3RsUWrdo', // 1-minute relaxing
    events: { onStateChange: handleYTStateChange }
  });
}

function handleYTStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    bgMusic.pause();
  } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
    if (!bgMusic.muted) bgMusic.play();
  }
}
