//Получаем кнопки для вызова форм
const editProfileButton = document.querySelector('.user-panel__edit-button');
const addPostButton = document.querySelector('.user-panel__add-post-button');

//Получаем поп-апы
const editProfilePopup = document.querySelector('.popup_type-profile');
const addPostPopup = document.querySelector('.popup_type-new-post');
const photoPopup = document.querySelector('.popup_type-photo');

//получаем контейнер под всплывающее фото
const imgContainer = photoPopup.querySelector('.img-container');
const popupImg = imgContainer.querySelector('.popup__shown-photo');
const popupImgCaption = imgContainer.querySelector('.popup__shown-photo-figcaption');

//Получаем формы
const editProfileForm = document.forms['profile-info'];
const addPostForm = document.forms['add-post'];

//Получаем текущие данные пользователя
const profileName = document.querySelector('.user-panel__user-name');
const profileSignature = document.querySelector('.user-panel__user-signature');

//Получаем кнопки закрытия поп-апов
const closeButtons = document.querySelectorAll('.popup__close-button');


//Создаем переменные для полей формы с инфо пользователя
const nameInput = document.querySelector('.form__input_user-name');
const signatureInput = document.querySelector('.form__input_user-signature');

//Создаем переменные для работы с новым постом
const postsGallery = document.querySelector('.posts-gallery');
const postTemplate = document.querySelector('#post-template').content;
const postHeadingInput = document.querySelector('.form__input_post-heading');
const postLinkInput = document.querySelector('.form__input_post-picture-link');


//Создаем дефолтный массив для 6 постов
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


function openPopup (popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openImage(name, link) {
  openPopup(photoPopup);

  popupImg.src = link;
  popupImg.alt = name;
  popupImgCaption.textContent = name;
}


function openForm (form, popup) {
  openPopup(popup);
  if (form.name === 'profile-info') {
    //Заполняем поля формы профиля текущими данными пользователя
    nameInput.value = profileName.textContent;
    signatureInput.value = profileSignature.textContent;
  }
}


function saveProfile(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileSignature.textContent = signatureInput.value;

  closePopup(editProfilePopup);
}

function saveNewPost(evt) {
  evt.preventDefault();

  //Создаем переменные для полей формы с будущим постом
  const name = postHeadingInput.value;
  const link = postLinkInput.value;

  createPost(name, link);

  evt.target.reset();

  closePopup(addPostPopup);
}


function createCard (name, link) {
  const cardElement = postTemplate.querySelector('.posts-gallery__item').cloneNode(true);
  const postPhoto = cardElement.querySelector('.posts-gallery__item-photo');
  const postHeading = cardElement.querySelector('.posts-gallery__item-heading');

  postPhoto.setAttribute('src', link);
  postPhoto.setAttribute('alt', name);
  postHeading.textContent = name;

  cardElement.querySelector('.posts-gallery__like-button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('posts-gallery__like-button_active');
  });
  cardElement.querySelector('.posts-gallery__delete-button').addEventListener('click', deletePost);
  postPhoto.addEventListener('click', () => openImage(name, link));
  return cardElement;
}

function createPost(name, link) {
  const postElement = createCard(name, link);
  postsGallery.prepend(postElement);
}



function createSomeTemplatePosts (postsArray) {
  for (let i = 0; i < postsArray.length; i++) {
    createPost(postsArray[i].name, postsArray[i].link);
  }
}

function deletePost (evt) {
  evt.target.closest('.posts-gallery__item').remove();
}



editProfileButton.addEventListener('click', () => openForm(editProfileForm, editProfilePopup));
addPostButton.addEventListener('click', () => openForm(addPostForm, addPostPopup));

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});


editProfileForm.addEventListener('submit', saveProfile);
addPostForm.addEventListener('submit', saveNewPost);

createSomeTemplatePosts(initialCards);
