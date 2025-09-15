import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchMotivationalQuote = async () => {
  const { data } = await axios.get('https://zenquotes.io/api/random');
  // A API retorna um array, então pegamos o primeiro (e único) item
  return data[0];
};

export const useMotivationalQuote = () => {
  return useQuery({
    queryKey: ['motivationalQuote'],
    queryFn: fetchMotivationalQuote,
  });
};