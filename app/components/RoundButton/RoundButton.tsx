import type { JSX } from "react";

/**
 * Simple round button with an icon
 * @author Gabriel
 * @param icon Icon to display
 * @param onClick Click handler
 */
export default function RoundButton({
  icon,
  onClick,
}: {
  icon: JSX.Element;
  onClick: () => void;
}) {
  return (
    <button
      className="rounded-full bg-coilorange-dark hover:bg-coilorange-dark p-5"
      onClick={onClick}
    >
      {icon}
    </button>
  );
}
