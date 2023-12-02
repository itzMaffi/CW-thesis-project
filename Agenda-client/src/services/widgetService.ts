import { Widget, WidgetType } from '../components/widget/Widget';
import layoutDb from '../utils/layoutsDB';

export async function pinWidget(widgetType: WidgetType, dataId?: string) {
  const widget: Widget = new Widget(widgetType, dataId);
  await layoutDb.saveWidget(widget);
  return widget;
}

export async function unPinWidget(widget: Widget) {
  await layoutDb.removeWidget(widget);
}
