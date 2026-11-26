interface MaterialIconProps {
  name: string
  className?: string
}

export function MaterialIcon({ name, className = 'h-5 w-5' }: MaterialIconProps) {
  switch (name) {
    case 'restaurant':
      return (
        <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z" />
        </svg>
      )
    case 'payments':
      return (
        <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 14V6c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zm-2 0H3V6h14v8zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm13 4v9c0 1.1-.9 2-2 2H5v-2h17v-9h2z" />
        </svg>
      )
    case 'night_shelter':
      return (
        <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 5.5l6 4.5v9H6v-9l6-4.5M12 3L4 9v12h16V9l-8-6zm-3 9.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5zm6 4.5H9v-1h6v1zm2-2.5h-1v-2H8v2H7v-4h1v1.5h8V12h1v4.5z" />
        </svg>
      )
    case 'holiday_village':
      return (
        <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 4l-6 4.5V20h5v-5h2v5h5V8.5L8 4zm14 6.5l-4-3V4h-3v2.75L13 5.25V7l7 5.25V20h2V10.5z" />
        </svg>
      )
    case 'home':
      return (
        <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      )
    case 'checkroom':
      return (
        <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.6 18.2L13 11.75v-.91c1.65-.49 2.8-2.17 2.43-4.01-.3-1.48-1.51-2.69-2.99-2.99-2.26-.45-4.21 1.1-4.41 3.16H10c.1-.95.73-1.74 1.63-1.95 1.15-.27 2.22.5 2.35 1.61.11.96-.6 1.84-1.56 1.98-.82.12-1.42.82-1.42 1.65v1.46L2.4 18.2C1.61 18.8 2.04 20 3 20h18c.96 0 1.39-1.2.6-1.8zM6 18l6-4.5 6 4.5H6z" />
        </svg>
      )
    case 'medical_services':
      return (
        <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm10 16H4V8h16v12zm-9-2h2v-3h3v-2h-3v-3h-2v3H8v2h3z" />
        </svg>
      )
    case 'local_laundry_service':
      return (
        <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 2.01L6 2c-1.11 0-2 .89-2 2v16c0 1.11.89 2 2 2h12c1.11 0 2-.89 2-2V4c0-1.11-.89-1.99-2-1.99zM10 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM7 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm5 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm-3.5-6c0-1.93 1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5-3.5-1.57-3.5-3.5z" />
        </svg>
      )
    case 'psychology':
      return (
        <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.5 2c-3.27 0-6.04 2.1-7.05 5.06-1.57.24-2.9 1.15-3.69 2.45-.63 1.05-.76 2.3-.36 3.49.27.8.78 1.48 1.45 1.95L3.5 19h4.2l.4 1h5.8v-2h-3.9l-.8-2h-.7c-.8 0-1.5-.7-1.5-1.5V14c0-.8.7-1.5 1.5-1.5h1V11c0-1.7 1.3-3 3-3s3 1.3 3 3v1.5h1c.8 0 1.5.7 1.5 1.5v.5c0 .8-.7 1.5-1.5 1.5h-.7l-.8 2h4.5c1.4 0 2.5-1.1 2.5-2.5v-3.7c0-.9-.4-1.8-1.1-2.4l-.4-.3c.3-.8.5-1.7.5-2.6 0-3.6-2.9-6.5-6.5-6.5z" />
        </svg>
      )
    case 'contact_phone':
      return (
        <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 3H2C.9 3 0 3.9 0 5v14c0 1.1.9 2 2 2h20c1.1 0 1.99-.9 1.99-2L24 5c0-1.1-.9-2-2-2zM8 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H2v-1c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1zm3.85-4l1.08-1.08c.39-.39 1.02-.39 1.41 0l1.37 1.37c.39.39.39 1.02 0 1.41l-.82.82c-.93.93-2.31 1.15-3.48.56-1.92-.97-3.47-2.52-4.44-4.44-.59-1.17-.37-2.55.56-3.48l.82-.82c.39-.39 1.02-.39 1.41 0l1.37 1.37c.39.39.39 1.02 0 1.41L16.2 9.5l1.65 4.5z" />
        </svg>
      )
    case 'clean_hands':
      return (
        <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M16.99 3.01L15 5V3H9v4.5C9 8.88 7.88 10 6.5 10H5v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-1.99-2.01-1.99zM17 20H7V12h10v8zm0-10h-2V7h2v3zm-4 0h-2V7h2v3z" />
        </svg>
      )
    case 'groups':
      return (
        <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
        </svg>
      )
    case 'health_and_safety':
      return (
        <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M10.5 13H8v-3h2.5V7.5h3V10H16v3h-2.5v2.5h-3V13zM12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm6 9.09c0 4-2.55 7.7-6 8.83-3.45-1.13-6-4.82-6-8.83V6.31l6-2.12 6 2.12v4.78z" />
        </svg>
      )
    case 'apps':
      return (
        <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z" />
        </svg>
      )
    case 'close':
      return (
        <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
      )
    case 'expand_more':
      return (
        <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
        </svg>
      )
    case 'check':
      return (
        <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
      )
    case 'download':
      return (
        <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
        </svg>
      )
    case 'print':
      return (
        <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z" />
        </svg>
      )
    default:
      return (
        <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="8" />
        </svg>
      )
  }
}
