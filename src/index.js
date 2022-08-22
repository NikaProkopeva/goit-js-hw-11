import ServiceAPI from './apiService';
import galleryList from './gallery-list';

import './css/styles.css';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import apiService from './apiService';

const form = document.querySelector('.search-form');
const searchButton = document.querySelector('[type=submit]');
const gallery = document.querySelector('.gallery');

const options = {
  simpleLightBox: {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
  },
  intersectionObserver: {
    root: null,
    threshold: 1,
  },
};

// const loadService = new ServiceAPI();

// let currentPage = 1;

form.addEventListener('submit', onFormSubmit);

async function callback(entries, observer) {
  if (entries[0].isIntersecting) {
    observer.unobserve(entries[0].target);
    // ServiceAPI.params.page += 1;
    const result = await ServiceAPI.getImages();
    dataProcessing(result);
  }
}
const observer = new IntersectionObserver(callback, options.intersectionObserver);

let galleryLightBox = new SimpleLightbox('.gallery a', options.simpleLightBox);

async function onFormSubmit(e) {
  e.preventDefault();
  ServiceAPI.params.page += 1;

  const isFilled = e.currentTarget.elements.searchQuery.value;
  if (isFilled) {
    searchButton.disabled = true;
    ServiceAPI.params.q = isFilled;
    gallery.innerHTML = '';
    const result = await ServiceAPI.getImages();
    dataProcessing(result);
    // loadpictures();
    // Notify.success(`Hooray! We found ${result.data.total} images.`);
  }
}

// function loadPictures() {
//   loadService
//     .getPictures()
//     .then(dataProcessing)
//     .catch(error => {
//       console.log(error);
//       Notify.failure(`We're sorry, but you've reached the end of search results.');
//     });
// }

function dataProcessing(data) {
  searchButton.disabled = false;
  if (data.data.totalHits === 0) {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    return;
  }
  if (apiService.params.page) {
    Notify.success(`Hooray! We found ${data.data.total} images.`);
  }

  gallery.insertAdjacentHTML('beforeend', galleryList(data.data.hits));
  galleryLightBox.refresh();
  observer.observe(gallery.lastElementChild);

  if (
    (apiService.params.page - 1) * apiService.params.per_page + data.data.hits.length >=
    data.data.totalHits
  ) {
    observer.disconnect();
    Notify.warning(`We're sorry, but you've reached the end of search results.`);
    return;
  }

  // if (data.data.totalHits !== 0 && data.data.totalHits.length === 0) {
  //   Notify.warning(`We're sorry, but you've reached the end of search results.`);
  //   return;
  // }

  // Notify.success(`Hooray! We found ${data.data.total} images.`);

  ServiceAPI.params.page += 1;
}

// draft

// form.addEventListener('submit', onFormSubmit);

// const callback = function (entries, observer) {
//   if (entries[0].isIntersecting) {
//     observer.unobserve(entries[0].target);
//     loadPictures();
//   }
// };
// const observer = new IntersectionObserver(callback, options.intersectionObserver);

// let galleryLightBox = new SimpleLightbox('.gallery a', options.simpleLightBox);

// function onFormSubmit(e) {
//   e.preventDefault();

//   const isFilled = e.currentTarget.elements.searchQuery.value;
//   if (isFilled) {
//     searchButton.disabled = true;
//     ServiceAPI.params.q = isFilled;
//     // loadService.resetPage();
//     gallery.innerHTML = '';
//     loadPictures();
//   }
// }
// async function loadPictures() {
//   const result = await ServiceAPI.getImages();
//   dataProcessing(result);
// }

// function dataProcessing(data) {
//   searchButton.disabled = false;
//   if (data.data.totalHits === 0) {
//     Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//     return;
//   }
//   if (data.data.totalHits !== 0 && data.data.hits.length === 0) {
//     Notify.warning(`We're sorry, but you've reached the end of search results.`);
//     return;
//   }
//   gallery.insertAdjacentHTML('beforeend', galleryList(data.data.hits));

//   galleryLightBox.refresh();

//   if (ServiceAPI.params.page === 2) {
//     Notify.success(`Hooray! We found ${data.totalHits} images.`);
//   } else {
//     const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
//     window.scrollBy({
//       top: cardHeight * 2 + 120,
//       behavior: 'smooth',
//     });
//   }
//   observer.observe(gallery.lastElementChild);
// }
// async function generateMarkupUI() {
//   const result = await ServiceAPI.getImages();
//   const images = result?.data?.hits;
//   generateImagesMarkup(images);
//   lightbox = new SimpleLightbox('.gallery a');
// }
// function generateImagesMarkup(images) {
//   refs.gallery.insertAdjacentHTML('beforeend', galleryList(images));
// }
// async function loadMore() {
//   lightbox.refresh();
//   ServiceAPI.params.page += 1;
//   generateMarkupUI();
// }
