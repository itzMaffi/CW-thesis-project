import Pin from './Pin';
import { pinWidget, unPinWidget } from '../../services/widgetService';
import { Widget } from './Widget';
import { useContext, useEffect, useState } from 'react';
import layoutsDB from '../../utils/layoutsDB';
import { DashboardContext } from '../../App';

export default function GenericPin({
  widget,
  className,
}: {
  widget: Widget;
  className?: string;
}) {
  const [isInLayout, setIsInLayout] = useState(false);
  const {setDashboardState} = useContext(DashboardContext);

  useEffect(() => {
    (async () => setIsInLayout(await layoutsDB.widgetExists(widget)))();
  });
  async function onPin() {
    if (isInLayout) {
      await unPinWidget(widget, setDashboardState);
      setIsInLayout(false);
      return;
    }

    await pinWidget(widget, setDashboardState);
    setIsInLayout(true);
  }
  return (
    <Pin
      className={'pin-component text-2xl text-cp-blue ' + className}
      isPinned={isInLayout}
      onTogglePin={onPin}
    ></Pin>
  );
}
