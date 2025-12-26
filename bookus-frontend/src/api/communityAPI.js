import api from '@/api'

const BASE_URL='/api/v1/community'

const CommunityAPI = {
  all(){
    return api.get(`${BASE_URL}/`)
  },
  create(formData) {
  return api.post(`${BASE_URL}/create/`, formData)
},
  get(commnuityId){
    return api.get(`${BASE_URL}/detail/${commnuityId}/`)
  },
  delete(commnuityId){
    return api.post(`${BASE_URL}/delete/${commnuityId}/`)
  },
  update(commnuity,commnuityId){
    return api.post(`${BASE_URL}/update/${commnuityId}/`,commnuity)
  },
};

export default CommunityAPI