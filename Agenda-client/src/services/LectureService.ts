import { Widget, WidgetType } from '../utils/Widget';
import curriculumDb from '../components/curriculum/data/curriculumDb';
import layoutDb from '../utils/layoutsDB';

export async function unPinLecture(lectureId: number) {
  const widgetId = await curriculumDb.getWidgetIdByLecture(lectureId);
  if (!widgetId) return;
  await curriculumDb.unPinLecture(lectureId, widgetId);
  await layoutDb.removeWidgetByID(widgetId);
}

export async function pinLecture(lectureId: number) {
  const widget: Widget = new Widget(WidgetType.pinnedLecture);
  await curriculumDb.pinLectureBy(lectureId, widget.id);

  await layoutDb.saveWidget(widget);
}

export async function pinWidget(widgetType: WidgetType, dataId?: string) {
  const widget: Widget = new Widget(widgetType, dataId);
  await layoutDb.saveWidget(widget);
  return widget;
}

export async function unPinWidget(widget: Widget) {
  await layoutDb.removeWidget(widget);
}
