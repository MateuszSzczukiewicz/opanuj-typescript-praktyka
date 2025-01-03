import { AlertCircle, ChevronLeft, ChevronRight, Loader, Rocket } from 'lucide-react';
import { StarshipCard } from './StarshipCard';
import { useState } from 'react';

export default function Starships() {
  const [page, setPage] = useState(1);
  const [data] = useState(null);
  const [isLoading] = useState(false);
  const [isError] = useState(false);

  if (isLoading) {
    return (
      <div
        data-testid="loading-state"
        className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center"
      >
        <Loader className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        <AlertCircle className="w-8 h-8 text-red-500 mr-2" />
        <span>Failed to load starships</span>
      </div>
    );
  }

  const starships = data?.data.results || [];
  const hasNextPage = !!data?.data.next;
  const hasPrevPage = !!data?.data.previous;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center">
        <Rocket className="w-8 h-8 mr-2 text-blue-500" />
        Star Wars Starships
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {starships.map((ship) => (
          <StarshipCard key={ship.url} ship={ship} />
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={() => setPage(page - 1)}
          data-testid="previous-button"
          disabled={!hasPrevPage}
          className="flex items-center px-4 py-2 bg-blue-500 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed min-w-48"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={!hasNextPage}
          data-testid="next-button"
          className="flex items-center px-4 py-2 bg-blue-500 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed min-w-48"
        >
          Next
          <ChevronRight className="w-5 h-5 ml-1" />
        </button>
      </div>
    </div>
  );
}
