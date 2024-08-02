import { linkPaths, iconPaths } from "./const";

interface FloatingIconProps {
  icon: "kakao" | "insta" | "youtube";
  fill?: string;
  size?: string;
  viewBox: string;
  path: "kakaoLink" | "instaLink" | "youtubeLink";
}

const FloatingIcon = ({
  icon,
  fill = "#ffffff",
  size = "34px",
  viewBox,
  path,
}:FloatingIconProps) => (
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