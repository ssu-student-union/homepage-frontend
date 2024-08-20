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
    case Size.audit:
      return {
        container: 'w-[400px] h-[209px] px-[16px] py-[16px]',
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
        container: 'px-5 py-5 w-[15.5rem] h-[23.5rem]',
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
        container: 'px-5 py-[1.34rem] w-[30.68rem] h-[15.75rem]',
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

export function Pencil({ className = '' }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 13" className={className}>
      <path
        fill="#9CA3AF"
        d="M12.2187 3.46254L9.53791 0.781244C9.44876 0.69208 9.34292 0.62135 9.22643 0.573094C9.10995 0.524837 8.98509 0.5 8.859 0.5C8.73291 0.5 8.60806 0.524837 8.49157 0.573094C8.37508 0.62135 8.26924 0.69208 8.18009 0.781244L0.781408 8.18016C0.691875 8.26898 0.62089 8.37471 0.572581 8.4912C0.524272 8.60769 0.499602 8.73262 0.500005 8.85874V11.54C0.500005 11.7946 0.601149 12.0388 0.781186 12.2188C0.961223 12.3989 1.20541 12.5 1.46002 12.5H4.14145C4.26756 12.5004 4.3925 12.4757 4.509 12.4274C4.6255 12.3791 4.73123 12.3081 4.82006 12.2186L12.2187 4.82029C12.3079 4.73115 12.3786 4.62531 12.4269 4.50883C12.4752 4.39235 12.5 4.2675 12.5 4.14142C12.5 4.01533 12.4752 3.89049 12.4269 3.774C12.3786 3.65752 12.3079 3.55169 12.2187 3.46254ZM1.65862 8.66014L7.07968 3.23935L8.08049 4.24071L2.66003 9.6609L1.65862 8.66014ZM1.46002 9.8187L3.18144 11.54H1.46002V9.8187ZM4.34005 11.3414L3.33864 10.3401L8.7597 4.91929L9.76051 5.92065L4.34005 11.3414Z"
      />
    </svg>
  );
}

export function ThumbsUp({ className = '' }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" className={className}>
      <path
        fill="#FF4646"
        d="M22.0926 9.01125C21.885 8.77193 21.6297 8.58028 21.3436 8.44903C21.0576 8.31778 20.7474 8.24994 20.4336 8.25H15.2722V6.75C15.2722 5.75544 14.8838 4.80161 14.1924 4.09835C13.501 3.39509 12.5632 3 11.5855 3C11.4485 2.9999 11.3142 3.03862 11.1976 3.11181C11.0811 3.185 10.9868 3.28977 10.9255 3.41438L7.44344 10.5H3.47469C3.08358 10.5 2.70848 10.658 2.43193 10.9393C2.15537 11.2206 2 11.6022 2 12V20.25C2 20.6478 2.15537 21.0294 2.43193 21.3107C2.70848 21.592 3.08358 21.75 3.47469 21.75H19.3276C19.8665 21.7502 20.3869 21.5503 20.7912 21.1878C21.1954 20.8253 21.4557 20.3251 21.523 19.7812L22.629 10.7812C22.6682 10.4644 22.6407 10.1427 22.5482 9.8375C22.4557 9.53232 22.3004 9.25066 22.0926 9.01125ZM3.47469 12H7.16141V20.25H3.47469V12ZM21.1654 10.5938L20.0594 19.5938C20.0369 19.775 19.9502 19.9418 19.8154 20.0626C19.6807 20.1834 19.5072 20.2501 19.3276 20.25H8.63609V11.4272L12.0196 4.54313C12.5211 4.64521 12.9723 4.9209 13.2964 5.32326C13.6206 5.72562 13.7976 6.2298 13.7975 6.75V9C13.7975 9.19891 13.8752 9.38968 14.0135 9.53033C14.1517 9.67098 14.3393 9.75 14.5348 9.75H20.4336C20.5382 9.74996 20.6417 9.77258 20.737 9.81634C20.8324 9.86011 20.9176 9.92402 20.9868 10.0038C21.056 10.0836 21.1077 10.1775 21.1385 10.2792C21.1693 10.3809 21.1785 10.4882 21.1654 10.5938Z"
      />
    </svg>
  );
}
