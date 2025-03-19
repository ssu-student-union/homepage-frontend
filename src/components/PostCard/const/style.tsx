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
  textBox: string;
}

export function getStyles(state: Size): Styles {
  switch (state) {
    case Size.large:
      return {
        container: 'min-w-[400px] h-[209px] px-[16px] py-[16px]',
        textBox: 'gap-3',
        title: 'h-[146px] text-base gap-1',
        subtitle: 'line-clamp-7 text-xs',
        date: 'h-[28px]',
        image: 'min-w-[175px] max-w-[175px] h-[175px]',
        gap: 'gap-[24px]',
        profileImg: 'w-4 h-4',
        hr: '',
      };
    case Size.medium:
      return {
        container: 'px-5 py-[1.44rem] w-full h-[10.69rem]',
        textBox: 'gap-1 h-[96px]',
        title: 'text-base line-clamp-1',
        subtitle: 'line-clamp-4 text-sm leading-4',
        date: 'h-[1.88rem] text-sm',
        image: 'min-w-[7.81rem] max-w-[7.81rem] h-[7.81rem]',
        gap: 'gap-[1.69rem]',
        profileImg: 'w-4 h-4',
        hr: '',
      };
    case Size.small:
      return {
        container: 'px-5 py-[0.81rem] w-full h-[7.56rem]',
        textBox: 'gap-1 h-[60px]',
        title: 'text-base line-clamp-1',
        subtitle: 'line-clamp-3 text-xs leading-4',
        date: 'h-[1.88rem] text-[0.62rem]',
        image: 'min-w-[5.94rem] max-w-[5.94rem] h-[5.94rem]',
        gap: 'gap-[1.06rem]',
        profileImg: 'w-3.5 h-3.5',
        hr: 'hidden',
      };
    case Size.view:
      return {
        container: 'px-5 py-5 min-w-[15.5rem] h-[23.5rem]',
        textBox: '',
        title: 'h-[5.12rem] text-base gap-3 leading-[1.19rem]',
        subtitle: 'line-clamp-7 text-sm leading-6',
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
        textBox: 'gap-3 h-[11.12rem]',
        title: 'text-lg leading-5 w-[220px]',
        subtitle: 'line-clamp-6 text-sm leading-5.5 w-[220px]',
        date: 'h-[1.88rem] text-sm',
        image: 'min-w-[13rem] max-w-[13rem] h-[13rem]',
        gap: 'gap-[1.81rem]',
        profileImg: 'w-4 h-4',
        hr: '',
      };
  }
}
