import galleryItems from "/gallery-items.js";

const galleryListItem = document.querySelector(".js-gallery");
const modal = document.querySelector(".js-lightbox");
const modalPhoto = document.querySelector(".lightbox__image");
const modalCloseBtn = document.querySelector(".lightbox__button");

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
function render() {
  const html = galleryItems.map(toHTML).join("");
  galleryListItem.innerHTML = html;
}
render();

galleryListItem.addEventListener("click", (event) => {
  event.preventDefault();
  const imgSource = event.target.dataset.source;
  if (imgSource) {
    modalPhoto.src = imgSource;
    modal.classList.add("is-open");
  }
});

modalCloseBtn.addEventListener("click", (event) => {
  event.preventDefault();
  modal.classList.remove("is-open");
  modalPhoto.src = " ";
});
