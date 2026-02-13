export interface Upgrade {
  name: string;
  cost: number;
  owned: number;
  description: string;
  apply: () => void;
}

export class UpgradeManager {
  upgrades: Upgrade[] = [];

  constructor(private scoreCallback: () => number, private updateUI: () => void) {}

  addUpgrade(upgrade: Upgrade) {
    this.upgrades.push(upgrade);
  }

  buyUpgrade(index: number) {
    const u = this.upgrades[index];
    if (this.scoreCallback() >= u.cost) {
      u.owned++;
      u.apply();
      this.updateUI();
    }
  }
}
