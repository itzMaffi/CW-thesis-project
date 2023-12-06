import Pin from './Pin';
import { pinWidget, unPinWidget } from '../../services/widgetService';
import { Widget } from './Widget';
import { useEffect, useState } from 'react';
import layoutsDB from '../../utils/layoutsDB';

export default function GenericPin({
  widget,
  className,
}: {
  widget: Widget;
  className?: string;
}) {
  const [isInLayout, setIsInLayout] = useState(false);

  useEffect(() => {
    (async () => setIsInLayout(await layoutsDB.widgetExists(widget)))();
  });
  async function onPin() {
    if (isInLayout) {
      await unPinWidget(widget);
      setIsInLayout(false);
      return;
    }

    await pinWidget(widget);
    setIsInLayout(true);
  }
  return (
    <Pin
      className={className ?? 'text-cp-blue'}
      isPinned={isInLayout}
      onTogglePin={onPin}
    ></Pin>
  );
}
