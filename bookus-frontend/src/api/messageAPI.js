import api from '@/api'

const BASE_URL='/api/v1/message'

const MessageAPI = {
  all() {
    return api.get(`${BASE_URL}/`);
  },
  get(messageId){
    return api.get(`${BASE_URL}/detailmessage/${messageId}/`)
  },
  send(){
    return api.get(`${BASE_URL}/send/`)
  },
  sendMessage(message){
    return api.post(`${BASE_URL}/sendmessage/`,message)
  },
  deleteMessage(messageId){
    return api.post(`${BASE_URL}/deletemessage/${messageId}/`)
  }

};

export default MessageAPI 


