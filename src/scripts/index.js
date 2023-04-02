//Получаем кнопки для вызова форм
const editProfileButton = document.querySelector('.user-panel__edit-button');
const addPostButton = document.querySelector('.user-panel__add-post-button');

//Получаем поп-ап и все формы в нём
const popup = document.querySelector('.popup');
const profileEditForm = document.querySelector('[name="profile-info"]');
const postAddForm = document.querySelector('[name="add-post"]');

//Получаем текущие данные пользователя
const profileName = document.querySelector('.user-panel__user-name');
const profileSignature = document.querySelector('.user-panel__user-signature');

//Получаем кнопки, универсальные для форм
const closePopupButton = popup.querySelector('.popup__close-button'); //кнопка закрытия формы
const saveButton = document.querySelector('.form__save-button'); //кнопка 'отправки' данных из формы

//Создаем переменные для полей формы с инфо пользователя
const nameInput = document.querySelector('.form__input_user-name');
const signatureInput = document.querySelector('.form__input_user-signature');

//Создаем переменные для работы с новым постом
const postsGallery = document.querySelector('.posts-gallery');
const postTemplate = document.querySelector('#post-template').content;
const likePostButtons = document.querySelectorAll('.posts-gallery__like-button');
const deletePostButtons = document.querySelectorAll('.posts-gallery__delete-button');
const galleryImages = document.querySelectorAll('.posts-gallery__item-photo');


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



function openForm (evt) {
  //Получаем текущую форму
  const targetForm = evt.target;

  popup.classList.remove('popup_closed');
  popup.classList.add('popup_opened');

  //Очищаем изменения позиции для кнопки закрытия, для случая если раньше были открыты фото
  popup.querySelector('.popup__close-button').style = "";

  if (targetForm.className === 'user-panel__add-post-button') {
    popup.style.display = "";
    profileEditForm.style.display = "none";
    postAddForm.style.display = "";
  }
  else {
    popup.style.display = "";
    postAddForm.style.display = "none";
    profileEditForm.style.display = "";

    //Заполняем поля текущими данными
    nameInput.value = profileName.textContent;
    signatureInput.value = profileSignature.textContent;
  }

}

function closeForm() {
  popup.classList.add('popup_closed');
  addEventListener('animationend', () => {popup.style.display = "none"; }, {once: true});
  popup.classList.remove('popup_opened');

  if (popup.querySelector('.center-container').querySelector('.posts-gallery__shown-photo'))
  {
    popup.querySelector('.center-container').removeChild(popup.querySelector('.posts-gallery__shown-photo'));
  }
}

function saveForm(evt) {
  evt.preventDefault();

  if (evt.target.name === 'add-post') {
    //Создаем переменные для полей формы с будущим постом
    const name = document.querySelector('.form__input_post-heading').value;
    const link = document.querySelector('.form__input_post-picture-link').value;

    createPost(name, link);

    document.querySelector('.form__input_post-heading').value = ''
    document.querySelector('.form__input_post-picture-link').value = '';
  }
  else {
    profileName.textContent = nameInput.value;
    profileSignature.textContent = signatureInput.value;
  }
  closeForm();
}

function createPost (name, link) {
  const postElement = postTemplate.querySelector('.posts-gallery__item').cloneNode(true);

  postElement.querySelector('.posts-gallery__item-photo').setAttribute('src', link);
  postElement.querySelector('.posts-gallery__item-heading').textContent = name;

  postsGallery.prepend(postElement);
  postElement.querySelector('.posts-gallery__like-button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('posts-gallery__like-button_active');
  });
  postElement.querySelector('.posts-gallery__delete-button').addEventListener('click', deletePost);
  postElement.querySelector('.posts-gallery__item-photo').addEventListener('click', openImage);

}

function deletePost (evt) {
  evt.target.parentElement.remove();
}

function createSomeTemplatePosts (postsArray) {
  for (let i = 0; i < postsArray.length; i++) {
    createPost(postsArray[i].name, postsArray[i].link);
  }
}

createSomeTemplatePosts(initialCards);

function openImage(evt) {
  const targetImage = evt.target;

  popup.classList.remove('popup_closed');
  popup.classList.add('popup_opened');
  popup.style.display = "";

  postAddForm.style.display = "none";
  profileEditForm.style.display = "none";

  console.log(targetImage.src);

  const img = new Image(); // width, height
  img.src = targetImage.src;
  if (img.height > img.width) {
    img.height = 540;
    img.width = 433;
    popup.querySelector('.popup__close-button').style.top = 'calc(50% - 270px - 40px)';
    popup.querySelector('.popup__close-button').style.left = 'calc(50% + 216px + 8px)';
  }
  else {
    img.height = 540;
    img.width = 816;
    popup.querySelector('.popup__close-button').style.top = 'calc(50% - 270px - 40px)';
    popup.querySelector('.popup__close-button').style.left = 'calc(50% + 408px + 8px)';
  }



  popup.querySelector('.center-container').appendChild(img);
  img.classList.add('posts-gallery__shown-photo');

}

editProfileButton.addEventListener('click', openForm);
addPostButton.addEventListener('click', openForm);
closePopupButton.addEventListener('click', closeForm);
profileEditForm.addEventListener('submit', saveForm);
postAddForm.addEventListener('submit', saveForm);

//Навешиваем слушатель на кнопки лайка карточек из index.html
likePostButtons.forEach(function (item) {
  if (item.getAttribute('listener') !== 'true') {
    item.addEventListener('click', function (evt) {
      evt.target.classList.toggle('posts-gallery__like-button_active');
    });
  }
});

//Навешиваем слушатель на кнопки удаления карточек из index.html
deletePostButtons.forEach(function(item) {
  if (item.getAttribute('listener') !== 'true') {
    item.addEventListener('click', deletePost);
  }
});

galleryImages.forEach(function(item) {
  if (item.getAttribute('listener') !== 'true') {
    item.addEventListener('click', openImage);
  }
});
