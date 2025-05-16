import { dispatch } from '../flux/dispatcher';
import { Product } from '../types/Product';

export function ProductCard(product: Product): HTMLElement {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.innerHTML = `
    <img src="${product.image}" width="100" />
    <h3>${product.title}</h3>
    <p>${product.description}</p>
    <strong>$${product.price}</strong>
    <button>Add to cart</button>
  `;

  card.querySelector('button')!.addEventListener('click', () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  });

  return card;
}