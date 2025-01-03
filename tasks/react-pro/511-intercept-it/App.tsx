import { useState } from 'react';
import { getProducts } from './api/api';
import { Product } from './model/Product';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('phone');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (withDelay: boolean = false) => {
    setIsLoading(true);

    const {
      data: { products },
    } = await getProducts(searchQuery, 5, withDelay ? 5000 : 0);

    setSearchResults(products);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search products..."
        className="px-4 py-2 border rounded text-black"
      />
      <div className="flex flex-row gap-4">
        <button
          // onClick={() => handleSearch()}
          data-testid="search-button-new"
          className="px-4 py-2 text-white bg-teal-500 rounded hover:bg-teal-600 font-bold min-w-64"
        >
          Search (NEW)
        </button>
        <button
          // onClick={() => handleSearch(true)}
          data-testid="search-button-legacy"
          className="px-4 py-2 text-white bg-sky-500 rounded hover:bg-sky-600 font-bold min-w-64"
        >
          Search (Legacy)
        </button>
      </div>
      {isLoading ? (
        <span data-testid="loading-message">Loading...</span>
      ) : (
        <div className="flex flex-col gap-4">
          {searchResults.map((product) => (
            <div key={product.id} className="flex flex-col gap-2">
              <h3 className="text-lg font-bold">{product.title}</h3>
              <p className="text-sm text-sky-200">{product.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
