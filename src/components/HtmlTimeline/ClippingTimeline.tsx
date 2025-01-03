import { useState } from "react";
import useClippingContext from "../hooks/useClippingContext";
import useSliderFns from "../hooks/useSliderFns";

function ClippingTimeline() {
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const clippingContext = useClippingContext();
  const { updateSliderPosition, getDropPoint, isInSafeRangeForNewSlider } =
    useSliderFns();

  if (!clippingContext) {
    return null;
  }

  const {
    selectedSliderIndex,
    setSelectedSliderIndex,
    setSliders,
    sliders,
    duration,
  } = clippingContext;

  function handleMouseDown(index: number) {
    setSelectedSliderIndex(index);
  }

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

  const secondsArray = Array.from({ length: duration / 10 }, (_, i) => i * 10);

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

          const newSliders = [...sliders, dropPoint - 15, dropPoint + 10];
          // TODO: use multiplier constant instead of 15 and 10
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
      <div
        // TODO: add dragover effect
        className="relative h-40 bg-white"
        style={{
          width: `${duration * 5}px`,
        }}
        onMouseUp={() => setSelectedSliderIndex(null)}
      >
        {secondsArray.map((seconds, i) => {
          if (i === 0) {
            return;
          }

          return (
            <SingleTick
              key={i}
              left={seconds * 5}
              label={i % 2 === 0 ? seconds : undefined}
            />
          );
        })}

        {sliders.map((secondsCount, index) => {
          return (
            <div
              key={index}
              className="absolute -translate-x-1/2 bottom-6 top-10 cursor-ew-resize"
              style={{
                left: `${secondsCount}px`,
                width: "5px",
                backgroundColor: index % 2 === 0 ? "green" : "red",
              }}
              onMouseDown={() => handleMouseDown(index)}
              onMouseUp={() => setSelectedSliderIndex(null)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ClippingTimeline;

type SingleTickPropsType = {
  left: number;
  label?: number;
};

function SingleTick({ left, label }: SingleTickPropsType) {
  return (
    <span
      className="absolute text-sm leading-none text-gray-600 -translate-x-1/2 select-none top-6"
      style={{
        left: `${left}px`,
      }}
    >
      {label ? label : "I"}
    </span>
  );
}
