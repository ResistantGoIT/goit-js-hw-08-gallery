import galleryItems from "./gallery-items.js";

const galleryListItem = document.querySelector(".js-gallery");
const modal = document.querySelector(".js-lightbox");
const modalPhoto = document.querySelector(".lightbox__image");
const modalClose = document.querySelectorAll(".js-close-modal");
const btnLeft = document.querySelector(".lightbox__button-left");
const btnRight = document.querySelector(".lightbox__button-right");

const toHTML = (photo) => `
<li class="gallery__item">
  <a
    class="gallery__link"
    href="${photo.original}"
  >
    <img
      class="gallery__image"
      src="${photo.preview}"
      data-source="${photo.original}"
      alt="${photo.description}"
    />
  </a>
</li>
`;

//Добавление каждого объекта массива в галерею
function render() {
  const html = galleryItems.map(toHTML).join("");
  galleryListItem.innerHTML = html;
}
render();

//Открытие модального окна нажатием на картинку
let imgSource;
galleryListItem.addEventListener("click", (event) => {
  event.preventDefault();
  let imgSource = event.target.dataset.source;
  if (imgSource) {
    modalPhoto.src = imgSource;
    modal.classList.add("is-open");
  }
});

//Закрытие модального окна кликом на оверлэй или крестик
modalClose.forEach((el) => {
  el.addEventListener("click", (event) => {
    event.preventDefault();
    modal.classList.remove("is-open");
    modalPhoto.src = " ";
  });
});

//Закрытие модального окна кнопкой 'Escape'
window.addEventListener("keydown", onKeydown);
function onKeydown(event) {
  if (event.code === "Escape") {
    modal.classList.remove("is-open");
  }
}

for (let photo = 0; photo < galleryItems.length; photo += 1) {
  btnLeft.addEventListener("click", (event) => {
    if (photo > 0 && photo < 9) {
      modalPhoto.src = galleryItems[(photo -= 1)].original;
    }
  });
  btnRight.addEventListener("click", (event) => {
    if (photo <= 0 && photo >= 8) {
      modalPhoto.src = galleryItems[(photo += 1)].original;
    }
  });
}
