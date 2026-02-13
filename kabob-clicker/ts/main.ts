import { KabobGame } from "./game.js";
import { Upgrade } from "./upgrades.js";

const scoreEl = document.getElementById("score")!;
const upgradesContainer = document.getElementById("upgrades-container")!;
const kabobEl = document.getElementById("kabob")!;
const bodyEl = document.body;

const game = new KabobGame(scoreEl, upgradesContainer);

// Upgrades
const upgrades: Upgrade[] = [
  { name: "Hire Helper", cost: 50, owned: 0, description: "Auto-click +1/sec", apply: () => game.autoClickers++ },
  { name: "Better Grill", cost: 100, owned: 0, description: "+1 per click", apply: () => game.clickValue += 1 },
  { name: "Spicy Skewer", cost: 250, owned: 0, description: "+2 per click", apply: () => game.clickValue += 2 },
  { name: "Rare Ingredients", cost: 500, owned: 0, description: "+5 per click", apply: () => game.clickValue += 5 },
  { name: "Mega Combo", cost: 1000, owned: 0, description: "Double click multiplier", apply: () => game.clickMultiplier *= 2 },
  { name: "Kabob Festival", cost: 2500, owned: 0, description: "Triple auto-clickers", apply: () => game.autoClickers *= 3 },
  { name: "Master Skewer", cost: 5000, owned: 0, description: "+10 per click", apply: () => game.clickValue += 10 },
  { name: "Golden Kabob", cost: 10000, owned: 0, description: "Quadruple click multiplier", apply: () => game.clickMultiplier *= 4 },
];

upgrades.forEach(u => game.addUpgrade(u));

// Helper to create pop-up points
function showPoints(amount: number, x: number, y: number) {
  const point = document.createElement("div");
  point.className = "point";
  point.textContent = `+${amount}`;
  point.style.left = `${x}px`;
  point.style.top = `${y}px`;
  bodyEl.appendChild(point);
  setTimeout(() => point.remove(), 800);
}

// Helper to create flying kabob
function flyKabob(x: number, y: number) {
  const kabob = document.createElement("img");
  kabob.src = "assets/kabob-icon.png";
  kabob.className = "flying-kabob";
  kabob.style.left = `${x}px`;
  kabob.style.top = `${y}px`;
  bodyEl.appendChild(kabob);

  setTimeout(() => {
    kabob.style.transform = `translate(${Math.random()*100-50}px,-150px) rotate(${Math.random()*360}deg)`;
    kabob.style.opacity = "0";
  }, 10);

  setTimeout(() => kabob.remove(), 600);
}

// Click handler
kabobEl.addEventListener("click", (e) => {
  game.click();

  // Coordinates for effects
  const rect = (e.target as HTMLElement).getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top;

  showPoints(game.clickValue * game.clickMultiplier, x, y);
  flyKabob(x - 25, y - 50); // flying kabob from center
});

game.startAutoClicker();
game.render();

// Upgrades click
