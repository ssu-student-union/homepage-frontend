interface SwitchProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export function Switch({ isActive, onClick, children }: SwitchProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 font-medium text-base transition-colors duration-100 rounded-md ${
        isActive
          ? "bg-blue-600 text-white"
          : "bg-white text-gray-700 hover:bg-gray-100"
      }`}
    >
      {children}
    </button>
  );
}
