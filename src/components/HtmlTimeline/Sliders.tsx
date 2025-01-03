import useClippingContext from "../hooks/useClippingContext";

function Sliders() {
  const clippingContext = useClippingContext();

  if (!clippingContext) return null;

  const { setSelectedSliderIndex, sliders } = clippingContext;

  return (
    <>
      {sliders.map((secondsCount, index) => {
        function handleSelectSlider() {
          setSelectedSliderIndex(index);
        }
        return (
          <div
            key={index}
            className="absolute -translate-x-1/2 bottom-6 top-10 cursor-ew-resize"
            style={{
              left: `${secondsCount}px`,
              width: "5px",
              backgroundColor: index % 2 === 0 ? "green" : "red",
            }}
            onMouseDown={handleSelectSlider}
          />
        );
      })}
    </>
  );
}

export default Sliders;
