import axios from 'axios';

const API_KEY = '37154597-63d1fb6dbcb2f64553a93c693';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const per_page = 12;
const image_type = 'photo';
const orientation = 'horizontal';
const safesearch = true;

export const getImages = async (query, page) => {
  const { data } = await axios.get(
    `/?key=${API_KEY}&q=${query}&page=${page}&per_page=${per_page}&image_type=${image_type}&orientation=${orientation}&safesearch=${safesearch}`
  );

  return data;
};
