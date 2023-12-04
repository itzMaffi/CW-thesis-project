import { Widget } from '../widget/Widget';
import GenericPin from '../widget/GenericPin';

export default function WidgetHeader({
  children,
  widget,
}: {
  widget: Widget;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="bg-cw-orange min-w-full text-center p-2 text-lg font-bold font-sans text-white sticky top-0">
        <GenericPin
          widget={widget}
          className="text-white float-right"
        ></GenericPin>
        <div>{children}</div>
      </div>
    </>
  );
}
