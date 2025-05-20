import api from '@/api'

const BASE_URL='/api/v1/accounts'

const LoginAPI = {
  register(user) {
    return api.post('api/v1/accounts/register/', user);
  },
  checkEmail(email) {
    return api.post(`${BASE_URL}/checkemail/`, {email}); 
  },
  checkNickname(nickname) {
    return api.post(`${BASE_URL}/checknickname/`, {nickname});
  },
  updateNickname(nickname) {
    return api.post(`${BASE_URL}/updatenickname/`, nickname);
  },
};

export default LoginAPI 