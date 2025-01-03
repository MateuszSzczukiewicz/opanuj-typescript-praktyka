import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { QuoteGallery } from './QuoteGallery';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 5,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <QuoteGallery />
    </QueryClientProvider>
  );
}
