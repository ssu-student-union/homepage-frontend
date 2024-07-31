import React from 'react';

interface FloatingIconProps {
  icon: "kakao" | "insta" | "youtube";
  fill?: string;
  size?: string;
  viewBox: string;
  path: "kakaoLink" | "instaLink" | "youtubeLink";
}

const iconPaths = {
  kakao: "M17.0964 0C7.66391 0 0 6.2 0 13.8C0 18.6 3.14417 22.8 7.66391 25.4L6.48484 32L13.7557 27.2C14.7383 27.4 15.9173 27.4 16.8999 27.4C26.3324 27.4 33.9963 21.2 33.9963 13.6C34.1928 6.2 26.5289 0 17.0964 0Z",
  insta: "M17 11C13.7568 11 11 13.7568 11 17C11 20.2432 13.7568 23 17 23C20.2432 23 23 20.2432 23 17C23 13.7568 20.2432 11 17 11ZM24.2636 0H9.89091C4.32727 0 0 4.32727 0 9.73636V24.1091C0 29.6727 4.32727 34 9.89091 34H24.2636C29.6727 34 34 29.6727 34 24.1091V9.73636C34 4.32727 29.6727 0 24.2636 0ZM17 25.9636C12.0545 25.9636 8.19091 21.9455 8.19091 17.1545C8.19091 12.3636 12.0545 8.19091 17 8.19091C21.9455 8.19091 25.8091 12.2091 25.8091 17C25.8091 21.7909 21.9455 25.9636 17 25.9636ZM26.1182 10.0455C25.0364 10.0455 24.1091 9.11818 24.1091 8.03636C24.1091 6.95454 25.0364 6.02727 26.1182 6.02727C27.2 6.02727 28.1273 6.95454 28.1273 8.03636C28.1273 9.11818 27.2 10.0455 26.1182 10.0455Z",
  youtube: "M36.0462 8.25246C37.7033 8.69389 39.0072 10.0046 39.4486 11.6753C40.25 14.6974 40.2432 20.9998 40.2432 20.9998C40.2432 20.9998 40.2432 27.3021 39.4418 30.3242C39.0004 31.9881 37.6965 33.2988 36.0394 33.7471C33.0376 34.5552 20.9966 34.5552 20.9966 34.5552C20.9966 34.5552 8.95559 34.5552 5.95383 33.7471C4.29675 33.3056 2.99281 31.9949 2.55138 30.3242C1.75 27.3021 1.75 20.9998 1.75 20.9998C1.75 20.9998 1.75 14.6974 2.55817 11.6685C2.9996 10.0046 4.30354 8.69389 5.96062 8.24567C8.96238 7.4375 21.0034 7.4375 21.0034 7.4375C21.0034 7.4375 33.0376 7.4375 36.0462 8.25246ZM27.1292 20.9998L17.0644 15.2747V26.7249L27.1292 20.9998Z",
};

const linkPaths = {
  kakaoLink: "http://pf.kakao.com/_RZTKV",
  instaLink: "https://www.instagram.com/ussum_64th/",
  youtubeLink: "https://www.youtube.com/@ussum_64th",
};

const FloatingIcon: React.FC<FloatingIconProps> = ({
  icon,
  fill = "#ffffff",
  size = "34px",
  viewBox,
  path,
}) => (
  <a
    href={linkPaths[path]}
    className="bg-primary hover:bg-blue-700 flex justify-center items-center w-20 h-20 rounded-[40px] cursor-pointer"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      style={{
        width: size,
        height: size,
      }}
    >
      <path fill={fill} d={iconPaths[icon]} />
    </svg>
  </a>
);

export const KakaoFloating = () => (
  <FloatingIcon
    icon="kakao"
    viewBox="0 0 34 32"
    path="kakaoLink"
  />
);

export const InstaFloating = () => (
  <FloatingIcon
    icon="insta"
    viewBox="0 0 34 34"
    path="instaLink"
  />
);

export const YoutubeFloating = () => (
  <FloatingIcon
    icon="youtube"
    viewBox="0 0 42 42"
    size="42px"
    path="youtubeLink"
  />
);