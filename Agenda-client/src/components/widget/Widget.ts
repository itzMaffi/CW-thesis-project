import { ReactNode } from "react";

export abstract class Widget {
  x:number = 0;
  y:number = 0;
  width:number = 1;
  height:number = 1;

  id: string;
  type: WidgetType;
  dataId?: string;

  protected _component:ReactNode;

  constructor(type: WidgetType, dataId?: string) {
    const layoutId: string = crypto.randomUUID();
    this.id = layoutId;
    this.type = type;
    this.dataId = dataId;
  }

  get component() {
    return this._component;
  }

  get layout() {
    return {
      i: this.id,
      x: this.x,
      y: this.y,
      h: this.height,
      w: this.width,
      isResizable: false,
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
