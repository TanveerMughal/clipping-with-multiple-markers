import useClippingContext from "../hooks/useClippingContext";
import TimelineMainScrollableParent from "./TimelineMainScrollableParent";
import Scale from "./Scale";
import Sliders from "./Sliders";
import useSliderFns from "../hooks/useSliderFns";

function ClippingTimeline() {
  const clippingContext = useClippingContext();
  const { withMultiplier } = useSliderFns();

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
          // width: `${(duration / 60) * 5}px`,
          width: `${withMultiplier(duration)}px`,
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
