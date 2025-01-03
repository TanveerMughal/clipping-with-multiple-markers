import { useEffect, useState } from "react";
import videoUrl from "../src/assets/4114797-uhd_2560_1440_25fps.mp4";
import ClippingTimeline from "./components/HtmlTimeline/ClippingTimeline";
import Controlbar from "./components/HtmlTimeline/Controlbar";
import Legendbar from "./components/HtmlTimeline/Legendbar";
import ContextProvider from "./components/HtmlTimeline/ContextProvider";

function App() {
  const [duration, setDuration] = useState(1500);
  const [sliders, setSliders] = useState<Array<number>>([100, 400, 560, 1000]);
  const [selectedSliderIndex, setSelectedSliderIndex] = useState<number | null>(
    null
  );

  const mainContainerWidth =
    document.getElementById("main-container")?.offsetWidth;

  useEffect(() => {
    const interval = setInterval(() => {
      setDuration((prev) => prev + 5);
    }, 10000);
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
