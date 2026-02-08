/*******************************************************
  FLYING STARS BACKGROUND (Hyperspeed Romantic Colors)
*******************************************************/
const canvas = document.getElementById("star-canvas");
const ctx = canvas.getContext("2d");

let w, h;
let stars = [];
const starCount = 320;
const speed = 10;

function resizeCanvas() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  initStars();
}

function initStars() {
  stars = [];
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: (Math.random() - 0.5) * w,
      y: (Math.random() - 0.5) * h,
      z: Math.random() * w,
      colorShift: Math.random()
    });
  }
}

function drawStars() {
  ctx.fillStyle = "#1e1044";
  ctx.fillRect(0, 0, w, h);

  stars.forEach(star => {
    star.z -= speed;

    if (star.z < 1) {
      star.z = w;
      star.x = (Math.random() - 0.5) * w;
      star.y = (Math.random() - 0.5) * h;
    }

    const sx = (star.x / star.z) * w + w / 2;
    const sy = (star.y / star.z) * w + h / 2;

    const size = (1 - star.z / w) * 4;
    const opacity = (100);

    const r = 255;
    const g = 0 + Math.floor(star.colorShift * 80);
    const b = 0 + Math.floor(star.colorShift * 70);

    ctx.beginPath();
    ctx.fillStyle = `rgba(${r},${g},${b},${opacity})`;
    ctx.arc(sx, sy, size, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = `rgba(${r},${g},${b},${opacity * 0.9})`;
    ctx.lineWidth = size;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(sx - size * 6, sy - size * 6);
    ctx.stroke();
  });

  requestAnimationFrame(drawStars);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
drawStars();

/***************** */
window.addEventListener("load", () => {
  setTimeout(() => {
    const prank = document.createElement("div");
    prank.className = "prank-popup";
    prank.innerHTML = `
      <div class="prank-box">
        <h2>⚠️ FRAUD WEBSITE ALERT ⚠️</h2>
        <p>
          This website has been reported for suspicious activity... <br>
          Reason: <b>Stealing Hearts 💖</b> <br><br>
          Please proceed only if you're ready to fall in love 😌
        </p>
        <button id="prank-close">Continue ❤️</button>
      </div>
    `;
    document.body.appendChild(prank);

    document.getElementById("prank-close").addEventListener("click", () => {
      prank.remove();
    });

    setTimeout(() => prank.remove(), 6000);
  }, 1200);
});

/*******************************************************
  SHARE FRAUD ALERT
*******************************************************/
function showShareFraudAlert() {
  const alert = document.createElement("div");
  alert.className = "prank-popup";
  alert.innerHTML = `
    <div class="prank-box">
      <h2>🚨 WARNING - SCAM DETECTED 🚨</h2>
      <p>
        You're trying to share a <b>Heart-Stealing Website</b>! 💔 <br><br>
        By sharing this, you admit that:<br>
        ✓ You're totally in love 💕 <br>
        ✓ You want to spread love around 😘 <br>
        ✓ You're ready for romance 🥰
      </p>
      <button id="share-confirm">Yes, I'm Guilty! 💖</button>
    </div>
  `;
  document.body.appendChild(alert);

  document.getElementById("share-confirm").addEventListener("click", () => {
    alert.remove();
    // Copy URL to clipboard
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      // Optional: Show success message
      console.log("URL copied to clipboard!");
    });
  });

  setTimeout(() => alert.remove(), 5000);
}

// Share button handler
document.addEventListener("DOMContentLoaded", () => {
  const shareBtn = document.getElementById("share-btn");
  if (shareBtn) {
    shareBtn.addEventListener("click", showShareFraudAlert);
  }
});

// Copy to clipboard handler
document.addEventListener("copy", () => {
  showShareFraudAlert();
});
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.add("hidden");
    page.classList.remove("active");
  });

  const target = document.getElementById(pageId);
  target.classList.remove("hidden");
  target.classList.add("active");
}

/*******************************************************
  MEMORY GAME (HEART SHAPE)
*******************************************************/
const gameBoard = document.getElementById("game-board");
const statusText = document.getElementById("game-status");
const hintBtn = document.getElementById("hint-btn");

