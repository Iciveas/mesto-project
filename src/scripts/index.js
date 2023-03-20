let popup = document.querySelector('.popup');
let form = document.querySelector('.form');

let editProfileButton = document.querySelector('.user-panel__edit-button');
let closeProfileButton = popup.querySelector('.popup__close-button');
let saveProfileButton = form.querySelector('.form__save-button');
console.dir(saveProfileButton);

let profileName = document.querySelector('.user-panel__user-name');
let profileSignature = document.querySelector('.user-panel__user-signature');

const nameInput = document.querySelector('.form__input_user-name');
const signatureInput = document.querySelector('.form__input_user-signature');

function openProfileEditor() {

  nameInput.value = profileName.textContent;
  signatureInput.value = profileSignature.textContent;

  popup.classList.add('popup_opened');

}

function closeProfileEditor() {
  popup.classList.remove('popup_opened');
}

function saveProfileInfo(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileSignature.textContent = signatureInput.value;

  console.log('нажалось');
  closeProfileEditor();
}

editProfileButton.addEventListener('click', openProfileEditor);
closeProfileButton.addEventListener('click', closeProfileEditor);
form.addEventListener('submit', saveProfileInfo);

console.log(editProfileButton);
