export class Widget {
  i: string;
  type: WidgetType;

  constructor(type: WidgetType) {
    const layoutId: string = crypto.randomUUID();
    this.i = layoutId;
    this.type = type;
  }
}

export enum WidgetType {
  login,
  helpRequest,
  lectureOfTheDay,
  pinnedLecture,
  announcement,
  quiz,
}
