export default function ArrowLeft({
  className = "w-6",
  stroke = "var(--coilgray-light)",
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 12L3 12"
        stroke={stroke}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M7.44709 17.7956C6.17129 17.4537 5.04394 16.7004 4.23988 15.6526C3.43582 14.6047 3 13.3208 3 12C3 10.6792 3.43582 9.3953 4.23988 8.34743C5.04394 7.29957 6.17129 6.54629 7.44709 6.20445"
        stroke={stroke}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
