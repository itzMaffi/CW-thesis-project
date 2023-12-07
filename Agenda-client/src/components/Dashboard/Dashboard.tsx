import { useContext, useEffect } from 'react';
import { Widget } from '../widget/Widget';
import { Layout, Layouts, Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import dbInstance from '../../utils/layoutsDB';
import { DashboardContext } from '../../App';

const ResponsiveGridLayout = WidthProvider(Responsive);

export type DashboardState = {
  layouts: Layouts;
  widgets: Widget[];
};

function Dashboard() {
  const { dashboardState, setDashboardState } = useContext(DashboardContext);

  useEffect(() => {
    UpdateDashboardState();
  }, []);

  function UpdateDashboardState() {
    (async () => {
      try {
        const [layouts, widgets] = await Promise.all([
          dbInstance.layouts,
          dbInstance.widgets,
        ]);

        setDashboardState({ layouts: layouts, widgets: widgets });
      } catch (error) {
        console.log(error);
      }
    })();
  }

  async function handleLayoutChange(_: Layout[], allLayouts: Layouts) {
    await dbInstance.saveLayouts(allLayouts);
  }

  const layouts = dashboardState?.layouts;
  const widgets = dashboardState?.widgets;
  return (
    <>
      {layouts && widgets ? (
        <div className="max-w-[1280px] mx-auto">
          <ResponsiveGridLayout
            className="border-2 border-transparent rounded-lg bg-cp-light-blue bg-opacity-20"
            breakpoints={{ lg: 1024, md: 768, sm: 640 }}
            cols={{ lg: 4, md: 2, sm: 1 }}
            layouts={layouts}
            onLayoutChange={handleLayoutChange}
          >
            {widgets.map((widget: Widget) => (
              <div
                key={widget.id}
                className="border-2 border-cp-blue rounded-lg bg-white overflow-auto scrollbar-hide"
              >
                {widget.component}
              </div>
            ))}
          </ResponsiveGridLayout>
        </div>
      ) : (
        <div>LOADING</div>
      )}
    </>
  );
}

export default Dashboard;
