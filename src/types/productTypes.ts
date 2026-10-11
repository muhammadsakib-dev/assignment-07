export interface Product {
  id: number;
  nameBn: string;
  image: string;
  unit: string;
  today: number;
  change: {
    dir: string;
    pct: number;
  };
}

export interface ProductCardProps {
  product: Product;
}