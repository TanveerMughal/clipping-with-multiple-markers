import videoUrl from "../src/assets/4114797-uhd_2560_1440_25fps.mp4";

function Svg() {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-zinc-400">
      <div className="w-[1000px] grid grid-cols-1 gap-2">
        <video src={videoUrl} className="rounded-xl" controls />
        <div className="">
          <svg
            width="100%"
            viewBox="0 0 1000 100"
            style={{
              backgroundColor: "white",
            }}
            transform="scale(1, 1)"
          >
            <defs>
              <g id="slider-compound" className="cursor-ew-resize">
                <rect width={20} height={30} fill="#49c6e5" rx={5} ry={5} />
                <line
                  x1="10"
                  y1="30"
                  x2="10"
                  y2="100"
                  stroke="#49c6e5"
                  stroke-width="2"
                />
              </g>

              <g id="slider">
                <line
                  y1="10"
                  y2="100"
                  stroke="#49c6e5"
                  stroke-width="2"
                  className="cursor-ew-resize"
                />
              </g>
            </defs>
            <use href="#slider" x={40} />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Svg;
