import { useState } from 'react';

const App = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 ">
      <h1 className="mb-8 text-4xl font-bold text-white">Witaj w module React Pro</h1>
      <p>To jest tylko przykładowy komponent, możesz przejść do pierwszego zadania. Powodzenia!</p>
      <p className="pt-4 mb-6 text-2xl text-blue-400">Current count: {count}</p>
      <button
        onClick={handleIncrement}
        className="px-6 py-2 font-semibold text-white transition duration-200 ease-in-out transform bg-blue-500 rounded-lg hover:bg-blue-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
      >
        Increment
      </button>
    </div>
  );
};

export default App;
