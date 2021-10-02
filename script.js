const form = document.querySelector('form');
const addBookButton = document.querySelector('#addBookButton');
const hideBookButton = document.querySelector('#hideBookButton');



addBookButton.addEventListener('click', (e) => {
  form.style.display = 'block';
})

hideBookButton.addEventListener('click', (e) => {
  form.style.display = 'none';
})

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = form.title.value,
    this.author = form.author.value,
    this.pages = form.pages.value,
    this.read = form.read.value

}

function addBookToLibrary(e) {
  e.preventDefault();
  newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  setData();
  render();
  form.reset();

}




function render() {
  const library = document.getElementById('library-container');
  const books = document.querySelectorAll('.bookDiv');
  books.forEach(book => library.removeChild(book));




  for (let i = 0; i < myLibrary.length; i++) {
    createBookIcon(myLibrary[i]);
  }
}

var myFunction = function () {
  var name = 'Todd';
  var myOtherFunction = function () {
    console.log('My name is ' + name);
  };
  console.log(name);
  myOtherFunction(); // call function
};







form.addEventListener('submit', addBookToLibrary);



function createBookIcon(item) {
  const library = document.querySelector('#library-container');
  const bookDiv = document.createElement('div');
  const titleDiv = document.createElement('div');
  const authorDiv = document.createElement('div');
  const readButton = document.createElement('button');
  const deleteButton = document.createElement('button');

  bookDiv.setAttribute('class', 'bookDiv');
  bookDiv.setAttribute('id', myLibrary.length - 1);

  titleDiv.innerText = item.title;
  titleDiv.setAttribute('class', 'titleDiv');
  bookDiv.appendChild(titleDiv);

  authorDiv.innerText = item.author;
  authorDiv.setAttribute('class', 'authorDiv');
  bookDiv.appendChild(authorDiv);


  if (read.value === "true") {
    readButton.innerText = 'read';
    readButton.setAttribute('class', 'read');
  } else {
    readButton.innerText = 'not read';
    readButton.setAttribute('class', 'notread');
  }

  bookDiv.appendChild(readButton);

  deleteButton.innerText = 'delete';
  deleteButton.setAttribute('class', 'delete');
  bookDiv.appendChild(deleteButton);

  library.appendChild(bookDiv);

  deleteButton.addEventListener('click', (e) => {
    myLibrary.splice(bookDiv.id, bookDiv.id);
    setData()
    render();
  })

  readButton.addEventListener('click', () => {
    item.read = !item.read;
    setData();
    render();
  });


}

// setting Library to be stored in local storage
function setData() {
  localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
}

//pulls books from local storage when page is refreshed
function restore() {
  if (!localStorage.myLibrary) {
    render();
  } else {
    let objects = localStorage.getItem('myLibrary') // gets information from local storage to use in below loop to create DOM/display
    objects = JSON.parse(objects);
    myLibrary = objects;
    render();
  }
}

restore();