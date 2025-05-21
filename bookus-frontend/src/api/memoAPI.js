import api from '@/api'

const BASE_URL='/api/v1/memo'

const MemoAPI = {
  all(){
    return api.get(`${BASE_URL}/`)
  },
  get(memoId){
    return api.get(`${BASE_URL}/detail/${memoId}/`)
  },
  create(memo){
    return api.post(`${BASE_URL}/create/`,memo)
  },
  update(memo,memoId){
    return api.post(`${BASE_URL}/update/${memoId}/`,memo)
  },
  delete(memoId){
    return api.delete(`${BASE_URL}/delete/${memoId}/`)
  }
};

export default MemoAPI 