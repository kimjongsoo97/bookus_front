import api from '@/api'

const BASE_URL='/api/v1/meeting'

const MeetingAPI = {
  all(){
    return api.get(`${BASE_URL}/`)
  },
  get(meetingId){
    return api.get(`${BASE_URL}/detail/${meetingId}/`)
  },
  create(meeting){
    return api.post(`${BASE_URL}/create/`,meeting)
  },
  delete(meetingId){
    return api.delete(`${BASE_URL}/delete/${meetingId}/`)
  },
  join(meetingId) {
    return api.post(`${BASE_URL}/join/${meetingId}/`)
  },
  withdraw(meetingId) {
    return api.post(`${BASE_URL}/withdraw/${meetingId}/`)
  },
  getContents(meetingId) {
    return api.get(`/api/v1/meeting/detail/${meetingId}/contents/`)
  },
  my() {
    return api.get(`${BASE_URL}/my/`);
  }

};

export default MeetingAPI 