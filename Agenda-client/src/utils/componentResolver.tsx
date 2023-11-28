import DailyCurriculum from '../components/curriculum/DailyCurriculumDashboardComponent';
import PinnedLectureDashboardComponent from '../components/curriculum/PinnedLectureDashboardComponent';
import { WidgetType } from './Widget';
import { ComponentsMapper } from './types';
import { UserProfile } from '../components/userProfile/UserProfile';
import NewHelpRequest from '../components/NewHelpRequest/NewHelpRequest';


export default function resolveComponent(componentType: WidgetType, layoutKey:string) {
  const components: ComponentsMapper = {
    [WidgetType.login]: <UserProfile />,
    [WidgetType.helpRequest]: <NewHelpRequest />,
    [WidgetType.lectureOfTheDay]: <DailyCurriculum />,
    [WidgetType.pinnedLecture]:<PinnedLectureDashboardComponent layoutKey={layoutKey} />
  };

  return components[componentType] || null;
}