const HEART_COLS = 13;
gameBoard.style.gridTemplateColumns = `repeat(${HEART_COLS}, 1fr)`;

// Your photos
const photos = [
  "photos/1.jpg",
  "photos/2.jpg",
  "photos/3.png",
  "photos/4.png",
  "photos/5.png",
  "photos/6.png",
  "photos/7.png",
  //"photos/8.png",
  "photos/9.png",
  "photos/10.png",
  "photos/11.png",
  "photos/12.png",
  "photos/13.png",
  "photos/14.png",
  "photos/15.png",
  "photos/16.png",
  "photos/17.png",
  "photos/18.png",
  "photos/19.png",
  "photos/20.png",
  "photos/22.png",
  "photos/23.png",
  "photos/24.png",
  "photos/25.png",
  //"photos/26.png",
  "photos/27.png",
  "photos/28.png",
  "photos/29.png"
];

// Your heart pattern (must have EVEN number of 1s)
const heartPattern = [
  0,0,1,1,1,0,0,0,1,1,1,0,0,
  0,1,1,1,1,1,0,1,1,1,1,1,0,
  0,1,1,1,1,1,1,1,1,1,1,1,0,
  0,0,1,1,1,0,0,0,1,1,1,0,0,
  0,0,0,1,1,0,0,0,1,1,0,0,0,
  0,0,0,0,1,0,0,0,1,0,0,0,0,
  0,0,0,0,0,1,0,1,0,0,0,0,0,
  0,0,0,0,0,0,1,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;
let hintCount = 0;

let totalPairs = 0;

// Hint cooldown system
let hintReady = true;
let hintCooldown = 4;
let hintTimer = null;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function buildGame() {
  gameBoard.innerHTML = "";
  matchedPairs = 0;
  hintCount = 0;
  firstCard = null;
  secondCard = null;
  lockBoard = false;

  // Count cards
  let neededCards = heartPattern.filter(x => x === 1).length;

  // Make it even
  if (neededCards % 2 !== 0) neededCards--;

  totalPairs = neededCards / 2;

  if (photos.length < totalPairs) {
    statusText.innerText = `⚠️ Need ${totalPairs} photos but you only have ${photos.length}`;
    return;
  }

  // Pick only required photos
  const chosenPhotos = photos.slice(0, totalPairs);
  let gameItems = [...chosenPhotos, ...chosenPhotos];
  shuffle(gameItems);

  let itemIndex = 0;
  let usedCardCount = 0;

  heartPattern.forEach(slot => {
    if (slot === 0) {
      const empty = document.createElement("div");
      empty.classList.add("empty-slot");
      gameBoard.appendChild(empty);
    } else {
      if (usedCardCount >= neededCards) {
        const empty = document.createElement("div");
        empty.classList.add("empty-slot");
        gameBoard.appendChild(empty);
        return;
      }

      const value = gameItems[itemIndex++];

      const card = document.createElement("div");
      card.classList.add("card");
      card.dataset.value = value;

      card.innerHTML = `
        <div class="card-inner">
          <div class="card-front">💗</div>
          <div class="card-back">
            <img src="${value}" alt="memory photo"/>
          </div>
        </div>
      `;

      card.addEventListener("click", flipCard);
      gameBoard.appendChild(card);

      usedCardCount++;
    }
  });

  updateStatus();

  // Reset hint button
  resetHintCooldown();
}

function updateStatus() {
  statusText.innerText = `MILYOOO: ${matchedPairs} / ${totalPairs} | Hints: ${hintCount}`;
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  if (this.classList.contains("matched")) return;
  if (this.classList.contains("flipped")) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkMatch();
}

function checkMatch() {
  const isMatch = firstCard.dataset.value === secondCard.dataset.value;

  if (isMatch) {
    disableCards();
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.classList.add("matched");
  secondCard.classList.add("matched");

  matchedPairs++;
  updateStatus();

  resetTurn();

  if (matchedPairs === totalPairs) {
    setTimeout(() => {
      statusText.innerText = "🎉 YOU WON! Your prize is ME 😌❤️";
    }, 800);

    setTimeout(() => {
      showPage("page-proposal");
      initNoButton();
    }, 2800);
  }
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetTurn();
  }, 1200);
}

