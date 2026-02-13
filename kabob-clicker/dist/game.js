import { UpgradeManager } from "./upgrades.js";
export class KabobGame {
    constructor(scoreElement, upgradesContainer) {
        this.scoreElement = scoreElement;
        this.upgradesContainer = upgradesContainer;
        this.score = 0;
        this.clickValue = 1;
        this.clickMultiplier = 1;
        this.autoClickers = 0;
        this.upgradeManager = new UpgradeManager(() => this.score, () => this.render());
    }
    click() {
        this.score += this.clickValue * this.clickMultiplier;
        this.render();
    }
    addUpgrade(upgrade) {
        this.upgradeManager.addUpgrade(upgrade);
    }
    buyUpgrade(index) {
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
