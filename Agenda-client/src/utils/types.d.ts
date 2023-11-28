import { Layout } from 'react-grid-layout';

export interface LayoutWithType extends Layout {
  type: string;
}

export type UserPreferences = {
  [breakpoint: string]: LayoutWithType[];
};

export type Widget = {
  i: string;
  type: string;
};

export type ComponentsMapper = {
  [type: string]: JSX.Element;
};

export default interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  cirriculumProgress: number;
}
