import { DummyLectureOfTheDay } from '../components/Dummies/Dummies';
import { ComponentsMapper } from './types';
import { UserProfile } from '../components/userProfile/UserProfile';
import NewHelpRequest from '../components/NewHelpRequest/NewHelpRequest';

export default function resolveComponent(componentType: string) {
  const components: ComponentsMapper = {
    login: <UserProfile />,
    helpRequest: <NewHelpRequest />,
    lectureOfTheDay: <DummyLectureOfTheDay />,
  };

  return components[componentType] || null;
}
