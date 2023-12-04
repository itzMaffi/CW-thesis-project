import { useState, useEffect, useContext } from 'react';
import layoutsDB from '../../utils/layoutsDB';
import GenericPin from '../widget/GenericPin';
import { Widget, WidgetType } from '../widget/Widget';
import { DashboardContext } from '../../App';
import { DashboardState } from '../Dashboard/Dashboard';
import { useLocation } from 'react-router-dom';

export default function Menu() {

  const location = useLocation()
  const isDashboard = location.pathname === '/dashboard';

  const {dashboardState}:{dashboardState:DashboardState} = useContext(DashboardContext);
  const widgets = dashboardState.widgets;
  // const [widgets, setWidgets] = useState<Widget[]>([]);
  const widgetTypes = Object.values(WidgetType);
  const filtered = widgetTypes.filter(
    (wt) => !widgets.some((wid) => wid.type === wt) && wt !== WidgetType.pinnedLecture
  );
  // useEffect(() => {
  //   (async () => {
  //     const results = await layoutsDB.widgets;
  //     setWidgets(results);
  //   })();
  // });

  return (
    <div className="flex flex-col absolute top-[56px] right-0 z-10 w-[200px] h-screen border-l border-cw-orange bg-white">
      <div className="h-[100px] border-2 border-cw-orange rounded-lg">
        logout
      </div>

      {isDashboard && (
        <>
        <h2 className="text-center border-b-2 border-cw-orange">Unused Widgets</h2>
      {filtered.map(
        (w) =>
          (w as WidgetType) && (
            <div className="flex w-full justify-between">
              <h3>{w}</h3>
              <GenericPin widgetType={w as WidgetType}></GenericPin>
            </div>
          )
      )}
      <h2 className="text-center border-b-2 border-cw-orange">Used Widgets</h2>

      {widgets.map((w) => (
        <div className="flex w-full justify-between">
          <h3>{w.type}</h3>
          <GenericPin widget={w}></GenericPin>
        </div>
      ))}
        </>
      )}


    </div>
  );
}
