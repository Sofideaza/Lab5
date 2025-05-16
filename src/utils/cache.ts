import { Product } from '../types/Product';

export async function fetchWithCache(url: string, ttl: number = 60000): Promise<Product[]> {
  const cached = localStorage.getItem(url);
  const timestamp = localStorage.getItem(`${url}:ts`);
  const now = Date.now();

  if (cached && timestamp && now - Number(timestamp) < ttl) {
    fetch(url).then((res) => res.json()).then((data) => {
      localStorage.setItem(url, JSON.stringify(data));
      localStorage.setItem(`${url}:ts`, now.toString());
    });
    return JSON.parse(cached);
  } else {
    const res = await fetch(url);
    const data = await res.json();
    localStorage.setItem(url, JSON.stringify(data));
    localStorage.setItem(`${url}:ts`, now.toString());
    return data;
  }
}
