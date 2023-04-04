//Получаем кнопки для вызова форм
const editProfileButton = document.querySelector('.user-panel__edit-button');
const addPostButton = document.querySelector('.user-panel__add-post-button');

//Получаем поп-апы
const editProfilePopup = document.querySelector('.popup_type-profile');
const addPostPopup = document.querySelector('.popup_type-new-post');
const photoPopup = document.querySelector('.popup_type-photo');

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
  popup.classList.remove('popup_closed');
  popup.classList.add('popup_opened');
  popup.style.display = "";
}

function closePopup() {
  this.classList.add('popup_closed');
  /*В прошлом ревью строки ниже указали удалить, с комментарием:

  /*
  <<Этого больше не будет, все делает popup_opened
  По заданию нужно сделать плавное открытие и закрытие попапов.
  Это указано в самом низу задания.
  Там есть даже ссылка на форум, где показано, как это сделать через visibility, opacity и  transition: visibility 0.2s, opacity 0.2s ease-in;
  в классе popup и модификаторе popup_opened.
  А display: flex мешает плавно закрывать попапы.
  Это должно быть только в popup>> */

  /*
  Я это оставила потому что не уверена, что при ревью убедились в работоспособности данного способа.
  также, я увеличила длительность анимации в css, чтобы можно было воочию убедиться
  если использование дополнительного класса для закрытия поп-апа - зло, прошу более развернутый комментарий
  на мой взгляд это дполнительно удобно, потому что в index.html такой поп-ап будет дополнительно помечен классом как закрытый на текущий момент
  */


  addEventListener('animationend', () => {
    this.style.display = "none";
    if (this.querySelector('.center-container').querySelector('.popup__shown-photo'))
    {
      this.querySelector('.center-container').removeChild(this.querySelector('.img-container'));
    }
  }, {once: true});
  this.classList.remove('popup_opened');
}

function openImage(popup) {
  openPopup(popup);
  const viewContainer = popup.querySelector('.center-container');
  const imgContainer = document.createElement('figure');

  const img = new Image();
  const imgExistingHeading = this.closest('.posts-gallery__item').querySelector('.posts-gallery__item-heading');
  const imgFigCaption= document.createElement('figcaption');

  img.src = this.src;
  imgFigCaption.textContent = imgExistingHeading.textContent;

  imgContainer.classList.add('img-container');
  img.classList.add('popup__shown-photo');
  imgFigCaption.classList.add('popup__shown-photo-figcaption');
  viewContainer.append(imgContainer);
  imgContainer.append(img, imgFigCaption);

}


function openForm (popup) {
  openPopup(popup);
  if (this.name === 'profile-info') {
    //Заполняем поля формы профиля текущими данными пользователя
    nameInput.value = profileName.textContent;
    signatureInput.value = profileSignature.textContent;
  }
}


function saveProfile(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileSignature.textContent = signatureInput.value;

  closePopup.call(editProfilePopup);
}

function saveNewPost(evt) {
  evt.preventDefault();

  //Создаем переменные для полей формы с будущим постом
  const name = postHeadingInput.value;
  const link = postLinkInput.value;

  createPost(name, link);

  evt.target.reset();

  closePopup.call(addPostPopup);
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
  postPhoto.addEventListener('click', openImage.bind(postPhoto, photoPopup));
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
  evt.target.parentElement.remove();
}



editProfileButton.addEventListener('click', openForm.bind(editProfileForm, editProfilePopup));
addPostButton.addEventListener('click', openForm.bind(addPostForm, addPostPopup));

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', closePopup.bind(popup));
});


editProfileForm.addEventListener('submit', saveProfile);
addPostForm.addEventListener('submit', saveNewPost);

createSomeTemplatePosts(initialCards);
