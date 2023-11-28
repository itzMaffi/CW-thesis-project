import {
  DummyHelpRequest,
  DummyLectureOfTheDay,
} from '../components/Dummies/Dummies';
import { ComponentsMapper } from './types';
import { UserProfile } from '../components/userProfile/UserProfile';

export default function resolveComponent(componentType: string) {
  const components: ComponentsMapper = {
    login: <UserProfile />,
    helpRequest: <DummyHelpRequest />,
    lectureOfTheDay: <DummyLectureOfTheDay />,
  };

  return components[componentType] || null;
}
