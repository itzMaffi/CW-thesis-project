import layoutsDB from "../../utils/layoutsDB";
import GenericPin from "../widget/GenericPin";
import { WidgetType } from "../widget/Widget"

export default function Menu(){
  // const [widgetComponents]
  const widgetTypes = Object.values(WidgetType);
  // const widgets = await layoutsDB.widgets;


  return (
    <div className="flex flex-col absolute top-[56px] right-0 z-10 w-[200px] h-screen border-l border-cw-orange bg-white">

      <div className="h-[100px] border-2 border-cw-orange rounded-lg">logout</div>
      <h2 className="text-center border-b-2 border-cw-orange">Widgets</h2>

      {widgetTypes.map(w=> 
        (w as WidgetType) &&
        <div className="flex w-full justify-between">
          <h3>
            {w}
          </h3>
          <GenericPin widgetType={ w as WidgetType}></GenericPin>
        </div>)}
    </div>
  )
}