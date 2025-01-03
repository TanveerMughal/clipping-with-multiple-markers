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
}: ClippingContextType & { children: React.ReactNode }) {
  return (
    <ClippingContext.Provider
      value={{
        duration,
        sliders,
        setSliders,
        selectedSliderIndex,
        setSelectedSliderIndex,
      }}
    >
      {children}
    </ClippingContext.Provider>
  );
}

export default ContextProvider;
