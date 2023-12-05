import { Layouts } from 'react-grid-layout';
import { Widget } from '../components/widget/Widget';
import { AnnouncementWidget, CalendarWidget, CurriculumProgressWidget, HelpRequestWidget, LectureOfTheDayWidget, QuizWidget, StackOverFlowWidget, UserProfileWidget } from '../components/widget/widgets/Widgets';

const defaultWidgets: Widget[] = [
  new UserProfileWidget(),
  new HelpRequestWidget(),
  new LectureOfTheDayWidget(),
  new AnnouncementWidget(),
  new QuizWidget(),
  new CalendarWidget(),
  new CurriculumProgressWidget(),
  new StackOverFlowWidget(),
];

class db {
  private static instance?: db;

  private constructor() {
    this._layouts = {lg: defaultWidgets.map(widget => widget.layout)};
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
    this._layouts.lg.push(widget.layout);

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
