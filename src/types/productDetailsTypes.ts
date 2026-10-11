export interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface ProductDetails {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  image: string;
  unit: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: string;
    pct: number;
  };
  markets: Market[];
}

export interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}