export interface Id {
  id: string;
}

type Alignment = 'left' | 'center' | 'right';

export type ColumnDefinitionType<T, K extends keyof T> = {
  key: K;
  header: string;
  width?: string;
  isFirstColumn?: boolean;
  isSortable?: boolean;
  format?: (value: T[K]) => T[K];
  customRender?: (id: string, value: T[K]) => React.ReactNode;
  highlightColumn?: boolean;
  align?: Alignment;
};
