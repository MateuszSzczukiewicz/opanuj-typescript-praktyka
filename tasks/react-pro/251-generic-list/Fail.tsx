import { List } from './App';

export const Fail = () => {
  const items = [
    { name: 'Test 1', value: 123 },
    { name: 'Test 2', value: 456 },
  ];
  return <List items={items} renderItem={() => <div>test</div>} />;
};
