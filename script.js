const addBtn = document.querySelector('.add');
const saveBtn = document.querySelector('.save');
const cancelBtn = document.querySelector('.cancel');
const deleteAllBtn = document.querySelector('.delete-all');
const deleteNoteBtn = document.getElementsByClassName('delete-note');

const noteArea = document.querySelector('.note-area');
const notePanel = document.querySelector('.note-panel');
const category = document.querySelector('#category');
const textArea = document.querySelector('#text');
const error = document.querySelector('.error');

let selectedValue;

let noteID = 0;

let cardID = 0;
let cardIDwork = 0;
let cardIDshop = 0;
let cardIDothers = 0;

const checkErrors = () => {
  if (textArea.value !== '' && category.selectedIndex !== 0) {
    error.style.visibility = 'hidden';
  } else {
    error.style.visibility = 'visible';
  }
};

const createNote = () => {
  const newNote = document.createElement('div');
  newNote.classList.add('note');
  newNote.setAttribute('id', noteID);
  checkCategory(newNote);

  newNote.innerHTML = `
        <div class="note-header">
          <h3 class="note-title">${
            category.options[category.selectedIndex].innerText
          } #${cardID}</h3>
          <button class="delete-note" onclick='deleteNote(${noteID})'>
            <i class="fas fa-times icon"></i>
          </button>
        </div>
        <div class="note-body">
          ${textArea.value}
        </div>`;

  noteArea.appendChild(newNote);
  noteID++;
};

const hidePanel = () => {
  notePanel.style.display = 'none';
  error.style.visibility = 'hidden';
  textArea.value = '';
  category.selectedIndex = 0;
};

const checkCategory = (note) => {
  switch (category.options[category.selectedIndex].innerText) {
    case 'Shopping':
      note.classList.add('shop');
      cardIDshop++;
      cardID = cardIDshop;
      break;
    case 'Work':
      note.classList.add('work');
      cardIDwork++;
      cardID = cardIDwork;
      break;
    case 'Others':
      note.classList.add('others');
      cardIDothers++;
      cardID = cardIDothers;
      break;
  }
};

const deleteNote = (id) => {
  let noteToDelete = document.getElementById(id);
  noteArea.removeChild(noteToDelete);
};

const deleteAllNotes = () => {
  noteArea.textContent = '';
};

addBtn.addEventListener('mousedown', () => {
  notePanel.style.display = 'flex';
});

cancelBtn.addEventListener('mousedown', () => {
  hidePanel();
});

saveBtn.addEventListener('click', () => {
  checkErrors();
  if (textArea.value !== '' && category.selectedIndex !== 0) {
    createNote();
    hidePanel();
  }
});

deleteAllBtn.addEventListener('click', deleteAllNotes);
