import { WidgetType } from '../Widget';
import {
  AnnouncementWidget,
  CalendarWidget,
  CurriculumProgressWidget,
  HelpRequestWidget,
  LectureOfTheDayWidget,
  PinnedLectureWidget,
  QuizWidget,
  StackOverFlowWidget,
  UserProfileWidget,
} from './Widgets';

export default function createWidget(type: WidgetType, dataId?: string) {
  switch (type) {
    case WidgetType.pinnedLecture:
      return new PinnedLectureWidget(dataId!);
    case WidgetType.curriculumProgress:
      return new CurriculumProgressWidget();
    case WidgetType.userProfile:
      return new UserProfileWidget();
    case WidgetType.lectureOfTheDay:
      return new LectureOfTheDayWidget();
    case WidgetType.quiz:
      return new QuizWidget();
    case WidgetType.stackOverflow:
      return new StackOverFlowWidget();
    case WidgetType.announcement:
      return new AnnouncementWidget();
    case WidgetType.helpRequest:
      return new HelpRequestWidget();
    case WidgetType.calendar:
      return new CalendarWidget();
  }
}
