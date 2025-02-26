import { useTranslation } from 'react-i18next';

export function KakaoButton() {
  const { i18n } = useTranslation();

  const isTrans = Boolean(i18n.language === 'en');

  if (isTrans) {
    return (
      <svg
        width="215"
        height="53"
        viewBox="0 0 215 53"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <rect width="215" height="54" rx="12" fill="url(#pattern0_77_6)" />
        <defs>
          <pattern id="pattern0_77_6" patternContentUnits="objectBoundingBox" width="1" height="1">
            <use xlinkHref="#image0_77_6" transform="matrix(0.00273902 0 0 0.0111111 -0.00124031 0)" />
          </pattern>
          <image
            id="image0_77_6"
            width="366"
            height="90"
            preserveAspectRatio="none"
            xlinkHref="data:image/png;base64,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"
          />
        </defs>
      </svg>
    );
  }
  return (
    <svg
      width="215"
      height="54"
      viewBox="0 0 215 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className="cursor-pointer"
    >
      <rect width="215" height="54" rx="12" fill="url(#pattern0_2034_1255)" />
      <defs>
        <pattern id="pattern0_2034_1255" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0_2034_1255" transform="matrix(0.0027907 0 0 0.0111111 -0.0106977 0)" />
        </pattern>
        <image
          id="image0_2034_1255"
          width="366"
          height="90"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
}
