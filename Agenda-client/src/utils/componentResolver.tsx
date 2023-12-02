import DailyCurriculum from '../components/curriculum/DailyCurriculumDashboardComponent';
import PinnedLectureDashboardComponent from '../components/curriculum/PinnedLectureDashboardComponent';
import { Widget, WidgetType } from './Widget';
import { ComponentsMapper } from './types';
import { UserProfile } from '../components/userProfile/UserProfile';
import NewHelpRequest from '../components/NewHelpRequest/NewHelpRequest';
import Announcement from '../components/curriculum/Announcement';
import QuizGame from '../components/QuizGame/QuizGame';
import Calendar from '../components/Calendar/Calendar';
import { CurriculumProgress } from '../components/cirruculumProgress/CurriculumProgress';
import userData from '../components/userProfile/data/userData.json';


export default function resolveComponent(widget: Widget) {
  const components: ComponentsMapper = {
    [WidgetType.userProfile]: <UserProfile />,
    [WidgetType.helpRequest]: <NewHelpRequest widget={widget} />,
    [WidgetType.lectureOfTheDay]: <DailyCurriculum widget={widget} />,
    [WidgetType.pinnedLecture]: (
      <PinnedLectureDashboardComponent widget={widget} />
    ),
    [WidgetType.announcement]: <Announcement widget={widget} />,
    [WidgetType.quiz]: <QuizGame widget={widget}  />,
    [WidgetType.calendar]: <Calendar widget={widget} />,
    [WidgetType.cirriculumProgress]: (
      <CurriculumProgress progress={userData.userDetails.cirriculumProgress} />
    ),
  };
  return components[widget.type] || null;
}
