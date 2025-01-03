import { TripleContainer } from './App';

const FailTwoChildren = () => (
  <TripleContainer>
    <li>First</li>
    <li>Second</li>
  </TripleContainer>
);

const FailFourChildren = () => (
  <TripleContainer>
    <li>First</li>
    <li>Second</li>
    <li>Third</li>
    <li>Fourth</li>
  </TripleContainer>
);

export { FailFourChildren, FailTwoChildren };
