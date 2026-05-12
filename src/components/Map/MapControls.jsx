import { FiCrosshair, FiFilter, FiMinus, FiPlus } from "react-icons/fi";

const controls = [
  { label: "Center on me", icon: FiCrosshair },
  { label: "Zoom in", icon: FiPlus },
  { label: "Zoom out", icon: FiMinus },
  { label: "Filters", icon: FiFilter },
];

export default function MapControls() {
  return (
    <div className="flex gap-2">
      {controls.map(({ label, icon: Icon }) => (
        <button
          key={label}
          className="rounded-full border border-white/20 bg-white/10 p-3 text-white transition hover:bg-white/20"
          aria-label={label}
        >
          <Icon />
        </button>
      ))}
    </div>
  );
}
