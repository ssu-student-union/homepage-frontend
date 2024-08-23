import { useEffect } from 'react';
import axios from 'axios';

const KakaoAuthHandler = () => {
  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    if (code) {
      axios
        .post('https://kusitms28.shop/auth/oauth', { code })
        .then((response) => {
          console.log('Access Token:', response.data);
        })
        .catch((error) => {
          console.error('Error fetching access token:', error);
        });
    }
  }, []);

  return (
    <div>
      <p>로그인 처리 중...</p>
    </div>
  );
};

export default KakaoAuthHandler;
