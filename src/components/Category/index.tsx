interface CategoryProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
}

export function Category({ isActive, children, ...props }: CategoryProps) {
  return (
    <button
      className={`rounded-full border border-gray-800 px-5 py-[9px] text-lg font-bold transition-colors duration-100 xs:text-sm sm:text-sm ${
        isActive ? 'bg bg-primary text-white' : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
      } `}
      {...props}
    >
      {children}
    </button>
  );
}
