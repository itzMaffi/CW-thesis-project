import { Widget } from '../widget/Widget';
import GenericPin from '../widget/GenericPin';
import React from 'react';

export default function WidgetHeader({
  children,
  widget,
}: {
  widget: Widget;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="cursor-move bg-cp-middle-blue min-w-full text-center p-2 text-lg font-bold font-sans text-white sticky top-0">
        <GenericPin
          widget={widget}
          className="text-white float-right"
        ></GenericPin>
        <div>{children}</div>
      </div>
    </>
  );
}
