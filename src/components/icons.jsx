// Custom icons for brands not included in lucide-react, drawn in the same
// stroke style (24x24 viewBox, currentColor, round caps/joins) so they sit
// naturally next to lucide icons.

export function TikTokIcon({ size = 24, className, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M9 12a4 4 0 1 0 4 4V2a6 6 0 0 0 6 6" />
    </svg>
  )
}
