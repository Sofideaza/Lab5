import { fetchProducts } from '../services/api';
import { dispatch, subscribe, getState } from '../flux/dispatcher';
import { ProductCard } from './ProductCard';
import { Product } from '../types/Product';

export function ProductList(): HTMLElement {
  const container = document.createElement('div');
  container.className = 'product-list';

  subscribe(() => {
    const { products } = getState();
    container.innerHTML = '';
    products.forEach((p: Product) => {
      container.appendChild(ProductCard(p));
    });
  });

  fetchProducts().then((data: Product[]) => dispatch({ type: 'SET_PRODUCTS', payload: data }));
  return container;
}
