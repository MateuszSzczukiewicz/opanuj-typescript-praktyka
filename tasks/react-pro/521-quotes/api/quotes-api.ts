import axios from 'axios';
import { QuotesResponse } from '../model/QuotesResponse';

export const getQuotes = async (page: number, limit: number): Promise<QuotesResponse> => {
  const response = await axios.get<QuotesResponse>(
    `https://dummyjson.com/quotes?limit=${limit.toString()}&skip=${(page * limit).toString()}`,
  );
  return response.data;
};
