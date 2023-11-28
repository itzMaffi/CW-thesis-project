import { Layouts } from 'react-grid-layout';
import { Widget, UserPreferences } from './types';

export function generateLayoutsFromUserPreferences(
  preferences: UserPreferences
) {
  const layouts: Layouts = {};

  for (const [breakpoint, layout] of Object.entries(preferences)) {
    layouts[breakpoint] = layout.map((layoutWithType) => {
      const { i, x, y, h, w, isResizable } = layoutWithType;
      return { i, x, y, h, w, isResizable };
    });
  }

  return layouts;
}

export function generateWidgetListFromUserPreferences(
  preferences: UserPreferences
) {
  // The list should be the same no matter the breakpoint
  const widgetList: Widget[] = preferences.lg.map((layoutWithType) => {
    const { i, type } = layoutWithType;
    return { i, type };
  });

  return widgetList;
}
