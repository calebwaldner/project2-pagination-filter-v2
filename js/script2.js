let pagUl, linksLi, pageButton, linksDiv, linksUl, topNum, bottomNum;
let studentArrWorking = [];
let studentArrDisplay = [];
let clickedNum = 1;

const studentArrAll = document.querySelectorAll('.student-item');
const studentsPerPage = 10; //the number of students per page
const getNumberOfPages = (length, perPage) => Math.ceil(length/perPage); //divides total student list by number of students on each page and rounds up
const page = document.querySelector('.page'); //gets the main page div holding student list
const pageHeader = document.querySelector('.page-header'); //gets page header div
const createLinksDiv = document.createElement('div');
const createSearchDiv = document.createElement('div');
const createUl = document.createElement('ul');
const searchBarHTML = `
  <input placeholder="Search for students... " title="Type in a name">
  <button class='button'>Search</button>
`;

const hideStudents = (list) => {
  for (let i=0; i<list.length; i++) {
    list[i].style.display = 'none';
  }
}
hideStudents(studentArrAll);

const clearArr = (arr) => {arr.length = 0}

const displayStudents = (list) => {
  for (let i=0; i<list.length; i++) {
    list[i].style.display = 'list-item';
  }
}

const getNumbers = (pageNum) => { //sets the topNum and bottomNum variables according to the pageNum, example pageNum 2 gives 10-20 as topNum and bottomNum
  topNum = pageNum*studentsPerPage;
  bottomNum = topNum-studentsPerPage;
}

const appendItem = (location, item, className, innerHTML) => {
  let element = item;
  element.classList = className;
  element.innerHTML = innerHTML;
  location.appendChild(element);
}

const appendLinksContainer = () => {
  appendItem(page, createLinksDiv, 'pagination', '');
  linksDiv = document.querySelector('.pagination');
  appendItem(linksDiv, createUl, '', '')
  linksUl = document.querySelector('.pagination ul')
}

const removeLinksContainer = (parent, removeThis) => {
  if (parent.contains(removeThis)) {
    removeThis.remove();
    console.log('removed links');
  }
}

const createButtonElement = (i) => {
  const createLi = document.createElement('li');
  const createA = document.createElement('a');
  appendItem(linksUl, createLi, '', '');
  linksLi = document.querySelectorAll('.pagination ul li')[i];
  appendItem(linksLi, createA, 'button', i+1);
  pageButton = document.querySelectorAll('.pagination ul li a')[i];
  pageButton.href = '#';
}

const createButtons = (numPag, i) => { //creates anchor tags (buttons) depending on number of pages
  for (let i=0; i<numPag; i++) { //"for" every page
    createButtonElement(i); // creates button for each page
  }
}

const popDisplayList = (workingList, displayList) => {
  for (let i=0; i<workingList.length; i++) { //loops through student list and displays students who fall within the number range
    if (bottomNum <= i && i < topNum) { //if within number range
      displayList.push(workingList[i]);
    }
  }
}

const setActive = () => { //sets the clicked anchor tag class as active, removes old active tag from previous active
  if (event.target.tagName == 'A') { //if click target is an anchor tag
    let allLinks = document.querySelectorAll('.pagination ul li a'); //gets array of all anchor tags decendent of pagination class
    for (let i=0; i<allLinks.length; i++) { //loops through array to remove active class from previous click
      allLinks[i].classList.remove("active");
    }
    event.target.classList.add('active'); //sets click target as active class
  }
}

const setPgOneActive = () => { //sets the first ancor tag as active class
  document.querySelectorAll('.pagination ul li a')[0].classList.add('active');
}

const showPage = (pageNum, workingList, displayList) => { //​builds ​a ​list ​of ​students ​and ​displays ​it ​on ​the page.
  getNumbers(pageNum); //gets numbers to filter students against, stores in topNum and bottomNum variable
  popDisplayList(workingList, displayList);
  displayStudents(displayList);
}

const appendPageLinks = (length, perPage) => { //creates ​all ​the ​page ​links ​based ​on ​a ​list ​of ​students.
  removeLinksContainer(page, document.querySelector('.pagination'));
  appendLinksContainer();
  let numberOfPages = getNumberOfPages(length, perPage); //determines how many pages
  createButtons(numberOfPages); //creates anchor tags (buttons)
  setPgOneActive();
}

const appendSearch = () => { //appends search bar to header div
  appendItem(pageHeader, createSearchDiv, 'student-search', searchBarHTML);
}

// appendSearch();
appendPageLinks(studentArrAll.length, studentsPerPage);
showPage(clickedNum, studentArrAll, studentArrDisplay);

linksDiv.addEventListener('click', (event) => {
  if(event.target.tagName == 'A') {
    setActive();
    clickedNum = document.querySelector('.active').textContent; //stores clicked page number in variable
    hideStudents(studentArrDisplay);
    clearArr(studentArrDisplay)
    showPage(clickedNum, studentArrAll, studentArrDisplay);
  }
});

// page.addEventListener('click', (event) => {
//   //if button is pressed
//   if (event.target.classList.contains('button')) {
//     //determin which buttons
//       if(event.target.tagName == 'BUTTON') {
//         if (checkBlank(document.querySelector('.student-search input'))) {
//           console.log('match button pressed');
//           // hideStudents(studentItems);
//           clearArr(studentArr);
//           clearButtons(document.querySelector('.pagination ul'));
//           matchStudents(studentItems);
//           appendPageLinks(studentArr.length, studentsPerPage)
//           displayArr(studentArr);
//         }
//       } else {
//         console.log('pagination button pressed');
//         clearArr(studentArr);
//         setActive();
//         clickedNum = document.querySelector('.active').textContent; //stores clicked page number in variable
//         showPage(clickedNum, studentItems); //displays students based off page number clicked
//       }
//   }
//     // filter students
//     // count students
//     // display links (appendPageLinks)
//     // display students (showPage)
// });
