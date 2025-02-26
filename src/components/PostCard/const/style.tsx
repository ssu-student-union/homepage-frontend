import { Size } from './state';

interface Styles {
  container: string;
  title: string;
  subtitle: string;
  date: string;
  image: string;
  gap: string;
  profileImg: string;
  hr: string;
}

export function getStyles(state: Size): Styles {
  switch (state) {
    case Size.large:
      return {
        container: 'min-w-[400px] h-[209px] px-[16px] py-[16px]',
        title: 'h-[146px] text-base gap-1',
        subtitle: 'text-xs',
        date: 'h-[28px]',
        image: 'min-w-[175px] max-w-[175px] h-[175px]',
        gap: 'gap-[24px]',
        profileImg: 'w-4 h-4',
        hr: '',
      };
    case Size.medium:
      return {
        container: 'px-5 py-[1.44rem] w-full h-[10.69rem]',
        title: 'h-[5.94rem] text-base gap-2 leading-[1.19rem]',
        subtitle: 'text-sm leading-[1.07rem]',
        date: 'h-[1.88rem] text-sm',
        image: 'min-w-[7.81rem] max-w-[7.81rem] h-[7.81rem]',
        gap: 'gap-[1.69rem]',
        profileImg: 'w-4 h-4',
        hr: '',
      };
    case Size.small:
      return {
        container: 'px-5 py-[0.81rem] w-full h-[7.56rem]',
        title: 'h-[4.06rem] text-sm gap-2 leading-4',
        subtitle: 'text-xs leading-[0.88rem]',
        date: 'h-[1.88rem] text-[0.62rem]',
        image: 'min-w-[5.94rem] max-w-[5.94rem] h-[5.94rem]',
        gap: 'gap-[1.06rem]',
        profileImg: 'w-3.5 h-3.5',
        hr: 'hidden',
      };
    case Size.view:
      return {
        container: 'px-5 py-5 min-w-[15.5rem] h-[23.5rem]',
        title: 'h-[5.12rem] text-base gap-3 leading-[1.19rem]',
        subtitle: 'text-sm leading-[1.07rem]',
        date: 'h-[1.88rem] text-sm',
        image: 'min-w-[13rem] max-w-[13rem] min-h-[13rem] max-h-[13rem]',
        gap: 'flex-col gap-[1.06rem]',
        profileImg: 'w-4 h-4',
        hr: 'hidden',
      };
    case Size.default:
    default:
      return {
        container: 'px-5 py-[1.34rem] min-w-[31rem] max-w-[31rem] h-[15.75rem]',
        title: 'h-[11.12rem] text-lg gap-3 leading-[1.32rem]',
        subtitle: 'text-sm leading-[1.07rem]',
        date: 'h-[1.88rem] text-sm',
        image: 'min-w-[13rem] max-w-[13rem] h-[13rem]',
        gap: 'gap-[1.81rem]',
        profileImg: 'w-4 h-4',
        hr: '',
      };
  }
}
