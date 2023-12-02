import DailyCurriculum from '../components/LectureOfTheDay/DailyCurriculumDashboardComponent';
import PinnedLectureDashboardComponent from '../components/PinnedLecture/PinnedLectureDashboardComponent';
import { Widget, WidgetType } from '../components/widget/Widget';
import { ComponentsMapper } from './types';
import { UserProfile } from '../components/userProfile/UserProfile';
import NewHelpRequest from '../components/NewHelpRequest/NewHelpRequest';
import Announcement from '../components/announcements/Announcement';
import QuizGame from '../components/QuizGame/QuizGame';
import Calendar from '../components/Calendar/Calendar';
import { CurriculumProgress } from '../components/cirruculumProgress/CurriculumProgress';
import userData from '../components/userProfile/data/userData.json';
import { StackOverflow } from '../components/Stackoverflow/Stackoverflow';

export default function resolveComponent(widget: Widget) {
  const components: ComponentsMapper = {
    [WidgetType.userProfile]: <UserProfile />,
    [WidgetType.helpRequest]: <NewHelpRequest />,
    [WidgetType.stackOverflow]: <StackOverflow />,
    [WidgetType.lectureOfTheDay]: <DailyCurriculum />,
    [WidgetType.pinnedLecture]: (
      <PinnedLectureDashboardComponent widget={widget} />
    ),
    [WidgetType.announcement]: <Announcement widget={widget} />,
    [WidgetType.quiz]: <QuizGame widget={widget} />,
    [WidgetType.calendar]: <Calendar widget={widget} />,
    [WidgetType.cirriculumProgress]: (
      <CurriculumProgress progress={userData.userDetails.cirriculumProgress} />
    ),
  };
  return components[widget.type] || null;
}
