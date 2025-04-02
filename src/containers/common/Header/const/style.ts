import { cva } from 'class-variance-authority';
import { State } from './state';

interface Styles {
  bgColor: string;
  hoverBgColor: string;
  textColor: string;
  fillColor: string;
  sheetBorderColor: string;
  sheetIconColor: string;
  sheetItemsColor: string;
  headerItemStyle: string;
}

export const navigationMenuTriggerStyle = cva(
  'group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm text-background font-medium transition-colors hover:brightness-95 hover:text-background focus:brightness-95 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:brightness-95 data-[state=open]:brightness-95'
);

export function getStyles(state: State): Styles {
  const bgColor = state === State.Onboarding ? 'bg-background' : 'bg-primary';
  const hoverBgColor = state === State.Onboarding ? 'hover:bg-[#F1F1F1]' : 'hover:bg-[#1D4ED8]';
  const textColor = state === State.Onboarding ? 'text-ghost' : 'text-background';
  const fillColor = state === State.Onboarding ? '#000000' : '#ffffff';
  const sheetBorderColor = state === State.Onboarding ? 'border-[#E5E7EB]' : 'border-[#2A42D9]';
  const sheetIconColor = state === State.Onboarding ? 'text-black' : 'text-white';
  const sheetItemsColor = state === State.Onboarding ? 'text-[#4B5563]' : 'text-white';

  const headerItemStyle = `flex items-center justify-center lg:h-[60px] h-[50px] px-[35px] rounded-none text-lg font-bold ${textColor} hover:${textColor} ${bgColor} ${hoverBgColor} transition hover:brightness-95 cursor-pointer`;

  return {
    bgColor,
    hoverBgColor,
    textColor,
    fillColor,
    sheetBorderColor,
    sheetIconColor,
    sheetItemsColor,
    headerItemStyle,
  };
}
