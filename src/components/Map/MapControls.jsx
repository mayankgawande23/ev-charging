import { FiCrosshair, FiFilter, FiMinus, FiPlus } from "react-icons/fi";

const controlConfig = [
  { key: "recenter", label: "Center on me", icon: FiCrosshair },
  { key: "zoomIn", label: "Zoom in", icon: FiPlus },
  { key: "zoomOut", label: "Zoom out", icon: FiMinus },
  { key: "filters", label: "Jump to filters", icon: FiFilter },
];

export default function MapControls({ onControl }) {
  return (
    <div className="flex gap-2">
      {controlConfig.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          type="button"
          onClick={() => onControl?.(key)}
          className="rounded-full border border-white/20 bg-white/10 p-3 text-white transition hover:bg-white/20"
          aria-label={label}
        >
          <Icon />
        </button>
      ))}
    </div>
  );
}
