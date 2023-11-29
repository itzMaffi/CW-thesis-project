import { useEffect, useState } from 'react';
import resolveComponent from '../../utils/componentResolver';
import { Widget } from '../../utils/Widget';
import { Layout, Layouts, Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import dbInstance from '../../utils/layoutsDB';

const ResponsiveGridLayout = WidthProvider(Responsive);

type DashboardState = {
  layouts: Layouts;
  widgets: Widget[];
};

function Dashboard() {
  const [state, setState] = useState<DashboardState>();

  dbInstance.setWidgetCallback(() => {
    UpdateWidgetAndLayout();
  });

  useEffect(() => {
    UpdateWidgetAndLayout();
  }, []);

  function UpdateWidgetAndLayout() {
    (async () => {
      try {
        const layoutsFromDb = dbInstance.layouts;
        const widgetsFromDb = dbInstance.widgets;

        const [layouts, widgets] = await Promise.all([
          layoutsFromDb,
          widgetsFromDb,
        ]);

        setState({layouts:layouts,widgets:widgets});
      } catch (error) {
        console.log(error);
      }
    })();
  }

  async function handleLayoutChange(_: Layout[], allLayouts: Layouts) {
    Object.values(allLayouts).flatMap((value)=> value).forEach((value)=>value.isResizable=false);
    await dbInstance.saveLayouts(allLayouts);
  }

  const layouts = state?.layouts;
  const widgets = state?.widgets;
  return (
    <>
      {layouts && widgets ? (
        <div className="max-w-[1280px] mx-auto">
          <ResponsiveGridLayout
            className="border-2 border-red-500"
            breakpoints={{ lg: 1024, md: 768, sm: 640 }}
            cols={{ lg: 4, md: 2, sm: 1 }}
            layouts={layouts}
            onLayoutChange={handleLayoutChange}
          >
            {widgets.map((widget: Widget) => (
              <div
                key={widget.i}
                className="border-2 border-[#EB993F]  rounded-lg bg-white"
              >
                {resolveComponent(widget.type, widget.i)}
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
