import { Layout } from 'react-grid-layout';

export interface ILayoutWithType extends Layout {
  type: string;
}

export type UserPreferences = {
  [breakpoint: string]: ILayoutWithType[];
};

export type ComponentsMapper = {
  [type: string]: JSX.Element;
};

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}
