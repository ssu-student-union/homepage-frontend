import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function RegisterInputSection() {
    return (
        <div>
            <div className='flex flex-col items-center text-center mb-10'>
                <h1 className='font-normal text-xs'>학생자치기구 로그인</h1>
                <Input type='text' className='w-4/12'>
                    아이디
                </Input>
                <Input type='text' className='w-4/12'>
                    비밀번호
                </Input>
                <Button variant={'default'} size={'default'} className='w-4/12'>
                    로그인
                </Button>
            </div>
        </div>
    )
}
