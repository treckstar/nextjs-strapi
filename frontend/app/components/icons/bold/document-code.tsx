import {IconSvgProps} from "@/app/types";

export const DocumentCodeBoldIcon = ({size = 24, width, height, ...props}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M16 2H8C4.5 2 3 4 3 7V17C3 20 4.5 22 8 22H16C19.5 22 21 20 21 17V7C21 4 19.5 2 16 2ZM10.53 16.47C10.82 16.76 10.82 17.24 10.53 17.53C10.38 17.68 10.19 17.75 10 17.75C9.81 17.75 9.62 17.68 9.47 17.53L7.47 15.53C7.18 15.24 7.18 14.76 7.47 14.47L9.47 12.47C9.76 12.18 10.24 12.18 10.53 12.47C10.82 12.76 10.82 13.24 10.53 13.53L9.06 15L10.53 16.47ZM16.53 15.53L14.53 17.53C14.38 17.68 14.19 17.75 14 17.75C13.81 17.75 13.62 17.68 13.47 17.53C13.18 17.24 13.18 16.76 13.47 16.47L14.94 15L13.47 13.53C13.18 13.24 13.18 12.76 13.47 12.47C13.76 12.18 14.24 12.18 14.53 12.47L16.53 14.47C16.82 14.76 16.82 15.24 16.53 15.53ZM18.5 9.25H16.5C14.98 9.25 13.75 8.02 13.75 6.5V4.5C13.75 4.09 14.09 3.75 14.5 3.75C14.91 3.75 15.25 4.09 15.25 4.5V6.5C15.25 7.19 15.81 7.75 16.5 7.75H18.5C18.91 7.75 19.25 8.09 19.25 8.5C19.25 8.91 18.91 9.25 18.5 9.25Z"
      fill="currentColor"
    />
  </svg>
);
