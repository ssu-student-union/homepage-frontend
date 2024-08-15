import { useResize } from '@/hooks/useResize';
import { DotsThree } from '@phosphor-icons/react';
import { ThumbsUp, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function Comment() {
  const { width } = useResize();
  const mobile_screen = width < 391;
  const [toggleIsOpen, setToggleIsOpen] = useState(false);
  const toggleRef = useRef<HTMLDivElement>(null);
  const handleToggle = () => {
    setToggleIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (toggleRef.current && !toggleRef.current.contains(e.target as Node)) {
        setToggleIsOpen(false);
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const replaceSN = (student_number: string, chracter: string) => {
    return student_number.substring(0, 2) + chracter.repeat(4) + student_number.substring(6);
  };

  return (
    <div className="flex flex-col rounded-[10px] bg-gray-50 px-5 py-[30px]">
      <div className="flex justify-between text-gray-400">
        <div className="mb-[9px] flex gap-4">
          <span>
            <User size={mobile_screen ? '14px' : '24px'} />
          </span>
          <div className="text-lg font-medium xs:text-xs">{replaceSN('20193003', '*')}</div>
        </div>
        <div className="relative" ref={toggleRef}>
          <span className="cursor-pointer" onClick={handleToggle}>
            <DotsThree size={mobile_screen ? '13px' : '20px'} weight="bold" />
          </span>
          <div className="absolute right-0 z-10">
            {toggleIsOpen ? (
              <div className="flex w-[120px] cursor-pointer flex-col items-center justify-center rounded-[7px] bg-gray-50 drop-shadow-xl xs:w-[100px]">
                <ul className="w-full text-[15px] font-medium text-[#374151] xs:text-[9px] ">
                  <li className="px-[34px] py-[6px] text-center hover:bg-gray-100 xs:px-[20px]">삭제하기</li>
                  <li className="px-[34px] py-[6px] text-center hover:bg-gray-100 xs:px-[20px]">수정하기</li>
                </ul>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <div className="mb-[11px] text-lg font-medium text-gray-500 xs:text-xs">
        와 샌즈! Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
        industry's standard dummy text ever since the 1500s, when an unknown printer took galley of type and
      </div>
      <div className="flex justify-start gap-4 text-base font-medium text-gray-400 xs:text-xs">
        <div>2024/08/15 01:30</div>
        <div className="cursor-pointer whitespace-nowrap">답글쓰기</div>
        <div className="flex gap-[3px] text-primary">
          <span className="cursor-pointer">
            <ThumbsUp size={mobile_screen ? '13px' : '23px'} />
          </span>
          <span className="pt-[1px] xs:pt-0">32</span>
        </div>
      </div>
    </div>
  );
}
