export default function Close({
  type,
  className,
}: {
  type: "success" | "error";
  className?: string;
}) {
  const strokeColor = type === "success" ? "#9BB168" : "#FE8659";
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M5 5L19 19"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M19 5L5 19"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
