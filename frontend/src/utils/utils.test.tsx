import { useTranslation } from 'react-i18next';

import { arrayToObjectBy, resolvePath, sortBy } from './object';
import {
  capitalize,
  formatDate,
  formatDateTime,
  formatDayMonth,
} from './string';

describe('object', () => {
  test('resolvePath: resolves correct path', () => {
    const object = {
      a: { b: [{ c: 'result' }] },
    };
    expect(resolvePath(object, 'a.b[0].c')).toEqual('result');
  });

  test('resolvePath: resolves correct index', () => {
    const object = {
      a: { b: [{ c: 'incorrect' }, { c: 'correct' }] },
    };
    expect(resolvePath(object, 'a.b[1].c')).toEqual('correct');
  });

  test("resolvePath: resolves incorrect path to 'undefined'", () => {
    const object = {
      a: { b: [{ c: 'result' }] },
    };
    expect(resolvePath(object, 'a.b[0].d')).toEqual(undefined);
  });

  test("resolvePath: resolves incorrect index to 'undefined'", () => {
    const object = {
      a: { b: [{ c: 'result' }] },
    };
    expect(resolvePath(object, 'a.b[1].c')).toEqual(undefined);
  });

  test('arrayToMapBy', () => {
    const arr = [
      { key: 'foo', val: 'bar' },
      { key: 'hello', val: 'world' },
      { key: 1234, name: 'aoeu', abcd: 'efgh' },
    ];
    expect(arrayToObjectBy(arr, 'key')).toEqual({
      foo: { key: 'foo', val: 'bar' },
      hello: { key: 'hello', val: 'world' },
      '1234': { key: 1234, name: 'aoeu', abcd: 'efgh' },
    });
  });

  test('sortBy', () => {
    const arr = [
      { key: 'foo', val: 'bar' },
      { key: 'hello', val: 'world' },
      { key: 'abcd', val: 'z' },
      { key: 1234, name: 'aoeu', abcd: 'efgh' },
    ];
    expect(sortBy(arr, 'key')).toEqual([
      { key: 1234, name: 'aoeu', abcd: 'efgh' },
      { key: 'abcd', val: 'z' },
      { key: 'foo', val: 'bar' },
      { key: 'hello', val: 'world' },
    ]);
    expect(sortBy(arr, 'val')).toEqual([
      { key: 'foo', val: 'bar' },
      { key: 'hello', val: 'world' },
      { key: 'abcd', val: 'z' },
      { key: 1234, name: 'aoeu', abcd: 'efgh' },
    ]);
  });
});

describe('string', () => {
  test('capitalize', () => {
    expect(capitalize('this')).toEqual('This');
    expect(capitalize('this and that')).toEqual('This And That');
    expect(capitalize('')).toEqual('');
  });

  test('formatDate', () => {
    const { t } = useTranslation();
    expect(formatDate(t, '2021-12-03')).toEqual('3 common:months.dec 2021');
    expect(formatDate(t, new Date('2021-12-03'))).toEqual(
      '3 common:months.dec 2021'
    );

    expect(formatDate(t)).toEqual('-');
    expect(formatDate(t, '')).toEqual('-');
  });

  test('formatDayMonth', () => {
    const { t } = useTranslation();
    expect(formatDayMonth(t, new Date('2021-5-1'))).toEqual(
      '1 common:months.may'
    );
    expect(formatDayMonth(t, new Date('2021-9-15'))).toEqual(
      '15 common:months.sep'
    );
  });

  test('formatDateTime', () => {
    const { t } = useTranslation();
    expect(formatDateTime(t, new Date('2000-6-20 10:00'))).toEqual(
      '20 common:months.jun 2000 - 10:00 AM'
    );
    expect(formatDateTime(t, new Date('2021-1-1 16:30'))).toEqual(
      '1 common:months.jan 2021 - 4:30 PM'
    );
  });
});
