let pagUl, linksLi, pageButton, linksDiv, linksUl, topNum, bottomNum, clickedNum, resultsHTML;
let studentArrWorking = [];
let studentArrDisplay = [];
let studentArrSearch = [];

const studentArrAll = document.querySelectorAll('.student-item');
const studentsPerPage = 10; //the number of students per page
const getNumberOfPages = (length, perPage) => Math.ceil(length/perPage); //divides total student list by number of students on each page and rounds up
const page = document.querySelector('.page'); //gets the main page div holding student list
const pageHeader = document.querySelector('.page-header'); //gets page header div
const createLinksDiv = document.createElement('div');
const createSearchDiv = document.createElement('div');
const createNoResultsDiv = document.createElement('div');
const createResultsH3 = document.createElement('h3');
const createUl = document.createElement('ul');
const searchBarHTML = `
  <input placeholder="Search for students... " title="Type in a name" class='search-box'>
  <button class='searchButton'>Search</button>
`;
const noResultsHTML = `
  <h3>No Results Found</h3>
`;

const hideStudents = (list) => {
  for (let i=0; i<list.length; i++) {
    list[i].style.display = 'none';
  }
}

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

const appendItem = (parent, item, className, innerHTML) => {
  let element = item;
  element.classList = className;
  element.innerHTML = innerHTML;
  parent.appendChild(element);
}

const appendLinksContainer = () => {
  appendItem(page, createLinksDiv, 'pagination', '');
  linksDiv = document.querySelector('.pagination');
  appendItem(linksDiv, createUl, '', '')
  linksUl = document.querySelector('.pagination ul')
}

const removeContainer = (parent, removeThis) => {
  if (parent.contains(removeThis)) {
    removeThis.remove();
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

const popWorkingList = (updateList) => {
  clearArr(studentArrWorking);
  for (let i=0; i<updateList.length; i++) {
    studentArrWorking.push(updateList[i])
  }
}

const setActive = (event) => { //sets the clicked anchor tag class as active, removes old active tag from previous active
  if (event.target.tagName == 'A') { //if click target is an anchor tag
    let allLinks = document.querySelectorAll('.pagination ul li a'); //gets array of all anchor tags decendent of pagination class
    for (let i=0; i<allLinks.length; i++) { //loops through array to remove active class from previous click
      allLinks[i].classList.remove("active");
    }
    event.target.classList.add('active'); //sets click target as active class
  }
  clickedNum = document.querySelector('.active').textContent; //stores clicked page number in variable
}

const setPgOneActive = () => { //sets the first ancor tag as active class
  let links = document.querySelectorAll('.pagination ul li a');
  if (checkArrBlank(links)) {
    links[0].classList.add('active');
  }
}

const showPage = (pageNum, workingList, displayList) => { //​builds ​a ​list ​of ​students ​and ​displays ​it ​on ​the page.
  getNumbers(pageNum); //gets numbers to filter students against, stores in topNum and bottomNum variable
  popDisplayList(workingList, displayList);
  displayStudents(displayList);
}

const appendPageLinks = (length, perPage) => { //creates ​all ​the ​page ​links ​based ​on ​a ​list ​of ​students.
  if (length.length>perPage) {
    appendLinksContainer();
    let numberOfPages = getNumberOfPages(length.length, perPage); //determines how many pages
    createButtons(numberOfPages); //creates anchor tags (buttons)
    setPgOneActive();
  }
}

const clearMessage = () => {
  removeContainer(page, document.querySelector('.no-results'))
}

const showMsgNoResult = () => {
  appendItem(page, createNoResultsDiv, 'no-results', noResultsHTML);
}

const appendSearch = () => { //appends search bar to header div
  appendItem(pageHeader, createSearchDiv, 'student-search', searchBarHTML);
}

const appendResults = () => {
  let pseudoTopNumber = topNum;
  if (studentArrWorking.length<1) {
    resultsHTML = `Students 0 out of ${studentArrWorking.length}`;
  } else {
    if (pseudoTopNumber>studentArrWorking.length) {
      pseudoTopNumber = studentArrWorking.length;
    }
    if (pseudoTopNumber==bottomNum+1) {
      resultsHTML = `Student ${pseudoTopNumber} out of ${studentArrWorking.length}`
      appendItem(pageHeader, createResultsH3, 'results', resultsHTML);
      return;
    }
    resultsHTML = `Students ${bottomNum+1}-${pseudoTopNumber} out of ${studentArrWorking.length}`;
  }
  appendItem(pageHeader, createResultsH3, 'results', resultsHTML);
}

const updateResults = () => {
  removeContainer(pageHeader, document.querySelector('.results'));
  appendResults();
}

const matchStudents = (allArr, searchArr) => {
  let input, filter, students, h3, i;
  input = document.querySelector('.student-search input'); //gets input element
  filter = input.value.toUpperCase();
  students = allArr;
  clearArr(searchArr);
  for (i=0; i<students.length; i++) {
    h3 = students[i].querySelector('h3');
    if (h3.innerHTML.toUpperCase().indexOf(filter) > -1) {
      searchArr.push(students[i]);
    }
  }
}

const startPgOne = () => {clickedNum=1}

const checkArrBlank = (arr) => { //returns true if array is not empty
  if (arr.length != 0) {
    return true;
  }
}

const refreshList = () => {
  hideStudents(studentArrAll);
  clearArr(studentArrDisplay);
  showPage(clickedNum, studentArrWorking, studentArrDisplay);
  updateResults();
  clearMessage();
}

const refreshPagination = () => {
  removeContainer(page, document.querySelector('.pagination'));
  appendPageLinks(studentArrWorking, studentsPerPage);
}

const runSearch = () => {
  matchStudents(studentArrAll, studentArrSearch);
  popWorkingList(studentArrSearch);
  if (checkArrBlank(studentArrWorking)) {
  console.log(checkArrBlank(studentArrWorking));
    startPgOne();
    refreshPagination();
    refreshList();
    console.log(studentArrWorking);
  } else {/* message saying no results found*/
    refreshPagination();
    refreshList();
    showMsgNoResult();
  }
}

startPgOne();
popWorkingList(studentArrAll);
appendSearch();
appendResults();
refreshPagination();
refreshList();

//search feature should edit the working array
//if no results then show message
//otherwise refresh the page with new working array

linksDiv.addEventListener('click', (event) => {
  if(event.target.tagName == 'A') {
    setActive(event);
    refreshList();
  }
});

document.querySelector('.searchButton').addEventListener('click', (event) => {
  runSearch();
});

document.querySelector('.search-box').addEventListener('keyup', (event) => {
  runSearch();
});