function resetTurn() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

/*******************************************************
  HINT BUTTON (Only every 30 seconds)
*******************************************************/
hintBtn.addEventListener("click", () => {
  if (!hintReady) return;
  giveHint();
  startHintCooldown();
});

function giveHint() {
  const unmatchedCards = [...document.querySelectorAll(".card:not(.matched)")];

  if (unmatchedCards.length < 2) return;

  // pick random card
  const randomCard = unmatchedCards[Math.floor(Math.random() * unmatchedCards.length)];
  const value = randomCard.dataset.value;

  // find its matching pair
  const pairCard = unmatchedCards.find(card => card !== randomCard && card.dataset.value === value);

  if (!pairCard) return;

  hintCount++;
  updateStatus();

  lockBoard = true;

  randomCard.classList.add("flipped");
  pairCard.classList.add("flipped");

  setTimeout(() => {
    if (!randomCard.classList.contains("matched")) randomCard.classList.remove("flipped");
    if (!pairCard.classList.contains("matched")) pairCard.classList.remove("flipped");

    lockBoard = false;
  }, 1200);
}

function startHintCooldown() {
  hintReady = false;
  hintBtn.disabled = true;

  let timeLeft = hintCooldown;
  hintBtn.innerText = `⏳ Hint (${timeLeft}s)`;

  hintTimer = setInterval(() => {
    timeLeft--;
    hintBtn.innerText = `⏳ Hint (${timeLeft}s)`;

    if (timeLeft <= 0) {
      resetHintCooldown();
    }
  }, 1000);
}

function resetHintCooldown() {
  hintReady = true;
  hintBtn.disabled = false;
  hintBtn.innerText = "💡 Hint (Ready)";
  if (hintTimer) clearInterval(hintTimer);
}

/*******************************************************
  PAGE 2: PROPOSAL BUTTON LOGIC
*******************************************************/
const btnYes = document.getElementById("btn-yes");
const btnNo = document.getElementById("btn-no");

let orbitAngle = 0;

function initNoButton() {
  btnNo.addEventListener("mouseenter", moveNoButton);
  btnNo.addEventListener("mouseover", moveNoButton);
  btnNo.addEventListener("touchstart", moveNoButton);
}

function moveNoButton() {
  orbitAngle += Math.random() * 1.3 + 0.7;

  const radiusX = Math.min(250, window.innerWidth / 3);
  const radiusY = Math.min(120, window.innerHeight / 6);

  const x = Math.cos(orbitAngle) * radiusX;
  const y = Math.sin(orbitAngle) * radiusY;

  btnNo.style.transform = `translate(${x}px, ${y}px) rotate(${orbitAngle}rad)`;
}

/*******************************************************
  YES BUTTON CONFETTI + TRANSITION
*******************************************************/
btnYes.addEventListener("click", () => {
  bigConfettiBoom();

  setTimeout(() => {
    showPage("page-love");
    startLoveConfetti();
  }, 1200);
});

function bigConfettiBoom() {
  const duration = 1700;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 14,
      spread: 95,
      origin: { x: 0.5, y: 0.6 },
      colors: ["#ff4d6d", "#ffffff", "#ff8fa3", "#a855f7"]
    });

    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

/*******************************************************
  PAGE 3: CONTINUOUS CONFETTI FALL
*******************************************************/
let loveConfettiInterval;

function startLoveConfetti() {
  if (loveConfettiInterval) clearInterval(loveConfettiInterval);

  loveConfettiInterval = setInterval(() => {
    confetti({
      particleCount: 4,
      spread: 75,
      origin: { x: Math.random(), y: 0 },
      colors: ["#ff4d6d", "#ffffff", "#ff8fa3", "#a855f7"]
    });
  }, 220);
}

/*******************************************************
  START GAME
*******************************************************/
buildGame();
