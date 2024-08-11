import { Link } from 'react-router-dom'
import { KakaoButton } from '@/components/Logo/KakaoButton'

const Rest_api_key = import.meta.env.VITE_REST_API_KEY
const redirect_uri = import.meta.env.VITE_REDIRECT_URI
const encoded_redirect_uri = encodeURIComponent(redirect_uri)
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${encoded_redirect_uri}&response_type=code`

const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL
}

export function RegisterButtonSection() {
    return (
        <div
            style={{
                minHeight: '0vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                overflowY: 'hidden',
            }}>
            <div className='flex flex-col items-center text-center'>
                <h1 className='font-normal mb-[-10px]'>
                    64대 숭실대학교 총학생회
                </h1>
                <h1 className='text-[56px] font-bold'>US:SUM</h1>
                <div onClick={handleLogin}>
                    <KakaoButton />
                </div>
                <Link to={'scouncil'}>
                    <div className='text-[#828282] text-[12px] not-italic font-medium leading-[130%] underline mt-[20px]'>
                        학생자치기구 로그인
                    </div>
                </Link>
            </div>
        </div>
    )
}
