import React from 'react';
import {
  DummyHelpRequest,
  DummyLogin,
  DummyLectureOfTheDay,
} from '../components/Dummies/Dummies';
import { ComponentsMapper } from './types';

export default function resolveComponent(componentType: string) {
  const components: ComponentsMapper = {
    login: <DummyLogin />,
    helpRequest: <DummyHelpRequest />,
    lectureOfTheDay: <DummyLectureOfTheDay />,
  };

  return components[componentType] || null;
}
