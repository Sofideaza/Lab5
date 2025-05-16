import './styles/main.css';
import { ProductList } from './components/ProductList';
import { Cart } from './components/Cart';

const app = document.getElementById('app');

if (app) {
  const container = document.createElement('div');
  container.style.display = 'flex';
  container.style.gap = '2rem';

  container.appendChild(ProductList());
  container.appendChild(Cart());

  app.appendChild(container);
}
