interface CategoryProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

export function Category({ isActive = false, children, ...props }: CategoryProps) {
  return (
    <button
      className={`flex h-[38px] min-w-fit items-center justify-center rounded-[32px] border border-gray-800 px-[16px] py-[8px] text-[1.125rem] font-bold transition-colors duration-100 xs:h-[31px] xs:text-[0.875rem] sm:h-[31px] sm:text-[0.875rem] ${
        isActive ? 'bg bg-primary text-white' : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
      } `}
      {...props}
    >
      {children}
    </button>
  );
}
