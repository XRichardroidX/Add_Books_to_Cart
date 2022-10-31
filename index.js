import dataStorage from './modules/localstorage.js';
import date from './modules/utils.js';

const bookContainer = document.querySelector('.render-container');
const addButton = document.querySelector('form');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const allListBook = document.getElementById('my-main');
const addBook = document.getElementById('my-form');
const contact = document.getElementById('my-contact');

let counter = 0;

class Books {
    static listOfbooks = [];

    id = `${Date.now()}`.slice(-10);

    constructor(id, title, author) {
      this.id = id;
      this.title = title;
      this.author = author;
    }

    addItem() {
      Books.listOfbooks.push(this);
      dataStorage(Books.listOfbooks);
      Books.renderBook();
      titleInput.value = '';
      authorInput.value = '';
    }

    static renderBook() {
      if (JSON.parse(localStorage.getItem('listOfbooks'))) {
        Books.listOfbooks = JSON.parse(localStorage.getItem('listOfbooks'));
      }

      let list = '';
      Books.listOfbooks.forEach((book) => {
        counter += 1;
        if (counter % 2 === 0) {
          list += `
           <li class="book-even" id="${book.id}">
             <div class="book-info">
                <p>"${book.title}"</p>
                <p>by</p>  
                <p>${book.author}</p>
            </div>
            <button type="button" class="remove-btn">Remove</button>
           </li>
         `;
        } else {
          list += `
           <li class="book-odd" id="${book.id}">
             <div class="book-info">
                <p>"${book.title}"</p>
                <p>by</p>  
                <p>${book.author}</p>
            </div>
            <button type="button" class="remove-btn">Remove</button>
           </li>
         `;
        }
      });

      bookContainer.innerHTML = list;

      document.querySelectorAll('.remove-btn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const bookId = e.target.parentElement.id;
          Books.listOfbooks = Books.listOfbooks.filter((book) => book.id !== bookId);
          dataStorage(Books.listOfbooks);
          e.target.parentElement.remove();
          window.location.reload();
        });
      });
    }
}

let id;

addButton.addEventListener('submit', (e) => {
  e.preventDefault();
  const errorMsg = document.getElementById('errorMsg');
  id = `${Date.now()}`.slice(-10);
  const title = titleInput.value;
  const author = authorInput.value;

  if (title.length < 1 && author.length < 1) {
    errorMsg.innerHTML = 'Please fill the input';
  } else {
    const newItem = new Books(id, title, author);
    newItem.addItem();
    window.location.reload();
  }
});

window.onload = () => {
  Books.renderBook();
};

document.getElementById('add-new').addEventListener('click', () => {
  allListBook.className = 'main-list';
  addBook.className = 'form';
  contact.className = 'contact-section-none';
  document.getElementById('nav-link').style.color = 'black';
  document.querySelector('.add-new').style.color = 'blue';
  document.getElementById('contact').style.color = 'black';
  addBook.style.display = 'flex';
  contact.style.display = 'none';
  allListBook.style.display = 'none';
});

document.getElementById('nav-link').addEventListener('click', () => {
  allListBook.className = 'main';
  addBook.className = 'form-none';
  contact.className = 'contact-section-none';
  document.getElementById('nav-link').style.color = 'blue';
  document.querySelector('.add-new').style.color = 'black';
  document.getElementById('contact').style.color = 'black';
  addBook.style.display = 'none';
  contact.style.display = 'none';
  allListBook.style.display = 'block';
});

document.getElementById('contact').addEventListener('click', () => {
  allListBook.className = 'main-list';
  addBook.className = 'form-none';
  contact.className = 'contact-section';
  document.getElementById('nav-link').style.color = 'black';
  document.querySelector('.add-new').style.color = 'black';
  document.getElementById('contact').style.color = 'blue';
  addBook.style.display = 'none';
  contact.style.display = 'block';
  allListBook.style.display = 'none';
});

addBook.style.display = 'none';
contact.style.display = 'none';

const dateTime = document.getElementById('time');
dateTime.innerText = date;