import galleryItems from "./gallery-items.js";

const galleryListItem = document.querySelector(".js-gallery");
const modal = document.querySelector(".js-lightbox");
const modalPhoto = document.querySelector(".lightbox__image");
const modalClose = document.querySelectorAll(".js-close-modal");
const btnLeft = document.querySelector(".lightbox__button-left");
const btnRight = document.querySelector(".lightbox__button-right");

const toHTML = (el, i) => `
<li class="gallery__item">
  <a
    class="gallery__link"
    href="${el.original}"
  >
    <img
      class="gallery__image"
      src="${el.preview}"
      data-source="${el.original}"
      alt="${el.description}"
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
});
