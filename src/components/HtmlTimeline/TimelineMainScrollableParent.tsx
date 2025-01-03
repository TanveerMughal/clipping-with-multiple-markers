import React, { useState } from "react";
import useClippingContext from "../hooks/useClippingContext";
import useSliderFns from "../hooks/useSliderFns";

function TimelineMainScrollableParent({
  children,
}: {
  children: React.ReactNode;
}) {
  const clippingContext = useClippingContext();
  const {
    updateSliderPosition,
    getDropPoint,
    isInSafeRangeForNewSlider,
    withMultiplier,
  } = useSliderFns();
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  if (!clippingContext) return null;

  const {
    setSelectedSliderIndex,
    setSliders,
    sliders,
    duration,
    selectedSliderIndex,
  } = clippingContext;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!clippingContext) return;
    if (selectedSliderIndex === null) return;

    setSliders(
      updateSliderPosition({
        event: e,
        sliders: sliders,
        selectedSliderIndex,
      })
    );
  }

  return (
    <div
      className="w-full overflow-y-auto bg-gray-800 scrollbar-thin"
      id="timeline"
      onMouseMove={handleMouseMove}
      // if we use mouse out, it fires even when we exit a slider because slider is its child and mouseout bubbles up.
      onMouseLeave={() => {
        setSelectedSliderIndex(null);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setIsDraggedOver(false);
        const data = e.dataTransfer.getData("text/plain");
        if (data === "add-slider") {
          const dropPoint = getDropPoint(e);

          if (
            !isInSafeRangeForNewSlider({
              dropPoint,
              sliders,
              totalDuration: duration,
            })
          ) {
            alert("You can't add a slider here");

            return;
          }

          // TODO: use multiplier constant instead of 15 and 10
          const newSliders = [
            ...sliders,
            dropPoint - withMultiplier(3),
            dropPoint + withMultiplier(2),
          ];
          setSliders(newSliders.sort((a, b) => a - b));
        }
      }}
      onDragOver={(e) => {
        e.preventDefault();
        if (!isDraggedOver) {
          setIsDraggedOver(true);
        }
      }}
    >
      {children}
    </div>
  );
}

export default TimelineMainScrollableParent;
