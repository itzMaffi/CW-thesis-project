import Pin from './Pin';
import { pinWidget, unPinWidget } from '../../services/widgetService';
import { Widget, WidgetType } from './Widget';
import { useEffect, useState } from 'react';
import layoutsDB from '../../utils/layoutsDB';

export default function GenericPin({
  widget: incomingWidget,
  widgetType,
  dataId,
  className,
}: {
  widget?: Widget;
  widgetId?: string;
  widgetType?: WidgetType;
  dataId?: string;
  className?: string;
}) {
  const [widget, setWidget] = useState(incomingWidget);

  useEffect(() => {
    if (!incomingWidget && dataId) {
      (async () => {
        const widget = await layoutsDB.getWidgetByDataId(dataId);
        setWidget(widget);
      })();
    }
  });

  async function onPin() {
    if (widget) {
      await unPinWidget(widget!);
      setWidget(undefined);
      return;
    }

    const result = await pinWidget(widgetType!, dataId);
    setWidget(result);
  }
  return (
    <Pin
      className={className ?? 'text-cp-blue'}
      isPinned={!!widget}
      onTogglePin={onPin}
    ></Pin>
  );
}
