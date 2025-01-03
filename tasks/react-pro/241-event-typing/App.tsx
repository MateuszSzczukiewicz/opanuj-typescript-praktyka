/* Dodaj odpowiednie typy do event handlera, który pozwoli na dynamiczne wnioskowanie typu eventu "onChange" na elemencie <select> */

const App = () => {
  const handleChange = (e) => {
    console.log('Select option changed:', e.currentTarget.value);
  };

  return (
    <div>
      <select onChange={handleChange} className="p-2 text-white bg-blue-500 rounded-md">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </select>
    </div>
  );
};

export default App;
