import { Spacing } from '@/components/Spacing';
import { Button } from '@/components/ui/button';
import { useResize } from '@/hooks/useResize';
import { useGetQnaList } from '@/pages/qna-notice/hooks/useGetQnaList';
import { formatYYYYMMDD } from '@/utils/formatYYYYMMDD';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

export default function QnaSection() {
  const { width } = useResize();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    data: qnaData,
    isError: isQnaError,
    error: qnaError,
  } = useGetQnaList({
    page: 0,
    take: 4,
    qnaMajorCode: '',
    qnaMemberCode: '',
  });

  if (!qnaData || isQnaError) {
    console.log('qna error', qnaError);
    return (
      <p className="flex h-[24.25rem] w-full items-center justify-center text-gray-600">등록된 게시물이 없습니다.</p>
    );
  }

  return (
    <section className="w-full whitespace-nowrap">
      <div className="flex items-center">
        <h1 className="text-lg font-bold md:text-[2rem]">{t('introduction.건의게시판')}</h1>
      </div>
      <Spacing size={8} direction="vertical" />
      <p className="text-[14px] font-medium text-gray-500 md:text-[20px]">
        무엇이든 물어보세요! <span className="font-bold">학생회가 직접 답변</span> 드립니다.
      </p>
      <Spacing size={14} direction="vertical" />
      <div className="flex w-full flex-col items-center justify-center">
        {/* xs, sm */}
        {width >= 360 && width < 720 && (
          <div className="mx-auto flex w-[90vw] flex-col justify-center gap-[16px] pb-[16px] pt-2.5">
            {qnaData.postListResDto.slice(0, 3).map((qna) => {
              return (
                <div
                  key={qna.postId}
                  className="mx-auto h-[104px] w-[90vw] cursor-pointer rounded-[7px] border border-gray-300 p-3"
                  onClick={() => {
                    navigate(`/qna/${qna.postId}`);
                  }}
                >
                  <p
                    className={`mb-[2px] text-[10px] font-bold ${qna.category === '답변완료' ? 'text-indigo-500' : 'text-gray-400'} `}
                  >
                    {qna.category}
                  </p>
                  <p className="mb-[3px] line-clamp-1 text-[12px] font-semibold text-gray-700">{qna.title}</p>
                  <p className="mb-[3px] line-clamp-2 h-[24px] text-[12px] font-medium text-gray-600">{qna.content}</p>
                  <p className="text-[10px] font-medium text-gray-500">{formatYYYYMMDD(qna.date)}</p>
                </div>
              );
            })}
          </div>
        )}

        {/*  md */}
        {width >= 720 && width < 1080 && (
          <div className="flex justify-center gap-[16px] pb-[16px] pt-2.5">
            {qnaData.postListResDto.slice(0, 2).map((qna) => {
              return (
                <div
                  key={qna.postId}
                  className="h-[178px] w-[232px] cursor-pointer rounded-[13px] border border-gray-300 p-3"
                  onClick={() => {
                    navigate(`/qna/${qna.postId}`);
                  }}
                >
                  <p
                    className={`mb-[2px] text-[14px] font-bold ${qna.category === '답변완료' ? 'text-indigo-500' : 'text-gray-400'}`}
                  >
                    {qna.category}
                  </p>
                  <p className="mb-[3px] line-clamp-1 text-[16px] font-bold text-gray-700">{qna.title}</p>
                  <p className="mb-[3px] line-clamp-4 h-[75px] text-[14px] font-medium text-gray-600">{qna.content}</p>
                  <p className="text-[12px] font-medium text-gray-500">{formatYYYYMMDD(qna.date)}</p>
                </div>
              );
            })}
          </div>
        )}

        {/* lg */}
        {width >= 1080 && width < 1440 && (
          <div className="flex justify-center gap-[18px] pb-[16px] pt-2.5 xl:px-[11.0rem]">
            {qnaData.postListResDto.slice(0, 3).map((qna) => {
              return (
                <div
                  key={qna.postId}
                  className="h-[178px] w-[232px] cursor-pointer rounded-[13px] border border-gray-300 p-3"
                  onClick={() => {
                    navigate(`/qna/${qna.postId}`);
                  }}
                >
                  <p
                    className={`mb-[2px] text-[14px] font-bold ${qna.category === '답변완료' ? 'text-indigo-500' : 'text-gray-400'}`}
                  >
                    {qna.category}
                  </p>
                  <p className="mb-[3px] line-clamp-1 text-[16px] font-bold text-gray-700">{qna.title}</p>
                  <p className="mb-[3px] line-clamp-4 h-[75px] text-[14px] font-medium text-gray-600">{qna.content}</p>
                  <p className="text-[12px] font-medium text-gray-500">{formatYYYYMMDD(qna.date)}</p>
                </div>
              );
            })}
          </div>
        )}

        {/* xl, xxl */}
        {width >= 1440 && (
          <div className="flex justify-center gap-[26px] pb-[16px] pt-2.5">
            {qnaData.postListResDto.slice(0, 3).map((qna) => {
              return (
                <div
                  key={qna.postId}
                  className="h-[237px] w-[362px] cursor-pointer rounded-[13px] border border-gray-300 p-4"
                  onClick={() => {
                    navigate(`/qna/${qna.postId}`);
                  }}
                >
                  <p
                    className={`mb-[2px] text-[14px] font-bold ${qna.category === '답변완료' ? 'text-indigo-500' : 'text-gray-400'}`}
                  >
                    {qna.category}
                  </p>
                  <p className="mb-[3px] line-clamp-1 text-[22px] font-bold text-gray-700">{qna.title}</p>
                  <p className="mb-[3px] line-clamp-4 h-[84px] text-[16px] font-medium text-gray-600">{qna.content}</p>
                  <p className="text-[16px] font-medium text-gray-500">{formatYYYYMMDD(qna.date)}</p>
                </div>
              );
            })}
          </div>
        )}
        <Spacing size={width >= 720 ? 50 : 30} direction="vertical" />

        <Button
          onClick={() => {
            navigate(`/qna`);
          }}
          className="mx-auto h-[30px] w-[87px] rounded-full px-4 py-2 text-[12px] md:mx-0 md:size-fit md:text-[1rem]"
        >
          {t('main.더 알아보기')}
        </Button>
      </div>
    </section>
  );
}
