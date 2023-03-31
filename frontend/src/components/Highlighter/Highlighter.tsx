import React, { useMemo } from 'react';

import { regexEscape } from '../../utils/string';

interface HighlighterProps {
  text: string;
  keyword: string;
}

// Wraps instances of 'keyword' in 'text' in a span with the class 'Highlighter_keyword'
const Highlighter: React.FC<HighlighterProps> = ({ text, keyword }) => {
  const highlighted = useMemo(() => {
    if (keyword === '') return text;

    let textIdx = 0;
    const parts = text.split(new RegExp(regexEscape(keyword), 'ig'));
    return parts.map((part, idx) => {
      textIdx += part.length;

      const result = (
        <React.Fragment key={idx}>
          <span>{part}</span>
          {idx !== parts.length - 1 && (
            <span className="Highlighter_keyword">
              {text.slice(textIdx, textIdx + keyword.length)}
            </span>
          )}
        </React.Fragment>
      );

      textIdx += keyword.length;
      return result;
    });
  }, [text, keyword]);

  return <span className="Highlighter">{highlighted}</span>;
};

export default Highlighter;
