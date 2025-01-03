/* Za pomocą typowania zablokuj możliwość przypisania dodatkowej właściwości w setState */

import { useState } from 'react';

interface Tag {
  id: number;
  value: string;
}

interface TagState {
  tagSelected: number | null;
  tags: Tag[];
}

const TagManager = () => {
  const [state, setState] = useState<TagState>({ tagSelected: null, tags: [] });

  const addTag = (tag: Tag) => {
    setState((prevState) => ({
      ...prevState,
      tags: [...prevState.tags, tag],
      extraProp: 'Nieprawidłowa właściwość', // Nadmiarowa właściwość
    }));
  };

  return (
    <div className="p-4">
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter new tag"
            className="px-3 py-1 text-black border rounded"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.currentTarget.value) {
                addTag({
                  id: state.tags.length + 1,
                  value: e.currentTarget.value,
                });
                e.currentTarget.value = '';
              }
            }}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {state.tags.map((tag) => (
            <div
              key={tag.id}
              className={`
              px-3 py-1 rounded-full text-sm
              ${
                tag.id === state.tagSelected
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }
              hover:bg-blue-600 hover:text-white
              cursor-pointer transition-colors
            `}
              onClick={() => setState((prev) => ({ ...prev, tagSelected: tag.id }))}
            >
              {tag.value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagManager;
