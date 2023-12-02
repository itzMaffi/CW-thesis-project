export class Widget {
  id: string;
  type: WidgetType;
  dataId?: string;

  constructor(type: WidgetType, dataId?: string) {
    const layoutId: string = crypto.randomUUID();
    this.id = layoutId;
    this.type = type;
    this.dataId = dataId;
  }
}

export enum WidgetType {
  userProfile,
  helpRequest,
  lectureOfTheDay,
  pinnedLecture,
  announcement,
  quiz,
  calendar,
  cirriculumProgress,
  stackOverflow,
}
