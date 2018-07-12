
const studentItems = document.querySelectorAll('.student-item'); //selects the complete html list as an array object
const studentList = document.querySelector('.student-list');
const studentsPerPage = 10; //the number of students per page
const numberOfStudents = studentItems.length; //stores the total number of students (list items) in variable
const page = document.querySelector('.page');
const getNumberOfPages = (list, perPage) => Math.ceil(list/perPage); //divides total student list by number of students on each page and rounds up
let pagUl;
let linksLi;
let pageButton;
let linksDiv;
let linksUl;
let topNum;
let bottomNum;
let clickedNum = 1;

const createPageLinksSection = (pageDiv) => { //creates the container div that holds buttons
  linksDiv = document.createElement('div'); //creates div element and stores it in variable
  linksUl = document.createElement('ul'); //creates ul element and stores it in variable
  linksDiv.className = 'pagination'; //gives class name to created div element
  pageDiv.appendChild(linksDiv); //appends new div element to the main page div
  linksDiv.appendChild(linksUl); //appends new ul element to the new links div
  }

const createLinkButton = (numOfPag, pgNum) => { // creates page buttons
  pagUl = document.querySelector('.pagination ul'); //gets pagination ul tag
  linksLi = document.createElement('li'); //creates li element and stores it in variable
  pageButton = document.createElement('a'); //creates a element and stores it in variable
  pageButton.href = '#'; //causes buttons to send user to top of page
  pagUl.appendChild(linksLi); //adds new li tag to ul tag
  linksLi.appendChild(pageButton); //adds new a tag to li tag
  pageButton.textContent = pgNum; //populates li tag content with page number using argument
}

function hideStudents(list) { //hides all the students on the page
  for (let i=0; i<list.length; i++) {
    list[i].style.display = 'none';
  }
}






function setActive() { //sets the clicked anchor tag class as active, removes old active tag from previous active
  if (event.target.tagName == 'A') {
    let allLinks = document.querySelectorAll('.pagination ul li a');
    for (let i=0; i<allLinks.length; i++) {
      allLinks[i].classList.remove("active");
    }
    event.target.className = 'active';
  }
}



function getNumbers(pageNum) { //sets the topNum and bottomNum variables according to the pageNum, example pageNum 2 gives 10-20 as topNum and bottomNum
  topNum = pageNum*studentsPerPage;
  bottomNum = topNum-studentsPerPage;
}

function showPage(pageNum, list) { //​builds ​a ​list ​of ​students ​and ​displays ​it ​on ​the page.
  hideStudents(list); //first hides all students on the page
  getNumbers(pageNum); //gets numbers to filter students against
  for (i=0; i<list.length; i++) { //loops through student list and displays students who fall within the number range
    if (bottomNum <= i && i < topNum) {
      list[i].style.display = 'list-item';
      console.log(i+1);
    }
  }
}

function removeOldLinks() { //removes old link section
  let pageDiv = document.querySelector('.pagination');
  pageDiv.remove();
}

function createButtons(numPag) {
  for (let i=0; i<numPag; i++) { // "for" every page
    createLinkButton(numPag, i+1); // creates button for each page
  }
}

function appendPageLinks(list, perPage) { //creates ​all ​the ​page ​links ​based ​on ​a ​list ​of ​students.
  let numberOfPages = getNumberOfPages(list, perPage); // determines how many pages
  createPageLinksSection(page); // creates a page link section
  createButtons(numberOfPages);
  // add a page link to the page link section
  // remove the old page link section from the site


  // append our new page link section to the site
  // define what happens when you click a link (event listener)
  linksDiv.addEventListener('click', (event) => {

    //*********this should be the active class content. Be better
    clickedNum = event.target.textContent;
    console.log(clickedNum);
    showPage(clickedNum, studentItems);
    setActive();
    //removeOldLinks();
    //createPageLinksSection(page); //creates a page link section again
    //createButtons(numberOfPages);
  });
  //   Use showPage to display the page for the link clicked
  //   mark that link as "active"

}






showPage(clickedNum, studentItems);
appendPageLinks(numberOfStudents, studentsPerPage);





console.log(`Number of students is ${numberOfStudents}`);
