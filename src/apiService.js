import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '27744397-00c9d3c8db15fb4b973904244';

const instance = axios.create({
  baseURL: BASE_URL,
});

const params = {
  key: API_KEY,
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 39,
  page: 1,
};

async function getImages() {
  try {
    return await instance.get(``, { params });
  } catch (error) {
    console.log(error);
  }
}

export default { params, getImages };

// import axios from 'axios';
// export default apiService;

// axios.defaults.baseURL = 'https://pixabay.com/api/';
// const API_KEY = '27744397-00c9d3c8db15fb4b973904244';

// import axios from 'axios';

// export default class ServiceAPI {
//   constructor() {
//     this.options = {
//       params: {
//         key: '27744397-00c9d3c8db15fb4b973904244',
//         q: '',
//         image_type: 'photo',
//         orientation: 'horizontal',
//         safesearch: true,
//         page: 1,
//         per_page: 39,
//       },
//     };
//   }

//   async getPictures() {
//     const response = await axios.get('https://pixabay.com/api/', this.options);
//     this.incrementPage();
//     return response;
//   }

//   incrementPage() {
//     this.options.params.page += 1;
//   }

//   resetPage() {
//     this.pageNumber = 1;
//   }

//   get searchQuery() {
//     return this.options.params.q;
//   }

//   set searchQuery(newQuery) {
//     this.options.params.q = newQuery;
//   }

//   get pageNumber() {
//     return this.options.params.page;
//   }

//   set pageNumber(newNumber) {
//     this.options.params.page = newNumber;
//   }
// }

// async function apiService(query, page, perPage) {
//   const response = await axios.get(
//     `?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`,
//   );
//   return response;
// }

// export default class ApiService {
//   constructor() {
//     this.query = '';
//     this.page = 1;
//   }

//   async fetchImages() {
//     const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=27744397-00c9d3c8db15fb4b973904244`;
//     const response = await fetch(url);

//     const imgArr = await response.json();
//     this.page += 1;
//     console.log(imgArr.hits);
//     return imgArr.hits;
//   }

//   resetPage() {
//     this.page = 1;
//   }
// }

// const refs = {
//   form: document.querySelector('#search-form'),
//   searchBtn: document.querySelector('.search-form__btn'),
//   gallery: document.querySelector('.gallery'),
//   loadMoreBtn: document.querySelector('.load-more'),
// };
// refs.form.addEventListener('submit', onSubmit);
// function onSubmit(e) {
//   e.preventDefault();
//   axios(
//     'https://pixabay.com/api/?key=27724352-dbb0b885dfbe6c3089a83b168&q=yellow+flowers&image_type=photo',
//   ).then(photos => console.log(photos));
// }
