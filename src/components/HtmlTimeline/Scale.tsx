import useClippingContext from "../hooks/useClippingContext";
import useSliderFns from "../hooks/useSliderFns";

function Scale() {
  const clippingContext = useClippingContext();
  const { withMultiplier } = useSliderFns();

  if (!clippingContext) return null;

  const { duration, viewLevel } = clippingContext;

  const secondsArray = Array.from({ length: duration / 10 }, (_, i) => i * 10);

  const minsArray = Array.from({ length: duration / 60 }, (_, i) => i * 60);

  const hoursArray = Array.from(
    { length: duration / 3600 },
    (_, i) => i * 3600
  );

  const renderScale = {
    secs: secondsArray,
    mins: minsArray,
    hours: hoursArray,
  };

  return (
    <>
      {renderScale[viewLevel].map((value, i) => {
        if (i === 0) {
          return;
        }

        function getWholeMinuteOrSeconds() {
          const isMinute = value % 60 === 0;

          if (isMinute) {
            return `${(value / 60).toString().padStart(2, "0")} m`;
          }

          return `${value}`;
        }

        return (
          <SingleTick
            key={i}
            label={i % 2 == 0 ? getWholeMinuteOrSeconds() : "I"}
            left={withMultiplier(value)}
          />
        );
      })}
    </>
  );
}

export default Scale;

type SingleTickPropsType = {
  left: number;
  label: string;
};

function SingleTick({ left, label }: SingleTickPropsType) {
  return (
    <span
      className="absolute text-sm leading-none text-gray-600 -translate-x-1/2 select-none top-6"
      style={{
        left: `${left}px`,
      }}
    >
      {label}
    </span>
  );
}
