import { Layouts } from 'react-grid-layout';
import { Widget } from './types';

const defaultLayouts: Layouts = {
  lg: [
    { i: '1', x: 3, y: 0, h: 1, w: 1, isResizable: false },
    { i: '2', x: 0, y: 0, h: 2, w: 1, isResizable: false },
    { i: '3', x: 1, y: 0, h: 2, w: 2, isResizable: false },
  ],
};

const defaultWidgets: Widget[] = [
  { i: '1', type: 'login' },
  { i: '2', type: 'helpRequest' },
  { i: '3', type: 'lectureOfTheDay' },
];

class db {
  private _layouts: Layouts;
  private _widgets: Widget[];

  constructor(layouts: Layouts, widgets: Widget[]) {
    this._layouts = layouts;
    this._widgets = widgets;
  }

  get layouts(): Promise<Layouts> {
    return Promise.resolve(this._layouts);
  }

  get widgets(): Promise<Widget[]> {
    return Promise.resolve(this._widgets);
  }

  saveLayouts(newLayouts: Layouts): Promise<Layouts> {
    this._layouts = newLayouts;
    return Promise.resolve(this._layouts);
  }
}

export const dbInstance = new db(defaultLayouts, defaultWidgets);
