import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function RegisterInputSection() {
  return (
    <div>
      <div className="mb-10 flex flex-col items-center text-center">
        <h1 className="text-xs font-normal">학생자치기구 로그인</h1>
        <Input type="text" className="w-4/12">
          아이디
        </Input>
        <Input type="text" className="w-4/12">
          비밀번호
        </Input>
        <Button variant={'default'} size={'default'} className="w-4/12">
          로그인
        </Button>
      </div>
    </div>
  );
}
