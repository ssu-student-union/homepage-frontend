interface EditPageErrorProps {
  message?: string;
}

export function EditPageError({
  message = '오류가 발생하였습니다. 해당 페이지의 캡처본과 함께 관리자에게 문의하십시오.',
}: EditPageErrorProps) {
  return (
    <div className="mt-16 flex items-center justify-center py-12">
      <p>{message}</p>
    </div>
  );
}
