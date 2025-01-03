import useClippingContext from "../hooks/useClippingContext";
import TimelineMainScrollableParent from "./TimelineMainScrollableParent";
import Scale from "./Scale";
import Sliders from "./Sliders";

function ClippingTimeline() {
  const clippingContext = useClippingContext();

  if (!clippingContext) {
    return null;
  }

  const { setSelectedSliderIndex, duration } = clippingContext;

  function handleDeselectSlider() {
    setSelectedSliderIndex(null);
  }

  return (
    <TimelineMainScrollableParent>
      <div
        // TODO: add dragover effect
        className="relative h-40 bg-white"
        style={{
          width: `${duration * 5}px`,
        }}
        onMouseUp={handleDeselectSlider}
      >
        <Scale />
        <Sliders />
      </div>
    </TimelineMainScrollableParent>
  );
}

export default ClippingTimeline;
