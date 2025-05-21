import api from '@/api'

const BASE_URL='/api/v1/books'

const BookAPI = {
  all(params) {
    return api.get(`${BASE_URL}/`,{params});
  },
  get(bookId){
    return api.get(`${BASE_URL}/${bookId}/`,)
  }

};

export default BookAPI 


