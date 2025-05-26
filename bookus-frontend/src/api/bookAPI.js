import api from '@/api'

const BASE_URL = '/api/v1/books'

const BookAPI = {
  all(params) {
    return api.get(`${BASE_URL}/`, { params });
  },
  get(bookId) {
    return api.get(`${BASE_URL}/${bookId}/`);
  },
  getSearch(query) {
    return api.get(`${BASE_URL}/search/?q=${query}`);
  },
  getFavorite() {
    return api.get(`${BASE_URL}/favorite/`);
  },
  addFavorite(bookId) {
    return api.post(`${BASE_URL}/favorite/`, { book_id: bookId });
  },
  removeFavorite(bookId) {
    return api.delete(`${BASE_URL}/favorite/`, { data: { book_id: bookId } });
  },
  allRandom(){
    return api.get(`${BASE_URL}/random/`)
  }
};

export default BookAPI;
