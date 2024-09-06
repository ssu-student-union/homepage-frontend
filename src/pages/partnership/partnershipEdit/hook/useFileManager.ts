import { useState } from 'react';

export interface ManagedFile {
  id: string;
  file: File | null;
}

export function useFileManager() {
  const [items, setItems] = useState<ManagedFile[]>([]);

  const generateId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const addItem = (acceptedFiles: File[], index: number) => {
    const newItems = [...items];
    acceptedFiles.forEach((file, i) => {
      newItems[index + i] = { id: generateId(), file };
    });
    setItems(newItems);

    const allFilled = newItems.every((item) => item.file !== null);
    if (allFilled) {
      addEmptyField();
    }
  };

  const addEmptyField = () => {
    setItems([...items, { id: generateId(), file: null }]);
  };

  const removeItemField = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const getValidItems = () => items.filter((item) => item.file !== null).map((item) => item.file as File);

  return {
    items,
    addItem,
    addEmptyField,
    removeItemField,
    getValidItems,
  };
}
