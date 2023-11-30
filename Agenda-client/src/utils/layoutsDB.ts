import { Layouts } from 'react-grid-layout';
import { Widget, WidgetType } from './Widget';

const defaultLayouts: Layouts = {
  lg: [
    { i: '1', x: 3, y: 0, h: 1, w: 1, isResizable: false },
    { i: '2', x: 0, y: 0, h: 2, w: 1, isResizable: false },
    { i: '3', x: 1, y: 0, h: 2, w: 2, isResizable: false },
    { i: '4', x: 0, y: 2, h: 2, w: 1, isResizable: false },
    { i: '5', x: 1, y: 2, h: 2, w: 2, isResizable: false },
  ],
};

const defaultWidgets: Widget[] = [
  { i: '1', type: WidgetType.login },
  { i: '2', type: WidgetType.helpRequest },
  { i: '3', type: WidgetType.lectureOfTheDay },
  { i: '4', type: WidgetType.announcement },
  { i: '5', type: WidgetType.quiz },
];

class db {
  private static instance?: db;

  private constructor() {
    this._layouts = defaultLayouts;
    this._widgets = defaultWidgets;
  }

  public static GetInstance() {
    if (!db.instance) db.instance = new db();

    return db.instance;
  }

  private _layouts: Layouts;
  private _widgets: Widget[];
  private updateDashboard?: () => void;

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

  saveWidget(widget: Widget): Promise<void> {
    this._widgets.push(widget);
    this._layouts.lg.push({
      i: widget.i,
      x: 0,
      y: Infinity,
      h: 1,
      w: 1,
      isResizable: false,
    });

    this.updateDashboard && this.updateDashboard();
    return Promise.resolve();
  }

  setWidgetCallback(updateDashboard: () => void) {
    this.updateDashboard = updateDashboard;
  }
}

export default db.GetInstance();
