import { Widget, WidgetType } from "../../utils/Widget";
import curriculumDb from './data/curriculumDb';
import layoutDb from '../../utils/layoutsDB';

export default async function pinLecture(lectureId:number){
  const widget:Widget = new Widget(WidgetType.pinnedLecture);
  await curriculumDb.pinLectureBy(lectureId, widget.i);
  
  await layoutDb.saveWidget(widget);
}