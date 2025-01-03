function getDropPoint(event: React.MouseEvent<HTMLDivElement>) {
  const leftOffsetX = event.currentTarget.getBoundingClientRect().left;
  const clientX = event.clientX;
  const scrolledLeft = event.currentTarget.scrollLeft;

  return scrolledLeft + (clientX - leftOffsetX);
}

function isBetweenAnyTwoSliders({
  dropPoint,
  sliders,
}: {
  dropPoint: number;
  sliders: Array<number>;
}) {
  return sliders.some((slider, index) => {
    return (
      dropPoint > slider && dropPoint < sliders[index + 1] && index % 2 === 0
    );
  });
}

function isInSafeRangeForNewSlider({
  dropPoint,
  sliders,
  totalDuration,
}: {
  dropPoint: number;
  sliders: Array<number>;
  totalDuration: number;
}) {
  if (isBetweenAnyTwoSliders({ dropPoint, sliders })) return false;

  debugger;

  // logic: if the drop point is less than the first slider, we return true if difference between 0 and droppoint is atleast 4 seconds and difference between drop point and first slider is atleast 3 seconds

  if (dropPoint < sliders[0]) {
    // TODO: replace 20 with a multiplier constant i.e 4 sec x 5 multiplier
    const isAtleastFourSecondsAheadOfZero = dropPoint >= 20;
    // TODO: replace 15 with a multiplier constant i.e 3sec x 5 multiplier
    const isAtleastThreeSecondsBeforeFirstSlider = sliders[0] - dropPoint >= 15;

    return (
      isAtleastFourSecondsAheadOfZero && isAtleastThreeSecondsBeforeFirstSlider
    );
  }

  // logic: if the drop point is greater than the last slider, we return true if difference between last slider and drop point is atleast 4 seconds and difference between last slider and 100% is atleast 3 seconds

  if (dropPoint > sliders[sliders.length - 1]) {
    // TODO: replace 15 with a multiplier constant i.e 3 sec x 5 multiplier
    const isAtleastThreeSecondsBeforeTotalDuration =
      totalDuration * 5 - dropPoint >= 15;
    // TODO: replace 20 with a multiplier constant i.e 4sec x 5 multiplier
    const isAtleastFourSecondsAheadOfLastSlider =
      dropPoint - sliders[sliders.length - 1] >= 20;

    return (
      isAtleastThreeSecondsBeforeTotalDuration &&
      isAtleastFourSecondsAheadOfLastSlider
    );
  }

  // logic: first we identify which two sliders the drop point is between
  // we only return true if the difference between these sliders is atleast 10 seconds

  const dropPointNextSliderIndex = sliders.findIndex(
    (slider) => slider > dropPoint
  );

  // because findIndex returns -1 if the condition is not met for any element
  if (dropPointNextSliderIndex === -1) return false;

  // TODO: replace 20 with a multiplier constant i.e 4 sec x 5 multiplier
  const isAtleastFourSecondsAheadOfPreviousSlider =
    dropPoint - sliders[dropPointNextSliderIndex - 1] >= 20;

  // TODO: replace 15 with a multiplier constant i.e  3sec x 5 multiplier
  const isAtleastThreeSecondsBeforeNextSlider =
    sliders[dropPointNextSliderIndex] - dropPoint >= 15;

  return (
    isAtleastFourSecondsAheadOfPreviousSlider &&
    isAtleastThreeSecondsBeforeNextSlider
  );
}

function updateSliderPosition({
  event,
  sliders,
  selectedSliderIndex,
}: {
  event: React.MouseEvent<HTMLDivElement>;
  sliders: Array<number>;
  selectedSliderIndex: number;
}) {
  const newSliders = [...sliders];

  newSliders[selectedSliderIndex] = getDropPoint(event);

  const isOpenningSlider = selectedSliderIndex % 2 === 0;
  const newSliderPosition = newSliders[selectedSliderIndex];

  newSliderPosition < 0 && (newSliders[selectedSliderIndex] = 0);

  if (isOpenningSlider) {
    // should not be greater than its closing slider - 5 and should not be less than its previous slider

    // TODO: replace 25 with a multiplier constant i.e 5 sec x 5 multiplier
    const closingSliderSafeRange = sliders[selectedSliderIndex + 1] - 25;
    // TODO: replace 5 with a multiplier constant i.e 1 sec x 5 multiplier
    const previousSliderSafeRange = sliders[selectedSliderIndex - 1] + 5;

    if (newSliderPosition > closingSliderSafeRange) {
      newSliders[selectedSliderIndex] = closingSliderSafeRange;
    } else if (newSliderPosition < previousSliderSafeRange) {
      newSliders[selectedSliderIndex] = previousSliderSafeRange;
    }
  } else {
    // should not be less than its opening slider + 5 and should not be greater than its next slider
    // TODO: replace 25 with a multiplier constant i.e 5 sec x 5 multiplier
    const openingSliderSafeRange = sliders[selectedSliderIndex - 1] + 25;
    // TODO: replace 5 with a multiplier constant i.e 1 sec x 5 multiplier
    const nextSliderSafeRange = sliders[selectedSliderIndex + 1] - 5;

    if (newSliderPosition < openingSliderSafeRange) {
      newSliders[selectedSliderIndex] = openingSliderSafeRange;
    } else if (newSliderPosition > nextSliderSafeRange) {
      newSliders[selectedSliderIndex] = nextSliderSafeRange;
    }
  }

  return newSliders;
}

function useSliderFns() {
  return {
    updateSliderPosition,
    getDropPoint,
    isInSafeRangeForNewSlider,
  };
}

export default useSliderFns;
