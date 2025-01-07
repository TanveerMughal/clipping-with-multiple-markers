import { ViewLevelType } from "global";
import useClippingContext from "../hooks/useClippingContext";

const viewLevels: Array<ViewLevelType> = ["secs", "mins", "hours"];

function ZoomLevelControlButtonsControlbar() {
  const clippingContext = useClippingContext();

  if (!clippingContext) return null;

  const { setViewLevel } = clippingContext;

  return (
    <div className="flex items-center justify-end gap-2 px-2 text-gray-600">
      {viewLevels.map((level) => {
        return (
          <button
            key={level}
            type="button"
            className="px-2 bg-gray-300 rounded-full hover:bg-gray-400"
            onClick={() => setViewLevel(level)}
          >
            {level}
          </button>
        );
      })}
    </div>
  );
}

export default ZoomLevelControlButtonsControlbar;
