import { Routes, Route } from 'react-router-dom'
import { MainPage } from './main/page'
import { IntroPage } from './intro/page'
import { BoardPage } from './boardTest/page'
import { KakaoRegisterPage } from './kakao/page'
import { GeneralRegisterPage } from './general/page'
import KakaoRedirect from './kakao/containers/KakaoRedirect'

export function MainRouter() {
    return (
        <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/intro' element={<IntroPage />} />
            <Route path='/board' element={<BoardPage />} />
            <Route path='/register' element={<KakaoRegisterPage />} />
            <Route path='/register/:sort' element={<GeneralRegisterPage />} />
            <Route path='/auth/callback' element={<KakaoRedirect />} />
        </Routes>
    )
}
