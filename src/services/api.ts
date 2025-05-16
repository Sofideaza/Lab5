import { fetchWithCache } from '../utils/cache';
import { Product } from '../types/Product';

export function fetchProducts(): Promise<Product[]> {
  return fetchWithCache('https://fakestoreapi.com/products', 60000);
}
