import { Product } from '../types/Product';

type State = {
  products: Product[];
  cart: Product[];
};

type Action =
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: Product }
  | { type: 'CLEAR_CART' };

const listeners: (() => void)[] = [];
const state: State = JSON.parse(localStorage.getItem('ecommerce-state') || '{"products": [], "cart": []}');

export function dispatch(action: Action): void {
  switch (action.type) {
    case 'SET_PRODUCTS':
      state.products = action.payload;
      break;
    case 'ADD_TO_CART':
      state.cart.push(action.payload);
      break;
    case 'REMOVE_FROM_CART':
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      break;
    case 'CLEAR_CART':
      state.cart = [];
      break;
  }

  localStorage.setItem('ecommerce-state', JSON.stringify(state));
  listeners.forEach((l) => l());
}

export function subscribe(listener: () => void): void {
  listeners.push(listener);
}

export function getState(): State {
  return state;
}
