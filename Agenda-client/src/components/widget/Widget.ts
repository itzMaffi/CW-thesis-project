export class Widget {
  x:number = 0;
  y:number = 0;
  width:number = 1;
  height:number = 1;

  id: string;
  type: WidgetType;
  dataId?: string;

  constructor(type: WidgetType, dataId?: string) {
    const layoutId: string = crypto.randomUUID();
    this.id = layoutId;
    this.type = type;
    this.dataId = dataId;

    switch(type){
      case WidgetType.pinnedLecture:
      case WidgetType.curriculumProgress:
      case WidgetType.userProfile:
        this.height = 1;
        this.width = 1;
        break;
      case WidgetType.lectureOfTheDay:
      case WidgetType.quiz:
      case WidgetType.stackOverflow:
        this.height = 2;
        this.width = 2;
        break;
      case WidgetType.announcement:
      case WidgetType.helpRequest:
        this.height = 2;
        this.width = 1;
        break;
      case WidgetType.calendar:
        this.height = 4;
        this.width = 1;
        break;
    }
  }
}

export enum WidgetType {
  userProfile = "userProfile",
  helpRequest = "helpRequest",
  lectureOfTheDay = 'lectureOfTheDay',
  pinnedLecture = 'pinnedLecture',
  announcement = 'announcement',
  quiz = 'quiz',
  calendar = 'calendar',
  curriculumProgress = 'cirriculumProgress',
  stackOverflow = 'stackOverflow',
}
