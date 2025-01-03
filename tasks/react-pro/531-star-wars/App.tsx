import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Starships from './Starships';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Starships />
    </QueryClientProvider>
  );
}
