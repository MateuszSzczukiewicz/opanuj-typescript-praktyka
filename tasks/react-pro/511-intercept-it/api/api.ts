import axios from 'axios';
import { Product } from '../model/Product';

const productsApi = axios.create({
  baseURL: 'https://dummyjson.com',
});

export async function getProducts(query: string, limit: number = 5, delay: number = 0) {
  const response = await productsApi.get<{ products: Product[] }>('/products/search', {
    params: {
      q: query,
      limit: limit,
      delay: delay,
    },
  });
  return response;
}
