import { useEffect, useState } from 'react';
import resolveComponent from '../../utils/componentResolver';
import { Widget } from '../../utils/types';
import { Layout, Layouts, Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import { dbInstance } from '../../utils/layoutsDB';

const ResponsiveGridLayout = WidthProvider(Responsive);

function Dashboard() {
  const [layouts, setLayouts] = useState<Layouts>();
  const [widgets, setWidgets] = useState<Widget[]>();

  useEffect(() => {
    async function fetchLayouts() {
      const layoutsFromDb = await dbInstance.layouts;
      setLayouts(layoutsFromDb);
    }

    async function fetchWidgets() {
      const widgetsFromDb = await dbInstance.widgets;
      setWidgets(widgetsFromDb);
    }

    try {
      Promise.all([fetchLayouts(), fetchWidgets()]);
    } catch (error) {
      console.log(error);
    }
  }, []);

  async function handleLayoutChange(_: Layout[], allLayouts: Layouts) {
    await dbInstance.saveLayouts(allLayouts);
    setLayouts(allLayouts);
  }

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
                className="border-2 border-[#EB993F] p-2 rounded-lg bg-white"
              >
                {resolveComponent(widget.type)}
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
