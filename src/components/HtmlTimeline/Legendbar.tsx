import { useLayoutEffect, useRef } from "react";

function Legendbar({
  duration,
  sliders,
  parentWidth,
}: {
  duration: number;
  sliders: Array<number>;
  parentWidth: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function normalizeSliderValue(value: number) {
    const sliderValueRatio = value / duration;

    return sliderValueRatio * canvasRef.current!.width;
  }

  useLayoutEffect(() => {
    const canvas = canvasRef.current;

    const ctx = canvas?.getContext("2d");

    if (canvas && ctx) {
      ctx.fillStyle = "red";
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sliders.forEach((slider, index) => {
        const isOdd = index % 2 !== 0;
        if (isOdd) return;

        // ctx.fillRect(
        //   normalizeSliderValue(slider),
        //   0,
        //   normalizeSliderValue(sliders[index + 1]) * 5,
        //   50
        // );
      });
    }
  }, [sliders, duration]);

  return (
    <canvas
      ref={canvasRef}
      width={`${parentWidth}px`}
      height="50px"
      style={{ backgroundColor: "white", width: "100%", height: "50px" }}
    >
      Legendbar
    </canvas>
  );
}

export default Legendbar;
