import { Viewer } from '@toast-ui/react-editor';

interface NoticeDetailContentProps {
  content: string;
  images?: string[];
}

export function NoticeDetailContentSection({ content, images = [] }: NoticeDetailContentProps) {
  return (
    <div className="pt-[32px]">
      <Viewer initialValue={content} />
      <div className="h-[32px]" />
      {images?.map((image, index) => (
        <div key={image + index}>
          <img
            src={image}
            alt={`ERROR 404`}
            className={`${index === images.length - 1 ? 'pb-[32px]' : 'pb-[24px]'} h-[375px] w-auto xs:h-[150px] sm:h-[300px]`}
          />
        </div>
      ))}
    </div>
  );
}
