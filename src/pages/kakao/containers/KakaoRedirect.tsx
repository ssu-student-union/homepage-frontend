import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import getToken from './apis/GetToken'

const KakaoRedirect = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    useEffect(() => {
        const code = searchParams.get('code')

        if (code) {
            getToken(code)
                .then((transformedUserData) => {
                    console.log('Transformed User Data:', transformedUserData)
                    navigate('/register/onboarding')
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error)
                })
        }
    }, [searchParams, navigate])

    return <div>Loading...</div>
}

export default KakaoRedirect
