import React, { useCallback, useEffect, useState } from 'react';

import { Index } from 'flexsearch';
import { RouteComponentProps } from 'react-router-dom';

import Highlighter from '../../../components/Highlighter/Highlighter';
import Input from '../../../components/Input/Input';
import { definitions as definitionsMock } from '../../../mock/resources';

import { Container, List, ListItem, Value } from './sDefinitions';

const index = new Index({
  tokenize: 'forward',
});

interface ListItemComponentProps {
  depth: number;
  inSearch: boolean | null;
}

const ListItemComponent: React.FC<ListItemComponentProps> = ({
  depth,
  inSearch,
  children,
}) => {
  const [isExpanded, setExpanded] = useState(false);

  useEffect(() => {
    if (inSearch !== null) setExpanded(inSearch);
  }, [inSearch]);

  return (
    <ListItem
      depth={depth}
      $isExpanded={isExpanded}
      onClick={() => setExpanded((state) => !state)}
    >
      {children}
    </ListItem>
  );
};

const indexTable: string[] = [];

const populateIndex = (prefix: string, current: Record<string, unknown>) => {
  Object.keys(current).forEach((key) => {
    const idx = `${prefix}${key}`;
    indexTable.push(idx);
    index.addAsync(indexTable.length - 1, key);

    if (typeof current[key] === 'string') {
      indexTable.push(`${idx}{.}child`);
      index.addAsync(indexTable.length - 1, current[key] as string);
    } else {
      populateIndex(`${idx}{.}`, current[key] as Record<string, unknown>);
    }
  });
};

const Definitions: React.FC<RouteComponentProps> = () => {
  const [definitions, setDefinitions] = useState<Record<string, unknown>>();
  const [search, setSearch] = useState<string>('');
  const [results, setResults] = useState<string[][]>([]);

  useEffect(() => {
    setDefinitions(definitionsMock);
  }, []);

  useEffect(() => {
    if (definitions) {
      populateIndex('', definitions);
    }
  }, [definitions]);

  useEffect(() => {
    index
      .searchAsync(search)
      .then((results) =>
        setResults(
          results
            .map((index) => indexTable[index as number])
            .map((result) => (result as string).split('{.}'))
        )
      );
  }, [search]);

  const list = useCallback(
    (items: Record<string, unknown>, depth: number) => {
      const resultContains = (value: string) => {
        // prevent closing in the middle of a search
        if (search.length !== 0 && results.length === 0) return null;

        for (let i = 0; i < results.length; i += 1) {
          const result = results[i];
          const resultAtIdx = result[depth];
          if (resultAtIdx && resultAtIdx === value) return true;
        }
        return false;
      };

      const keys = Object.keys(items);
      return (
        <List depth={depth}>
          {keys.map((key) => {
            const value = items[key];
            return (
              <React.Fragment key={key}>
                <ListItemComponent depth={depth} inSearch={resultContains(key)}>
                  <Highlighter text={key} keyword={search} />
                </ListItemComponent>
                {typeof value === 'string' ? (
                  <Value>
                    <Highlighter text={value} keyword={search} />
                  </Value>
                ) : (
                  list(items[key] as Record<string, unknown>, depth + 1)
                )}
              </React.Fragment>
            );
          })}
        </List>
      );
    },
    [search, results]
  );

  return (
    <Container>
      <Input
        inputType="search"
        value={search}
        setValue={setSearch}
        isClearable
      />
      {definitions && list(definitions, 0)}
    </Container>
  );
};

export default Definitions;
