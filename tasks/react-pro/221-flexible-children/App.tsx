/*
  Dodaj typowanie propsa children dla FlexibleContainer, które pozwoli na przekazanie dowolnego dziecka (komponent(y), element(y), tekst itd.)
*/

const FlexibleContainer = ({ children }) => <ul className="list-disc">{children}</ul>;

const App = () => (
  <FlexibleContainer>
    <li>First</li>
    <li>
      Second contains subitems
      <ul>
        <li>Subitem 1</li>
        <li>Subitem 2</li>
      </ul>
    </li>
    <li>Third</li>
  </FlexibleContainer>
);

export default App;

export { FlexibleContainer };
