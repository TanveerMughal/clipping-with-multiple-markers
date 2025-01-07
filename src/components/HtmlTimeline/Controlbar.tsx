import useClippingContext from "../hooks/useClippingContext";
import NewSlidersInconControlbar from "./NewSlidersInconControlbar";
import ZoomLevelControlButtonsControlbar from "./ZoomLevelControlButtonsControlbar";

function Controlbar() {
  const clippingContext = useClippingContext();

  if (!clippingContext) {
    return null;
  }

  const { sliders } = clippingContext;

  const sumOfSeconds = sliders.reduce((acc, curr, index) => {
    if (index % 2 === 0) {
      return acc + (sliders[index + 1] - curr);
    }
    return acc;
  }, 0);

  function secondsToTimeFormat(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours.toString().padStart(2, "0")} hours ${minutes
      .toString()
      .padStart(2, "0")} mins ${remainingSeconds
      .toString()
      .padStart(2, "0")} secs`;
  }

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] gap-2 bg-gray-100 py-2 items-center px-3">
      {/* draggable */}
      <NewSlidersInconControlbar />
      <p>
        <span className="px-2">
          {secondsToTimeFormat(Math.floor(sumOfSeconds / 5))}
        </span>
        <span className="px-2">
          {(sliders.length / 2).toString().padStart(2, "0")} clips
        </span>
      </p>
      <ZoomLevelControlButtonsControlbar />
    </div>
  );
}

export default Controlbar;
