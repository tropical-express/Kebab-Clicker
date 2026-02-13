import { UpgradeManager, Upgrade } from "./upgrades.js";

export class KabobGame {
  score = 0;
  clickValue = 1;
  clickMultiplier = 1;
  autoClickers = 0;

  upgradeManager: UpgradeManager;

  constructor(private scoreElement: HTMLElement, private upgradesContainer: HTMLElement) {
    this.upgradeManager = new UpgradeManager(
      () => this.score,
      () => this.render()
    );
  }

  click() {
    this.score += this.clickValue * this.clickMultiplier;
    this.render();
  }

  addUpgrade(upgrade: Upgrade) {
    this.upgradeManager.addUpgrade(upgrade);
  }

  buyUpgrade(index: number) {
    this.upgradeManager.buyUpgrade(index);
  }

  startAutoClicker() {
    setInterval(() => {
      if (this.autoClickers > 0) {
        this.score += this.autoClickers * this.clickMultiplier;
        this.render();
      }
    }, 1000);
  }

  render() {
    this.scoreElement.textContent = `Kabobs: ${this.score}`;
    this.upgradesContainer.innerHTML = "";
    this.upgradeManager.upgrades.forEach((u, i) => {
      const btn = document.createElement("button");
      btn.className = "upgrade";
      btn.textContent = `${u.name} – Cost: ${u.cost} – Owned: ${u.owned}`;
      btn.title = u.description;
      btn.addEventListener("click", () => this.buyUpgrade(i));
      this.upgradesContainer.appendChild(btn);
    });
  }
}
