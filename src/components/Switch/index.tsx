interface SwitchProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
}

export function Switch({ isActive, children, ...props }: SwitchProps) {
  return (
    <button
      className={`px-5 py-2 font-bold text-lg text-center transition-colors duration-100 rounded-md ${
        isActive
          ? "bg-primary text-white"
          : "bg-white text-gray-700 hover:bg-gray-100"
      }`}
      {...props}
    >
      {children}
    </button>
  );
}
