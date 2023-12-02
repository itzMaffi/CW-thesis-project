import DailyCurriculum from '../components/curriculum/DailyCurriculumDashboardComponent';
import PinnedLectureDashboardComponent from '../components/curriculum/PinnedLectureDashboardComponent';
import { WidgetType } from './Widget';
import { ComponentsMapper } from './types';
import { UserProfile } from '../components/userProfile/UserProfile';
import NewHelpRequest from '../components/NewHelpRequest/NewHelpRequest';
import Announcement from '../components/curriculum/Announcement';
import QuizGame from '../components/QuizGame/QuizGame';
import Calendar from '../components/Calendar/Calendar';
import { CurriculumProgress } from '../components/cirruculumProgress/CurriculumProgress';
import userData from '../components/userProfile/data/userData.json';

export default function resolveComponent(
  componentType: WidgetType,

  layoutKey: string
) {
  const components: ComponentsMapper = {
    [WidgetType.userProfile]: <UserProfile />,
    [WidgetType.helpRequest]: <NewHelpRequest />,
    [WidgetType.lectureOfTheDay]: <DailyCurriculum />,
    [WidgetType.pinnedLecture]: (
      <PinnedLectureDashboardComponent layoutKey={layoutKey} />
    ),
    [WidgetType.announcement]: <Announcement />,
    [WidgetType.quiz]: <QuizGame />,
    [WidgetType.calendar]: <Calendar />,
    [WidgetType.cirriculumProgress]: (
      <CurriculumProgress progress={userData.userDetails.cirriculumProgress} />
    ),
  };
  return components[componentType] || null;
}
