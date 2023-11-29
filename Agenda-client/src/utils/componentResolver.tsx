import {
<<<<<<< HEAD
  DummyHelpRequest,
  DummyLectureOfTheDay,
} from '../components/Dummies/Dummies';
import { ComponentsMapper } from './types';
import { UserProfile } from '../components/userProfile/UserProfile';

export default function resolveComponent(componentType: string) {
  const components: ComponentsMapper = {
    login: <UserProfile />,
    helpRequest: <DummyHelpRequest />,
=======
  DummyLogin,
  DummyLectureOfTheDay,
} from '../components/Dummies/Dummies';
import { ComponentsMapper } from './types';
import NewHelpRequest from '../components/NewHelpRequest/NewHelpRequest';

export default function resolveComponent(componentType: string) {
  const components: ComponentsMapper = {
    login: <DummyLogin />,
    helpRequest: <NewHelpRequest />,
>>>>>>> ac3df35 (working progress on help request)
    lectureOfTheDay: <DummyLectureOfTheDay />,
  };

  return components[componentType] || null;
}
