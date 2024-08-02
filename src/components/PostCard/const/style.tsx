import { Size } from './state';

interface Styles {
  container: string;
  title: string;
  subtitle: string;
  date: string;
  image: string;
  gap: string;
  logoSize: string;
  hr: string;
}

export function getStyles(state: Size): Styles {
  switch (state) {
    case Size.medium:
      return {
        container: 'px-5 py-[23px] w-[1004px] h-[171px]',
        title: 'h-[95px] text-base',
        subtitle: 'text-sm',
        date: 'h-[30px] text-sm',
        image: 'min-w-[125px] h-[125px]',
        gap: 'gap-[27px]',
        logoSize: '15px',
        hr: '',
      };
    case Size.mediumSmall:
      return {
        container: 'px-5 py-[23px] w-[637px] h-[171px]',
        title: 'h-[95px] text-base',
        subtitle: 'text-sm',
        date: 'h-[30px] text-sm',
        image: 'min-w-[125px] h-[125px]',
        gap: 'gap-[27px]',
        logoSize: '15px',
        hr: '',
      };
    case Size.small:
      return {
        container: 'px-5 py-[13px] w-[324px] h-[121px]',
        title: 'h-[65px] text-sm',
        subtitle: 'text-xs',
        date: 'h-[30px] text-[10px]',
        image: 'min-w-[95px] h-[95px]',
        gap: 'gap-[17px]',
        logoSize: '13px',
        hr: 'hidden',
      };
    case Size.view:
      return {
        container: 'px-5 py-5 w-[248px] h-[376px]',
        title: 'h-[82px] text-base',
        subtitle: 'text-sm',
        date: 'h-[30px] text-sm',
        image: 'min-w-[208px] min-h-[208px]',
        gap: 'flex-col gap-[17px]',
        logoSize: '15px',
        hr: 'hidden',
      };
    case Size.default:
    default:
      return {
        container: 'px-5 py-[21.5px] w-[491px] h-[252px]',
        title: 'h-[178px] text-lg',
        subtitle: 'text-sm',
        date: 'h-[30px] text-sm',
        image: 'min-w-[208px] h-[208px]',
        gap: 'gap-[29px]',
        logoSize: '15px',
        hr: '',
      };
  }
}
