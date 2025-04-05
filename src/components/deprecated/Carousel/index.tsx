interface CarouselProps {
  onClick: () => void;
}

/**
 * @deprecated `lucide-react`와 `shadcn/ui`의 `Button` 컴포넌트로 리팩토링 필요
 */
export function RigthCarouselButton({ onClick }: CarouselProps) {
  return (
    <div className="absolute right-0 top-1/2 size-[26px] cursor-pointer md:size-[52px]" onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        style={{ filter: 'drop-shadow(2px 2px 10px rgba(0,0,0,0.25))' }}
      >
        <circle cx="128" cy="128" r="120" fill="white" stroke="#E6E6E6" strokeWidth="2" filter="url(#shadow)" />
        <path
          d="M112,84 L168,128 L112,172"
          fill="none"
          stroke="#4A7AFF"
          strokeWidth="24"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function LeftCarouselButton({ onClick }: CarouselProps) {
  return (
    <div className="absolute top-1/2 size-[26px] cursor-pointer md:size-[52px]" onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        style={{ filter: 'drop-shadow(2px 2px 10px rgba(0,0,0,0.25))' }}
      >
        <circle cx="128" cy="128" r="120" fill="white" filter="url(#shadow)" />
        <path
          d="M150,84 L94,128 L150,172"
          fill="none"
          stroke="#4A7AFF"
          strokeWidth="32"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
