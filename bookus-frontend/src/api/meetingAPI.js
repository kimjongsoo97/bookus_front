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
  }
};

export default MeetingAPI 