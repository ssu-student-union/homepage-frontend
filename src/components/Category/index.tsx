interface CategoryProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
}

export function Category({ isActive, children, ...props }: CategoryProps) {
  return (
    <button
      className={`px-5 py-[9px] border border-gray-800 rounded-full font-bold transition-colors duration-100 text-lg sm:text-sm xs:text-sm ${
        isActive
          ? "bg bg-primary text-white"
          : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
      } `}
      {...props}
    >
      {children}
    </button>
  );
}
