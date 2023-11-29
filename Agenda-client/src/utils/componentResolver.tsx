import DailyCurriculum from '../components/curriculum/DailyCurriculumDashboardComponent';
import PinnedLectureDashboardComponent from '../components/curriculum/PinnedLectureDashboardComponent';
import { WidgetType } from './Widget';
import { ComponentsMapper } from './types';
import { UserProfile } from '../components/userProfile/UserProfile';
import NewHelpRequest from '../components/NewHelpRequest/NewHelpRequest';
import Announcement from '../components/curriculum/Announcement';
export default function resolveComponent(
  componentType: WidgetType,

  layoutKey: string
) {
  const components: ComponentsMapper = {
    [WidgetType.login]: <UserProfile />,
    [WidgetType.helpRequest]: <NewHelpRequest />,
    [WidgetType.lectureOfTheDay]: <DailyCurriculum />,
    [WidgetType.pinnedLecture]: (
      <PinnedLectureDashboardComponent layoutKey={layoutKey} />
    ),
    [WidgetType.announcement]: <Announcement />,
  };
  return components[componentType] || null;
}
