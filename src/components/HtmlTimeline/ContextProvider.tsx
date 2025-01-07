import React from "react";
import {
  ClippingContext,
  ClippingContextType,
} from "../hooks/useClippingContext";

function ContextProvider({
  children,
  duration,
  sliders,
  setSliders,
  selectedSliderIndex,
  setSelectedSliderIndex,
  viewLevel,
  setViewLevel,
}: ClippingContextType & { children: React.ReactNode }) {
  return (
    <ClippingContext.Provider
      value={{
        duration,
        sliders,
        setSliders,
        selectedSliderIndex,
        setSelectedSliderIndex,
        viewLevel,
        setViewLevel,
      }}
    >
      {children}
    </ClippingContext.Provider>
  );
}

export default ContextProvider;
