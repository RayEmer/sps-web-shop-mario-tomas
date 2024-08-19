import { Product } from './product.model';

export interface Carrito {
    id: number;
    userId: number;
    date: string;
    products: Product[];
}