//Создаем переменные для полей формы с инфо пользователя
const nameInput = document.querySelector('.form__input_user-name');
const signatureInput = document.querySelector('.form__input_user-signature');

//Создаем переменные для работы с новым постом
const postsGallery = document.querySelector('.posts-gallery');
const postTemplate = document.querySelector('#post-template').content;

//Получаем поп-ап и все формы в нём
const popup = document.querySelector('.popup');
const profileEditForm = document.querySelector('[name="profile-info"]');
const postAddForm = document.querySelector('[name="add-post"]');

//Получаем текущие данные пользователя
const profileName = document.querySelector('.user-panel__user-name');
const profileSignature = document.querySelector('.user-panel__user-signature');

//Получаем кнопки для вызова форм
const editProfileButton = document.querySelector('.user-panel__edit-button');
const addPostButton = document.querySelector('.user-panel__add-post-button');

//Получаем кнопки, универсальные для форм
const closePopupButton = popup.querySelector('.popup__close-button'); //кнопка закрытия формы
const saveButton = document.querySelector('.form__save-button'); //кнопка 'отправки' данных из формы

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

  console.dir(postElement.querySelector('.posts-gallery__item-heading').attributes);
  postsGallery.append(postElement);
  console.dir(postElement);
}

function createSomeTemplatePosts (postsArray) {
  for (let i = 0; i < postsArray.length; i++) {
    createPost(postsArray[i].name, postsArray[i].link);
  }
}

createSomeTemplatePosts(initialCards);

editProfileButton.addEventListener('click', openForm);
addPostButton.addEventListener('click', openForm);
closePopupButton.addEventListener('click', closeForm);
profileEditForm.addEventListener('submit', saveForm);
postAddForm.addEventListener('submit', saveForm);

