import { Layouts } from 'react-grid-layout';
import { Widget, WidgetType } from '../components/widget/Widget';
import {
  AnnouncementWidget,
  CalendarWidget,
  CurriculumProgressWidget,
  HelpRequestWidget,
  LectureOfTheDayWidget,
  QuizWidget,
  StackOverFlowWidget,
  UserProfileWidget,
} from '../components/widget/widgets/Widgets';
import createWidget from '../components/widget/widgets/WidgetFactory';
import { DashboardState } from '../components/Dashboard/Dashboard';

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
    this._dashboardState = {
      layouts: { lg: defaultWidgets.map((widget) => widget.layout) },
      widgets: defaultWidgets,
    };
  }

  public static GetInstance() {
    if (!db.instance) db.instance = new db();

    return db.instance;
  }

  private _dashboardState: DashboardState;

  private currentUser?: string;

  get layouts(): Promise<Layouts> {
    return Promise.resolve(this._dashboardState.layouts);
  }

  get widgets(): Promise<Widget[]> {
    return Promise.resolve(this._dashboardState.widgets);
  }

  saveLayouts(newLayouts: Layouts): Promise<Layouts> {
    this._dashboardState.layouts = newLayouts;
    this.saveToStorage();

    return Promise.resolve(this._dashboardState.layouts);
  }

  saveWidget(widget: Widget): Promise<void> {
    this._dashboardState.widgets.push(widget);
    this._dashboardState.layouts.lg.push(widget.layout);

    this.saveToStorage();
    return Promise.resolve();
  }

  saveToStorage() {
    if (!this.currentUser) return;

    localStorage.setItem(
      `dashboard-${this.currentUser}`,
      JSON.stringify({
        layouts: this._dashboardState.layouts,
        widgets: this._dashboardState.widgets.map((widget) => ({
          id: widget.id,
          dataId: widget.dataId,
          type: widget.type,
        })),
      })
    );
  }

  loadFromStorage() {
    const result = localStorage.getItem(`dashboard-${this.currentUser}`);
    if (!result) return;

    const dashboardStateDTO = JSON.parse(result);
    this._dashboardState = {
      layouts: dashboardStateDTO.layouts,
      widgets: dashboardStateDTO.widgets.map((el: WidgetDTO) =>
        createWidgetFromDto(el)
      ),
    };
  }

  removeWidgetByID(id: string) {
    this._dashboardState.widgets = this._dashboardState.widgets.filter(
      (el) => el.id !== id
    );
    Object.values(this._dashboardState.layouts).forEach(
      (layout) => (layout = layout.filter((el) => el.i !== id))
    );
    this.saveToStorage();
    return Promise.resolve();
  }

  getWidget(id: string): Promise<Widget> {
    return Promise.resolve(
      this._dashboardState.widgets.find((el) => el.id === id)!!
    );
  }

  async widgetExists(widget: Widget) {
    return this._dashboardState.widgets.some((el) => el.id === widget.id);
  }

  async getWidgetByDataId(dataId: string) {
    return this._dashboardState.widgets.find(
      (widget) => widget.dataId === dataId
    );
  }

  removeWidget(widget: Widget): Promise<void> {
    return this.removeWidgetByID(widget.id);
  }

  setUser(userId: string) {
    this.currentUser = userId;
    this.loadFromStorage();
  }

  async getDashboardState(): Promise<DashboardState> {
    return { ...this._dashboardState };
  }
}

export default db.GetInstance();

type WidgetDTO = {
  id: string;
  dataId?: string;
  type: WidgetType;
};

function createWidgetFromDto(widgetDTO: WidgetDTO): Widget {
  const widget = createWidget(widgetDTO.type, widgetDTO.dataId);
  widget.id = widgetDTO.id;
  return widget;
}
