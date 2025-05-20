import axios from 'axios';

import { useLoginStore } from '@/stores/login';
import router from '@/router';
//axios 인스턴스 생성, 5초간 응답이없으면 자동으로 취소됨됨
const instance = axios.create({
  baseURL: 'http://localhost:8000', // 또는 백엔드 주소
  timeout: 5000,
});
//요청 인터셉터 -> 로그인 토큰이 있으면 Authorization 헤더에 bearer 토큰추가가
instance.interceptors.request.use(
  (config) => {
    const { getToken } = useLoginStore();
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log(config.headers.Authorization);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)
//응답인터셉터 -> 200 정상응답 400-> 페이지 없음
instance.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response
    }
    if (response.status === 404) {
      return Promise.reject('404:페이지 없음' + response.request);
    }
    return response;
  },
  //로그인하웃함?
  // 401일때 로그아웃후 로그인 페이지로 리다이렉트트
  async (error) => {
    if (error.response?.status === 401) {
      const { logout } = useLoginStore();
      logout();
      router.push('/login?error=login_required');
      return Promise.reject({ error: '로그인이 필요한 서비스입니다.' });
    }
    return Promise.reject(error);
  }
);
export default instance;
