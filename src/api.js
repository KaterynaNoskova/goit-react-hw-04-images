import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '39056074-7558ace36b4fb710d53bdcd58';

export const fetchImages = async (searchQuery, page = 1) => {
  const { data } = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      q: searchQuery,
      page,
      per_page: 12,
    },
  });
  const { hits, totalHits } = data;
  return { hits, totalHits };
};
