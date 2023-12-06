import { ReactNode, useContext } from 'react';
import GenericPin from '../widget/GenericPin';
import { Widget, WidgetType } from '../widget/Widget';
import { DashboardContext } from '../../App';
import { DashboardState } from '../Dashboard/Dashboard';
import { Link, useLocation } from 'react-router-dom';
import createWidget from '../widget/widgets/WidgetFactory';

export default function Menu() {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  const { dashboardState }: { dashboardState: DashboardState } =
    useContext(DashboardContext);
  const widgets = dashboardState.widgets;

  const widgetTypes = Object.values(WidgetType);
  const filtered = widgetTypes
    .filter(
      (wt) =>
        !widgets.some((wid) => wid.type === wt) &&
        wt !== WidgetType.pinnedLecture
    )
    .map((el) => createWidget(el));

  return (
    <div className="flex flex-col absolute top-[56px] pb-[56px] right-0 z-10 w-[300px] h-screen border-l border-cp-blue bg-cp-light-blue pl-5 pr-10">
      <div className="h-[50px] border-2 border-cp-blue rounded-lg">logout</div>
      <Link to={'/dashboard'} className="h-[50px] border-2 border-cp-blue rounded-lg">Dashboard</Link>
      <Link to={'/syllabus'} className="h-[50px] border-2 border-cp-blue rounded-lg">Syllabus</Link>

      {isDashboard && (
        <div className='flex flex-col overflow-scroll'>
          <WidgetList
            key={'unused'}
            title="Unused Widgets"
            widgets={filtered}
          ></WidgetList>
          <WidgetList
            key={'used'}
            title="Used Widgets"
            widgets={widgets}
          ></WidgetList>
        </div>
      )}
    </div>
  );
}

function WidgetItem({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full p-3 mb-3 justify-between rounded-md bg-cp-middle-blue text-white">
      {children}
    </div>
  );
}

function WidgetList({ title, widgets }: { title: string; widgets: Widget[] }) {
  return (
    <>
      <div className="mb-2 text-center text-lg font-bold font-sans text-cp-dark-blue border-b-2 border-cp-blue">
        {title}
      </div>
      {widgets.map(
        (w) =>
          w.canBeUnpinned && (
            <WidgetItem key={w.id}>
              <h3>{w.name}</h3>
              <GenericPin widget={w} className="text-white float-right" />
            </WidgetItem>
          )
      )}
    </>
  );
}
