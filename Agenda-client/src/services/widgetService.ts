import { Layouts } from 'react-grid-layout';
import { Widget } from '../components/widget/Widget';
import layoutDb from '../utils/layoutsDB';

export async function pinWidget(widget: Widget, setDashboardState:any) {
  const layouts = await layoutDb.layouts;
  calculateFreePosition(widget, layouts);
  console.log(widget);
  await layoutDb.saveWidget(widget);

  const dashboardState = await layoutDb.getDashboardState();
  setDashboardState(dashboardState);

  return widget;
}

export async function unPinWidget(widget: Widget, setDashboardState:any) {
  await layoutDb.removeWidget(widget);
  
  const dashboardState = await layoutDb.getDashboardState();
  setDashboardState(dashboardState);
}

function calculateFreePosition(widget: Widget, layouts: Layouts) {
  const layout = layouts.lg.slice();
  layout.sort((a, b) => a.y - b.y);

  let boolMap: boolean[][] = Array.from({ length: 4 }, (_) =>
    new Array(10).fill(true)
  );

  layout.forEach((component) => {
    for (let w = 0; w < component.w; w++) {
      for (let h = 0; h < component.h; h++) {
        boolMap[component.x + w][component.y + h] = false;
      }
    }
  });
  let canPlace = true;
  let x = 0;
  let y = 0;

  // traverse the boolMap to check if there is room for the component.
  for (y = 0; y < 10; y++) {
    for (x = 0; x < 4; x++) {
      canPlace = true;
      for (let w = 0; w < widget.width; w++) {
        for (let h = 0; h < widget.height; h++) {
          canPlace &&= x + w < 4 && y + h < 10 && boolMap[x + w][y + h];
        }
      }
      if (canPlace) {
        break;
      }
    }
    if (canPlace) {
      break;
    }
  }

  widget.x = x;
  widget.y = y;
}
