import useClippingContext from "../hooks/useClippingContext";

function Scale() {
  const clippingContext = useClippingContext();

  if (!clippingContext) return null;

  const { duration } = clippingContext;

  const secondsArray = Array.from({ length: duration / 10 }, (_, i) => i * 10);

  return (
    <>
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
    </>
  );
}

export default Scale;

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
