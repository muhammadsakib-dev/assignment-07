export interface MarketTickerProduct {
  id: number;
  nameBn: string;
  categoryIcon: string;
  unit: string;
  today: number;
  change: {
    dir: "up" | "down";
    pct: number;
  };
}