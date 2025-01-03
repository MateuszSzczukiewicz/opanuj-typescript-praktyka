import { FlexibleContainer } from './App';

const SimpleChildren = () => <FlexibleContainer>Well, hello there!</FlexibleContainer>;

const NestedChildren = () => (
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

export { NestedChildren, SimpleChildren };
