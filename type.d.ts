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

