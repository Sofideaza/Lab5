import { getState, dispatch, subscribe } from '../flux/dispatcher';
import { Product } from '../types/Product';

export function Cart(): HTMLElement {
  const container = document.createElement('div');
  container.className = 'cart';

  const title = document.createElement('h2');
  title.textContent = '🛒 Carrito de Compras';
  container.appendChild(title);

  const list = document.createElement('ul');
  container.appendChild(list);

  const total = document.createElement('p');
  container.appendChild(total);

  const checkoutBtn = document.createElement('button');
  checkoutBtn.textContent = 'Finalizar Compra';
  checkoutBtn.style.marginTop = '1rem';
  container.appendChild(checkoutBtn);

  const msg = document.createElement('p');
  msg.style.color = 'green';
  msg.style.fontWeight = 'bold';
  container.appendChild(msg);

  function renderCart() {
    const { cart } = getState();
    list.innerHTML = '';
    msg.textContent = '';

    let sum = 0;

    cart.forEach((item: Product) => {
      const li = document.createElement('li');
      li.innerHTML = `
        ${item.title} - $${item.price}
        <button>Eliminar</button>
      `;
      list.appendChild(li);

      li.querySelector('button')?.addEventListener('click', () => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: item });
      });

      sum += item.price;
    });

    total.textContent = `Total: $${sum.toFixed(2)}`;
    checkoutBtn.disabled = cart.length === 0;
  }

  checkoutBtn.addEventListener('click', () => {
    dispatch({ type: 'CLEAR_CART' });
    msg.textContent = '✅ ¡Gracias por tu compra!';
  });

  subscribe(renderCart);
  renderCart();

  return container;
}
