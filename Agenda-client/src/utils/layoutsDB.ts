import { Layouts } from 'react-grid-layout';
import { Widget, WidgetType } from '../components/widget/Widget';

const defaultLayouts: Layouts = {
  lg: [
    { i: '1', x: 3, y: 0, h: 1, w: 1, isResizable: false },
    { i: '2', x: 0, y: 0, h: 2, w: 1, isResizable: false },
    { i: '3', x: 1, y: 0, h: 2, w: 2, isResizable: false },
    { i: '4', x: 0, y: 2, h: 2, w: 1, isResizable: false },
    { i: '5', x: 1, y: 2, h: 2, w: 2, isResizable: false },
    { i: '6', x: 3, y: 1, h: 4, w: 1, isResizable: false },
    { i: '7', x: 0, y: 1, h: 1, w: 1, isResizable: false },
    { i: '8', x: 1, y: 1, h: 2, w: 2, isResizable: false },
  ],
};

const defaultWidgets: Widget[] = [
  { id: '1', type: WidgetType.userProfile },
  { id: '2', type: WidgetType.helpRequest },
  { id: '3', type: WidgetType.lectureOfTheDay },
  { id: '4', type: WidgetType.announcement },
  { id: '5', type: WidgetType.quiz },
  { id: '6', type: WidgetType.calendar },
  { id: '7', type: WidgetType.cirriculumProgress },
  { id: '8', type: WidgetType.stackOverflow },
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
      i: widget.id,
      x: 0,
      y: Infinity,
      h: 1,
      w: 1,
      isResizable: false,
    });

    this.updateDashboard && this.updateDashboard();
    return Promise.resolve();
  }

  removeWidgetByID(id: string) {
    this._widgets = this._widgets.filter(el => el.id !== id);
    Object.values(this._layouts).forEach(layout => (layout = layout.filter(el => el.i !== id)));
    this.updateDashboard && this.updateDashboard();
    return Promise.resolve();
  }

  setWidgetCallback(updateDashboard: () => void) {
    this.updateDashboard = updateDashboard;
  }

  getWidget(id: string): Promise<Widget> {
    return Promise.resolve(this._widgets.find(el => el.id === id)!!);
  }

  async getWidgetByDataId(dataId: string) {
    return this._widgets.find(widget => widget.dataId === dataId);
  }

  removeWidget(widget: Widget): Promise<void> {
    return this.removeWidgetByID(widget.id);
  }
}

export default db.GetInstance();
