interface CategoryProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export function Category({ isActive, onClick, children }: CategoryProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full font-medium text-sm transition-colors duration-100 ${
        isActive
          ? "bg-blue-600 text-white"
          : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
      }`}
    >
      {children}
    </button>
  );
}
