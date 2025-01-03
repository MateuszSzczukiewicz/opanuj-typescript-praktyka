/* Wykorzystaj przeciążenia funkcji w hooku usePersistedState, aby obsłużyć dwa przypadki:
1. Z parametrami key i initial
2. Z samym parametrem key
*/

import { useState } from 'react';
import { usePersistedState } from './use-persisted-state';

const App = () => {
  const [key, setKey] = useState('');
  const [inputValue, setKeyValue] = useState('');
  const [currentKey, setCurrentKey] = useState<string | null>(null);
  const [persistedValue, setPersistedValue] = usePersistedState(currentKey || 'default-key');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentKey(key);
    setPersistedValue(inputValue);
  };

  return (
    <div className="max-w-md p-4 mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="key" className="block text-sm font-medium text-white">
            Storage Key
          </label>
          <input
            type="text"
            id="key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="block w-full mt-1 text-black border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="value" className="block text-sm font-medium text-white">
            Value to Store
          </label>
          <input
            type="text"
            id="value"
            value={inputValue}
            onChange={(e) => setKeyValue(e.target.value)}
            className="block w-full mt-1 text-black border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Save to Storage
          </button>
          <button
            type="button"
            onClick={() => setCurrentKey(key)}
            className="flex-1 px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
          >
            Check Storage
          </button>
        </div>
      </form>

      {currentKey && (
        <div className="p-4 mt-8 border rounded-md">
          <h2 className="mb-2 text-lg font-semibold">Stored Value</h2>
          <p>
            <span className="font-medium">Key:</span> {currentKey}
          </p>
          <p>
            <span className="font-medium">Value:</span> {persistedValue}
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
