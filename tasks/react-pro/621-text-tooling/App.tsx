import { useState } from 'react';
import { PencilIcon } from 'lucide-react';
import TextFrame from './TextFrame';
import withBold from './tools/Bold';
import withItalics from './tools/Italic';
import withRainbow from './tools/Rainbow';
import { BaseText } from './tools/BaseText';

export default function App() {
  const [text, setText] = useState('Opanuj TypeScript z Przeprogramowanymi');
  const [styles, setStyles] = useState({
    bold: false,
    italic: false,
    rainbow: false,
  });

  const applyStyles = () => {
    let StyledText = BaseText;

    if (styles.rainbow) {
      StyledText = withRainbow(StyledText);
    }
    if (styles.italic) {
      StyledText = withItalics(StyledText);
    }
    if (styles.bold) {
      StyledText = withBold(StyledText);
    }

    return StyledText;
  };

  const FinalText = applyStyles();

  return (
    <div className="p-4 max-w-2xl mx-auto text-gray-200">
      <h1 className="text-2xl font-bold mb-4 text-blue-400 flex items-center gap-2">
        <PencilIcon className="w-6 h-6" />
        Word Docs Pro+
      </h1>

      <div>
        <div className="space-y-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2 rounded h-32 bg-gray-900 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
            placeholder="Wpisz swój tekst..."
          />

          <div className="flex gap-4 my-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={styles.bold}
                onChange={(e) => setStyles((prev) => ({ ...prev, bold: e.target.checked }))}
              />
              Bold
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={styles.italic}
                onChange={(e) => setStyles((prev) => ({ ...prev, italic: e.target.checked }))}
              />
              Italic
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={styles.rainbow}
                onChange={(e) => setStyles((prev) => ({ ...prev, rainbow: e.target.checked }))}
              />
              Rainbow
            </label>
          </div>

          <TextFrame label="Styled Text">
            <FinalText text={text} />
          </TextFrame>
        </div>
      </div>
    </div>
  );
}
