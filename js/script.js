const studentItems = document.querySelectorAll('.student-item'); //selects the complete html list as an array object
const studentsPerPage = 10; //the number of students per page
const numberOfStudents = studentItems.length; //stores the total number of students (list items) in variable
const page = document.querySelector('.page'); //gets the main page div holding student list
const getNumberOfPages = (list, perPage) => Math.ceil(list/perPage); //divides total student list by number of students on each page and rounds up
const pageHeader = document.querySelector('.page-header'); //gets page header div
const createDiv = document.createElement('div');
const searchBarHTML = `
  <input placeholder="Search for students... " title="Type in a name">
  <button class='button'>Search</button>
`;
let pagUl, linksLi, pageButton, linksDiv, linksUl, topNum, bottomNum;
let studentArr = [];
let clickedNum = 1;

const createPageLinksSection = (pageDiv) => { //creates the container div that holds buttons
  linksDiv = document.createElement('div'); //creates div element and stores it in variable
  linksUl = document.createElement('ul'); //creates ul element and stores it in variable
  linksDiv.className = 'pagination'; //gives class name to created div element
  pageDiv.appendChild(linksDiv); //appends new div element to the main page div
  linksDiv.appendChild(linksUl); //appends new ul element to the new links div
  }

const createLinkButton = (numOfPag, pgNum) => { // creates page buttons
  pagUl = document.querySelector('.pagination ul'); //gets pagination ul elements
  linksLi = document.createElement('li'); //creates li element and stores it in variable
  pageButton = document.createElement('a'); //creates anchor element and stores it in variable
  pagUl.appendChild(linksLi); //appends new li tag to ul tag
  linksLi.appendChild(pageButton); //appends new anchor tag to li tag
  pageButton.textContent = pgNum; //populates li tag content with page number using argument
  pageButton.classList.add('button');
  pageButton.href = '#'; //sets button href to #
}

const clearButtons = location => {location.innerHTML = ``}

function hideStudents(list) { //hides all the students on the page
  for (let i=0; i<list.length; i++) {
    list[i].style.display = 'none';
  }
}

function setActive() { //sets the clicked anchor tag class as active, removes old active tag from previous active
  if (event.target.tagName == 'A') { //if click target is an anchor tag
    let allLinks = document.querySelectorAll('.pagination ul li a'); //gets array of all anchor tags decendent of pagination class
    for (let i=0; i<allLinks.length; i++) { //loops through array to remove active class from previous click
      allLinks[i].classList.remove("active");
    }
    event.target.classList.add('active'); //sets click target as active class
  }
}

function getNumbers(pageNum) { //sets the topNum and bottomNum variables according to the pageNum, example pageNum 2 gives 10-20 as topNum and bottomNum
  topNum = pageNum*studentsPerPage;
  bottomNum = topNum-studentsPerPage;
}

// function showPage(pageNum, list) { //​builds ​a ​list ​of ​students ​and ​displays ​it ​on ​the page.
//   hideStudents(list); //first hides all students on the page
//   getNumbers(pageNum); //gets numbers to filter students against
//   for (i=0; i<list.length; i++) { //loops through student list and displays students who fall within the number range
//     if (bottomNum <= i && i < topNum) { //if within number range
//       list[i].style.display = 'list-item'; //sets display property to make student visible
//     }
//   }
// }

function showPage(pageNum, list) { //​builds ​a ​list ​of ​students ​and ​displays ​it ​on ​the page.
  getNumbers(pageNum); //gets numbers to filter students against
  for (i=0; i<list.length; i++) { //loops through student list and displays students who fall within the number range
    if (bottomNum <= i && i < topNum) { //if within number range
      studentArr.push(list[i]);
    }
  }
}

function createButtons(numPag) { //creates anchor tags (buttons) depending on number of pages
  for (let i=0; i<numPag; i++) { //"for" every page
    createLinkButton(numPag, i+1); // creates button for each page
  }
}

function appendPageLinks(list, perPage) { //creates ​all ​the ​page ​links ​based ​on ​a ​list ​of ​students.
  let numberOfPages = getNumberOfPages(list, perPage); //determines how many pages
  createPageLinksSection(page); //creates a page link section
  createButtons(numberOfPages); //creates anchor tags (buttons)
  document.querySelectorAll('.pagination ul li a')[0].classList.add('active'); //sets the first ancor tag as active class
}

const appendItem = (location, item, className, innerHTML) => {
  let element = item;
  element.className = className;
  element.innerHTML = innerHTML;
  location.appendChild(element);
}

const matchStudents = (list) => {
  let input, filter, students, h3, i;
  input = document.querySelector('.student-search input'); //gets input element
  filter = input.value.toUpperCase();
  students = list;
  for (i=0; i<students.length; i++) {
    h3 = students[i].querySelector('h3');
    if (h3.innerHTML.toUpperCase().indexOf(filter) > -1) {
      studentArr.push(students[i]);
    }
  }
}

const checkBlank = (location) => { //returns false if input is blank, true if not blank
  value = location.value;
  if (value==null || value=="") {
    console.log('blank box');
    return false;
  } else {
    return true;
  }
}

const clearArr = (arr) => {arr.length = 0}

const displayArr = (arr) => {
  for (let i=0; i<arr.length; i++) {
    arr[i].style.display = 'list-item';
    console.log(arr[i]);
  }
}

hideStudents(studentItems); //first hides all students on the page
showPage(clickedNum, studentArr); //initial showPage function call on page load
appendPageLinks(numberOfStudents, studentsPerPage); //initial appendPageLinks function call on page load
appendItem(pageHeader, createDiv, 'student-search', searchBarHTML); //appends search bar to header div


page.addEventListener('click', (event) => {
  //if button is pressed
  if (event.target.classList.contains('button')) {
    //determin which buttons
      if(event.target.tagName == 'BUTTON') {
        if (checkBlank(document.querySelector('.student-search input'))) {
          console.log('match button pressed');
          // hideStudents(studentItems);
          clearArr(studentArr);
          clearButtons(document.querySelector('.pagination ul'));
          matchStudents(studentItems);
          appendPageLinks(studentArr.length, studentsPerPage)
          displayArr(studentArr);
        }
      // } else {
      //   console.log('pagination button pressed');
      //   clearArr(studentArr);
      //   setActive();
      //   clickedNum = document.querySelector('.active').textContent; //stores clicked page number in variable
      //   showPage(clickedNum, studentItems); //displays students based off page number clicked
      }
  }
    //filter students
    //count students
    //display links (appendPageLinks)
    //display students (showPage)
});

console.log(`Number of students is ${numberOfStudents}`);
