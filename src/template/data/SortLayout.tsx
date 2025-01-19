import { useState } from 'react';
import { FilterDropDown } from '@/components/FilterDropDown/FilterDropDown';

const mockData = {
  categories: [
    {
      name: '대분류',
      subcategories: [
        {
          name: 'Mobile Phones',
          items: ['iPhone', 'Samsung Galaxy', 'OnePlus'],
        },
        {
          name: 'Laptops',
          items: ['MacBook', 'Dell XPS', 'HP Spectre'],
        },
      ],
    },
    {
      name: '중분류',
      subcategories: [
        {
          name: 'Living Room',
          items: ['Sofa', 'Coffee Table', 'TV Stand'],
        },
        {
          name: 'Bedroom',
          items: ['Bed', 'Wardrobe', 'Dresser'],
        },
      ],
    },
  ],
};

export default function SortLayout() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedItem, setSelectedItem] = useState('');

  // Find the selected category and subcategory dynamically
  const currentCategory = mockData.categories.find((category) => category.name === selectedCategory);

  const currentSubcategory = currentCategory?.subcategories.find(
    (subcategory) => subcategory.name === selectedSubcategory
  );

  return (
    <div className="mb-[5rem] mt-[3.375rem] flex flex-row justify-center gap-[0.75rem]">
      {/* 대분류 */}
      <FilterDropDown
        defaultValue="대분류"
        optionValue={mockData.categories.map((category) => category.name)}
        onValueChange={(value) => {
          setSelectedCategory(value);
          setSelectedSubcategory('');
          setSelectedItem('');
        }}
        value={selectedCategory}
      />

      {/* 중분류 */}
      <FilterDropDown
        defaultValue="중분류"
        optionValue={currentCategory?.subcategories.map((subcategory) => subcategory.name) || []}
        onValueChange={(value) => {
          setSelectedSubcategory(value);
          setSelectedItem('');
        }}
        value={selectedSubcategory}
        mainTextStyle={!currentCategory ? 'text-gray-400' : ''}
      />

      {/* 소분류 */}
      <FilterDropDown
        defaultValue="소분류"
        optionValue={currentSubcategory?.items || []}
        onValueChange={setSelectedItem}
        value={selectedItem}
        mainTextStyle={!currentSubcategory ? 'text-gray-400' : ''}
      />
    </div>
  );
}
