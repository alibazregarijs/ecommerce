interface AuthCredentials {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ProductProps {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
  size: string;
  color: string;
  images: string[];
  rating: number;
  slug: string;
  discountId: number | null;
  discountedPrice: number | null;
  discount?: {
    id: number;
    percentage: number | null;
    startDate: Date | null;
    endDate: Date | null;
    createdAt: Date;
  } | null;
  isDiscountValid?: boolean;
  averageRating?: number | null;
}

export type CartItem = {
  id?: number; // Optional because it's not needed when adding a new item
  cartId?: number; // Optional for newly added items
  productId: number;
  quantity: number;
  quantityInStore: number;
  title?: string; // Optional for newly added items
  size: string;
  product: {
    id: number;
    name: string;
    price: number;
    images: string[];
    description: string;
  };
  userId: number;
  slug: string;
};


