export function RigthCarouselButton() {
  return (
    <div className="absolute right-0 top-1/2 h-[52px] w-[52px] cursor-pointer xs:h-[26px] xs:w-[26px]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        style={{ filter: 'drop-shadow(2px 2px 10px rgba(0,0,0,0.25))' }}
      >
        <circle cx="128" cy="128" r="120" fill="white" stroke="#E6E6E6" stroke-width="2" filter="url(#shadow)" />
        <path
          d="M112,84 L168,128 L112,172"
          fill="none"
          stroke="#4A7AFF"
          stroke-width="24"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
}

export function LeftCarouselButton() {
  return (
    <div className="absolute top-1/2 h-[52px] w-[52px] cursor-pointer xs:h-[26px] xs:w-[26px]">
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
          stroke-width="32"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
}
