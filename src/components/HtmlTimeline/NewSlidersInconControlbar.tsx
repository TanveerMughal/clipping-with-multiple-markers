import { MdOutlineAddRoad } from "react-icons/md";

function NewSlidersInconControlbar() {
  return (
    <span
      className="px-2 py-1 bg-gray-300 rounded-full cursor-move hover:bg-gray-400 w-fit"
      draggable="true"
      onDragStart={(e) => {
        // TODO: keep it in a constant
        e.dataTransfer.setData("text/plain", "add-slider");
      }}
    >
      <MdOutlineAddRoad />
    </span>
  );
}

export default NewSlidersInconControlbar;
