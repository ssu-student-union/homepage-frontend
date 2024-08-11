import { Header } from '@/containers/common/Header/Header'
import { RegisterButtonSection } from '@/pages/kakao/containers/RegisterButtonSection'
import { RegisterTextSection } from '@/pages/kakao/containers/RegisterTextSection'

export function KakaoRegisterPage() {
    return (
        <>
            <div className='overflow-hidden relative h-screen'>
                <Header />
                <div className='absolute top-1/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-[100px] pointer-events-none'>
                    <RegisterTextSection />
                </div>
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-99'>
                    <RegisterButtonSection />
                </div>
                <div className='absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-[-100px] pointer-events-none'>
                    <RegisterTextSection />
                </div>
            </div>
        </>
    )
}
