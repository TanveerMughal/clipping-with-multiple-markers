import { createContext, useContext } from "react";

export type ClippingContextType = {
  duration: number;
  sliders: Array<number>;
  setSliders: React.Dispatch<React.SetStateAction<number[]>>;
  selectedSliderIndex: number | null;
  setSelectedSliderIndex: React.Dispatch<React.SetStateAction<number | null>>;
};

export const ClippingContext = createContext<ClippingContextType | null>(null);

function useClippingContext() {
  if (!ClippingContext) {
    throw new Error(
      "useClippingContext must be used within a ClippingContextProvider"
    );
  }

  return useContext(ClippingContext);
}

export default useClippingContext;
