import { useContext } from 'react';
import GenericPin from '../widget/GenericPin';
import { WidgetType } from '../widget/Widget';
import { DashboardContext } from '../../App';
import { DashboardState } from '../Dashboard/Dashboard';
import { useLocation } from 'react-router-dom';

export default function Menu() {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  const { dashboardState }: { dashboardState: DashboardState } =
    useContext(DashboardContext);
  const widgets = dashboardState.widgets;

  const widgetTypes = Object.values(WidgetType);
  const filtered = widgetTypes.filter(
    (wt) =>
      !widgets.some((wid) => wid.type === wt) && wt !== WidgetType.pinnedLecture
  );

  return (
    <div className="flex flex-col absolute top-[56px] right-0 z-10 w-[200px] h-screen border-l border-cw-orange bg-white">
      <div className="h-[100px] border-2 border-cw-orange rounded-lg">
        logout
      </div>

      {isDashboard && (
        <>
          <h2 className="text-center border-b-2 border-cw-orange">
            Unused Widgets
          </h2>
          {filtered.map(
            (w) =>
              (w as WidgetType) && (
                <div key={w} className="flex w-full justify-between">
                  <h3>{w}</h3>
                  <GenericPin widgetType={w as WidgetType}></GenericPin>
                </div>
              )
          )}
          <h2 className="text-center border-b-2 border-cw-orange">
            Used Widgets
          </h2>

          {widgets.map((w) => (
            <div key={w.id} className="flex w-full justify-between">
              <h3>{w.type}</h3>
              <GenericPin widget={w}></GenericPin>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
