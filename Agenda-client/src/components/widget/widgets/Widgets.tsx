import PinnedLectureDashboardComponent from '../../PinnedLecture/PinnedLectureDashboardComponent';
import { CurriculumProgress } from '../../cirruculumProgress/CurriculumProgress';
import { UserProfile } from '../../userProfile/UserProfile';
import { Widget, WidgetType } from '../Widget';
import DailyCurriculum from '../../LectureOfTheDay/DailyCurriculumDashboardComponent';
import QuizGame from '../../QuizGame/QuizGame';
import { StackOverflow } from '../../Stackoverflow/Stackoverflow';
import Announcement from '../../announcements/Announcement';
import NewHelpRequest from '../../NewHelpRequest/NewHelpRequest';
import Calendar from '../../Calendar/Calendar';

export class UserProfileWidget extends Widget {
  constructor() {
    super(WidgetType.userProfile);
    this.height = 1;
    this.width = 1;
    this.x = 3;
    this.y = 0;
    this.canBeUnpinned = false;
    this.name = 'User Profile';
    this._component = <UserProfile />;
  }
}

export class PinnedLectureWidget extends Widget {
  constructor(dataId: string) {
    super(WidgetType.pinnedLecture, dataId);
    this.height = 1;
    this.width = 1;
    this.x = 0;
    this.y = 0;
    this.name = 'Pinned Lecture';
    this._component = <PinnedLectureDashboardComponent widget={this} />;
  }
}

export class CurriculumProgressWidget extends Widget {
  constructor() {
    super(WidgetType.curriculumProgress);
    this.height = 1;
    this.width = 1;
    this.x = 0;
    this.y = 0;
    this.name = 'Curriculum Progress';
    this._component = (
      <CurriculumProgress
        widget={this}
        progress={76}
      />
    );
  }
}

export class LectureOfTheDayWidget extends Widget {
  constructor() {
    super(WidgetType.lectureOfTheDay);
    this.height = 2;
    this.width = 2;
    this.x = 1;
    this.y = 0;
    this.name = 'Lecture of the day';
    this._component = <DailyCurriculum widget={this} />;
  }
}

export class QuizWidget extends Widget {
  constructor() {
    super(WidgetType.quiz);
    this.height = 2;
    this.width = 2;
    this.x = 1;
    this.y = 2;
    this.name = 'Quiz of the day';
    this._component = <QuizGame widget={this} />;
  }
}

export class StackOverFlowWidget extends Widget {
  constructor() {
    super(WidgetType.stackOverflow);
    this.height = 2;
    this.width = 2;
    this.x = 1;
    this.y = 1;
    this.name = 'Stack Overflow';
    this._component = <StackOverflow widget={this} />;
  }
}

export class AnnouncementWidget extends Widget {
  constructor() {
    super(WidgetType.announcement);
    this.height = 2;
    this.width = 1;
    this.x = 0;
    this.y = 2;
    this.name = 'Annoucements';
    this._component = <Announcement widget={this} />;
  }
}

export class HelpRequestWidget extends Widget {
  constructor() {
    super(WidgetType.helpRequest);
    this.height = 2;
    this.width = 1;
    this.x = 0;
    this.y = 1;
    this.name = 'Help Request';
    this._component = <NewHelpRequest widget={this} />;
  }
}

export class CalendarWidget extends Widget {
  constructor() {
    super(WidgetType.calendar);
    this.height = 4;
    this.width = 1;
    this.x = 3;
    this.y = 2;
    this.name = 'Calendar';
    this._component = <Calendar widget={this} />;
  }
}
