import { DummyOne, DummyTwo, DummyThree } from '../components/Dummies/Dummies';
import { ComponentsMapper } from './types';


export default function resolveComponent(componentType: string) {
  const components: ComponentsMapper = {
    '1': <DummyOne />,
    '2': <DummyTwo />,
    '3': <DummyThree />
  };

  return components[componentType] || null;
}
