import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primary_1: string;
      primary_light: string;
      secondary: string;
      secondary_background: string;
      secondary_light: string;
      secondary_dark: string;
      red: string;
      red_dark: string;
      yellow: string;
      gray: string;
      gray_0: string;
      gray_1: string;
      gray_2: string;
      gray_3: string;
      gray_4: string;
      gray_5: string;
      gray_6: string;
      header_background: string;
      table_border: string;
      question_background: string;
    };
  }
}
