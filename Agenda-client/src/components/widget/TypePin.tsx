import Pin from './Pin';
import { pinWidget, unPinWidget } from '../../services/widgetService';
import { Widget, WidgetType } from './Widget';
import { useEffect, useState } from 'react';
import layoutsDB from '../../utils/layoutsDB';
import createWidget from './widgets/WidgetFactory';

export default function TypePin({
  widgetType,
  dataId,
  className,
}: {
  widgetType: WidgetType;
  dataId:string;
  className?: string;
}) {

  const [widget, setWidget] = useState<Widget | undefined>();

  useEffect(()=> {
    (async ()=> {
      const result = await layoutsDB.getWidgetByDataId(dataId);
      setWidget(result);
    })();
  });
 
  async function onPin() {
    if (widget) {
      await unPinWidget(widget);
      setWidget(undefined);
      return;
    }

    const newWidget = createWidget(widgetType, dataId);
    await pinWidget(newWidget);
    setWidget(newWidget);
  }
  return (
    <Pin
      className={className ?? 'text-cp-blue'}
      isPinned={!!widget}
      onTogglePin={onPin}
    ></Pin>
  );
}
