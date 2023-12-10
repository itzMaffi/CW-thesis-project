import { ReactNode, useContext } from 'react';
import GenericPin from '../widget/GenericPin';
import { Widget, WidgetType } from '../widget/Widget';
import { DashboardContext } from '../../App';
import { DashboardState } from '../Dashboard/Dashboard';
import { Link, useLocation } from 'react-router-dom';
import createWidget from '../widget/widgets/WidgetFactory';
import LogoutButton from '../userProfile/LogoutButton';

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
    <div className=" sidebar-menu flex flex-col absolute top-[56px] pt-3 pb-[56px] right-0 z-10 w-[300px] h-screen shadow-md  backdrop-blur-[10px] bg-white/20 pl-5 pr-10">
      <div className="mb-3 flex justify-end">
        <LogoutButton />
      </div>
      <Button to="/dashboard" title="Dashboard"></Button>
      <Button to="/syllabus" title="Syllabus"></Button>

      {isDashboard && (
        <div className="scrollbar-hide flex flex-col overflow-scroll">
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
    <div className="flex w-full p-3 mb-3 justify-between rounded-md bg-cp-middle-blue text-white cursor-default">
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

function Button({ title, to }: { title: string; to: string }) {
  return (
    <Link
      to={to}
      className="h-[50px] text-center flex justify-center p-3 mb-3 shrink-0 bg-cp-blue font-bold font-sans text-white rounded-lg hover:bg-cp-middle-blue"
    >
      <div className="">{title}</div>
    </Link>
  );
}
