export class UpgradeManager {
    constructor(scoreCallback, updateUI) {
        this.scoreCallback = scoreCallback;
        this.updateUI = updateUI;
        this.upgrades = [];
    }
    addUpgrade(upgrade) {
        this.upgrades.push(upgrade);
    }
    buyUpgrade(index) {
        const u = this.upgrades[index];
        if (this.scoreCallback() >= u.cost) {
            u.owned++;
            u.apply();
            this.updateUI();
        }
    }
}
