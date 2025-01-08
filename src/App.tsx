import { useEffect, useState } from "react";
import videoUrl from "../src/assets/4114797-uhd_2560_1440_25fps.mp4";
import ClippingTimeline from "./components/HtmlTimeline/ClippingTimeline";
import Controlbar from "./components/HtmlTimeline/Controlbar";
import Legendbar from "./components/HtmlTimeline/Legendbar";
import ContextProvider from "./components/HtmlTimeline/ContextProvider";
import useSliderFns from "./components/hooks/useSliderFns";
import { ViewLevelType } from "global";

function App() {
  const [duration, setDuration] = useState(10000);
  const { withMultiplier } = useSliderFns();
  const [sliders, setSliders] = useState<Array<number>>([
    withMultiplier(60),
    withMultiplier(120),
    withMultiplier(180),
    withMultiplier(240),
  ]);
  const [selectedSliderIndex, setSelectedSliderIndex] = useState<number | null>(
    null
  );
  const [viewLevel, setViewLevel] = useState<ViewLevelType>("secs");

  const mainContainerWidth =
    document.getElementById("main-container")?.offsetWidth;

  useEffect(() => {
    const interval = setInterval(() => {
      setDuration((prev) => prev + 5);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-zinc-400">
      <div
        id="main-container"
        className="w-[1000px] grid grid-cols-1 gap-2 overflow-hidden"
      >
        <p className="text-2xl font-semibold text-center text-gray-300">
          Html Timeline
        </p>
        <video src={videoUrl} className="rounded-xl" controls />
        <ContextProvider
          duration={duration}
          sliders={sliders}
          setSliders={setSliders}
          selectedSliderIndex={selectedSliderIndex}
          setSelectedSliderIndex={setSelectedSliderIndex}
          viewLevel={viewLevel}
          setViewLevel={setViewLevel}
        >
          <Controlbar />
          <Legendbar
            duration={duration}
            sliders={sliders}
            parentWidth={mainContainerWidth ?? 500}
          />
          <ClippingTimeline />
        </ContextProvider>
      </div>
    </div>
  );
}

export default App;
