import { Layouts } from 'react-grid-layout';
import { Widget } from './types';

const defaultLayouts: Layouts = {
  lg: [
    { i: '1', x: 0, y: 0, h: 2, w: 3, isResizable: false },
    { i: '2', x: 3, y: 0, h: 2, w: 5, isResizable: false },
    { i: '3', x: 8, y: 0, h: 2, w: 3, isResizable: false },
    { i: '4', x: 11, y: 0, h: 2, w: 1, isResizable: false },
  ],
  md: [
    { i: '1', x: 0, y: 0, h: 1, w: 10, isResizable: false },
    { i: '2', x: 5, y: 0, h: 2, w: 5, isResizable: false },
    { i: '3', x: 2, y: 1, h: 2, w: 3, isResizable: false },
    { i: '4', x: 5, y: 1, h: 3, w: 3, isResizable: false },
  ],
  sm: [
    { i: '1', x: 0, y: 0, h: 2, w: 3, isResizable: false },
    { i: '2', x: 3, y: 0, h: 2, w: 5, isResizable: false },
    { i: '3', x: 8, y: 0, h: 2, w: 3, isResizable: false },
    { i: '4', x: 11, y: 0, h: 2, w: 1, isResizable: false },
  ],
  xs: [
    { i: '1', x: 0, y: 0, h: 2, w: 3, isResizable: false },
    { i: '2', x: 3, y: 0, h: 2, w: 5, isResizable: false },
    { i: '3', x: 8, y: 0, h: 2, w: 3, isResizable: false },
    { i: '4', x: 11, y: 0, h: 2, w: 1, isResizable: false },
  ],
  xxs: [
    { i: '1', x: 0, y: 0, h: 2, w: 3, isResizable: false },
    { i: '2', x: 3, y: 0, h: 2, w: 5, isResizable: false },
    { i: '3', x: 8, y: 0, h: 2, w: 3, isResizable: false },
    { i: '4', x: 11, y: 0, h: 2, w: 1, isResizable: false },
  ],
};

const defaultWidgets: Widget[] = [
  { i: '1', type: '1' },
  { i: '2', type: '2' },
  { i: '3', type: '1' },
  { i: '4', type: '3' },
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