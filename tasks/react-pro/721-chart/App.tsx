import frameworks from './frameworks.json';

export default function App() {
  return (
    <ul>
      {frameworks.map((item) => (
        <li>{item.name}</li>
      ))}
    </ul>
  );
}
