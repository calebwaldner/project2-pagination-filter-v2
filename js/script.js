
const studentItems = document.querySelectorAll('.student-item'); //selects the complete html list as an array object
const studentList = document.querySelector('.student-list');
const studentsPerPage = 10; //the number of students per page
const numberOfStudents = studentItems.length; //stores the total number of students (list items) in variable
const page = document.querySelector('.page');
const getNumberOfPages = (list, studentsPerPage) => Math.ceil(list/studentsPerPage); //divides total student list by number of students on each page and rounds up
let pagUl;
let linksLi;
let pageButton;
let linksDiv;
let linksUl;
let topNum;
let bottomNum;

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

function setActive() {
  if (event.target.tagName == 'A') {
    event.target.className = 'active';
  }
}

//not finished, needs to show 1-10 if one is clicked, 11-20 if two is clicked
function getNumbers(pageNum) {
  topNum = pageNum*10;
  bottomNum = topNum-10;
}

function showPage(/* arguments for page number and student list */pageNum, list) { //​builds ​a ​list ​of ​ten ​students ​and ​displays ​it ​on ​the page.
  // first hide all students on the page
  hideStudents(list);
  getNumbers(pageNum);
  // then loop through all students in our student list argument
  for (i=0; i<list.length; i++) {
    if (bottomNum <= i && i < topNum) {
      list[i].style.display = 'list-item';
      console.log(i+1);
    }
  }
  // what i need to do here is show students 1-10 if the active class content is 1 or 11-20 if the active class content is 2 and so forth

  // if student should be on this page number
  // show the student

}


function appendPageLinks(list) { //creates ​all ​the ​page ​links ​based ​on ​a ​list ​of ​students.
  let numberOfPages = getNumberOfPages(list, studentsPerPage); // determines how many pages
  createPageLinksSection(page); // creates a page link section
  for (let i=0; i<numberOfPages; i++) { // "for" every page
    createLinkButton(numberOfPages, i+1); // creates button for each page
  }
  // add a page link to the page link section
  // remove the old page link section from the site
  // append our new page link section to the site
  // define what happens when you click a link (event listener)
  linksDiv.addEventListener('click', (event) => {
    setActive();
  });


}

//   Use showPage to display the page for the link clicked
//   mark that link as "active"
// }



showPage(6, studentItems);
appendPageLinks(numberOfStudents);



//  let pageLink = document.createElement('button');



  // for () {`
  //   <div class="pagination">
  //     <ul>
  //       <li>
  //         <a href="#">1</a>
  //       </li>
  // `}




console.log(`Number of students is ${numberOfStudents}`);
console.log(studentItems[1]);







/*
`
<div class="pagination">
        <ul>
          <li>
            <a class="active" href="#">1</a>
          </li>
           <li>
            <a href="#">2</a>
          </li>
           <li>
            <a href="#">3</a>
          </li>
           <li>
            <a href="#">4</a>
          </li>
           <li>
            <a href="#">5</a>
          </li>
        </ul>
      </div>
`
*/
