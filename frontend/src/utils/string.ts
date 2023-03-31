import { TFunction } from 'i18next';

export const capitalize = (phrase: string): string => {
  return phrase
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const months = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
];

export const formatDate = (t: TFunction, date?: Date | string): string => {
  if (date === undefined || date === '') return '-';
  if (typeof date === 'string') date = new Date(date);
  return `${date.getDate()} ${t(
    `common:months.${months[date.getMonth()]}`
  )} ${date.getFullYear()}`;
};

export const formatDayMonth = (t: TFunction, date: Date): string => {
  return `${date.getDate()} ${t(`common:months.${months[date.getMonth()]}`)}`;
};

export const formatDateTime = (t: TFunction, date: Date): string => {
  return `${formatDate(t, date)} - ${date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })}`;
};

export const formatDateRange = (
  t: TFunction,
  start?: Date | string,
  end?: Date | string
): string => {
  return `${formatDate(t, start)} - ${formatDate(t, end)}`;
};

export const regexEscape = (v: string): string =>
  v.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

// wrapps all occurences of 'keyword' in 'v' with the string 'wrapper'
export const wrapKeywords = (
  v: string,
  keyword: string,
  wrapper: string
): string => {
  if (keyword === '') return v;

  let textIdx = 0;
  const parts = v.split(new RegExp(regexEscape(keyword), 'ig'));
  return parts
    .map((part, idx) => {
      textIdx += part.length;

      let result;
      if (idx !== parts.length - 1) {
        result = `${part}${wrapper}${v.slice(
          textIdx,
          textIdx + keyword.length
        )}${wrapper}`;
      } else {
        result = part;
      }

      textIdx += keyword.length;
      return result;
    })
    .join('');
};
