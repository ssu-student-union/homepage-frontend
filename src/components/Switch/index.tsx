interface SwitchProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
}

export function Switch({ isActive, children, ...props }: SwitchProps) {
  return (
    <button
      className={`rounded-md px-5 py-2 text-center text-lg font-bold transition-colors duration-100 ${
        isActive ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
      }`}
      {...props}
    >
      {children}
    </button>
  );
}
