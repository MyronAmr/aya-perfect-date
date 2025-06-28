const PASSWORD = "Abgaber12";
const DATE = "23/3/2025";
const unlockTime = new Date("2025-07-03T13:00:00+02:00").getTime();

const music = document.getElementById("bg-music");
const waitingMusic = document.getElementById("waiting-music");

window.addEventListener("load", () => {
  waitingMusic.muted = false;
  waitingMusic.volume = 0.7;
  waitingMusic.play().catch(() => {
    document.addEventListener("click", () => waitingMusic.play(), { once: true });
  });
});

function toggleMusic() {
  const isMuted = music.muted && waitingMusic.muted;
  music.muted = !isMuted;
  waitingMusic.muted = !isMuted;
  document.getElementById("music-btn").textContent = isMuted ? "🔊" : "🔇";
}

function startExperience() {
  document.getElementById("countdown-screen").style.display = "none";
  document.getElementById("main-content").classList.remove("hidden");
  waitingMusic.pause();
  music.volume = 0.7;
  music.play().catch(() => {});
}

document.getElementById("enter-btn").onclick = () => {
  const pass = document.getElementById("password-input").value;
  const date = document.getElementById("date-input").value;
  const now = new Date().getTime();
  if (pass === PASSWORD || (date === DATE && now >= unlockTime)) {
    startExperience();
  } else {
    alert("Access denied or too early. Check again.");
  }
};

const countdown = document.getElementById("countdown");
setInterval(() => {
  const now = new Date().getTime();
  const dist = unlockTime - now;
  if (dist <= 0) {
    startExperience();
  } else {
    const d = Math.floor(dist / (1000 * 60 * 60 * 24));
    const h = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((dist % (1000 * 60)) / 1000);
    countdown.innerHTML = `Time left: ${d}d ${h}h ${m}m ${s}s`;
  }
}, 1000);

function handleCheck(index) {
  document.getElementById(`upload-${index}`).style.display = "block";
}

function showNext(index) {
  const fileInput = document.querySelector(`#upload-${index} input[type="file"]`);
  const file = fileInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const base64Image = e.target.result;
    const img = document.createElement("img");
    img.src = base64Image;
    img.alt = `photo-${index}`;
    img.style.width = "200px";
    img.style.margin = "10px";
    img.style.borderRadius = "10px";
    img.crossOrigin = "anonymous";
    document.getElementById("summary").appendChild(img);

    document.getElementById("flowers").style.display = "flex";
    setTimeout(() => {
      document.getElementById("flowers").style.display = "none";
      document.getElementById("kiss").style.display = "flex";
      setTimeout(() => {
        document.getElementById("kiss").style.display = "none";
        const labels = document.querySelectorAll(".checklist label");
        if (labels[index + 1]) labels[index + 1].classList.add("active");
        if (index === 4) document.getElementById("end-button").style.display = "inline-block";
      }, 5000);
    }, 2000);
  };

  reader.readAsDataURL(file);
}

function showSummary() {
  document.getElementById("summary").style.display = "block";
  document.getElementById("valentine-card").classList.remove("hidden");
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}
