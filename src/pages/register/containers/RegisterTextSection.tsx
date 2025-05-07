import { STUDENT_COUNCIL_NAME } from '@/const/studentCouncil';

export function RegisterTextSection() {
  return (
    <div
      className="register_text text-[600px] text-white"
      style={{
        transform: 'rotate(-12.416deg)',
        WebkitTextStrokeWidth: '1px',
        WebkitTextStrokeColor: '#d5d5d5',
        WebkitTextFillColor: 'transparent',
      }}
    >
      {STUDENT_COUNCIL_NAME}
    </div>
  );
}
