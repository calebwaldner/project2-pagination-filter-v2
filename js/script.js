//Use ​unobtrusive ​JavaScript ​to ​append ​markup ​for ​the ​pagination ​links

const studentList = document.querySelectorAll('.student-item'); //selects the complete html list as an array object
const studentsPerPage = 10; //the number of students per page
const numberOfStudents = studentList.length; //stores the total number of students (list items) in variable
const numberOfPages = (list, studentsPerPage) => Math.ceil(list/studentsPerPage); //divides total student list by number of students on each page and rounds up
const page = document.querySelector('.page');

const createPageLinksSection = (pageDiv) => { //creates the container div that holds buttons
  let linksDiv = document.createElement('div'); //creates div element and stores it in variable
  let linksUl = document.createElement('ul'); //creates ul element and stores it in variable

  linksDiv.className = 'pagination'; //gives class name to created div element
  pageDiv.appendChild(linksDiv); //appends new div element to the main page div
  linksDiv.appendChild(linksUl);


}

const createButton = (ul, num) => {
  let pageButton = document.createElement('a');
  pageButton.href = '#';
  pageButton.content = num;
  ul.appendChild(pageButton);
}


// const createLinkButtons = () => {
//   for (i=0; i<=numberOfStudents; i++) {
//     createLinkButtons(lis[i]);
//   }
// }

/*This ​function ​builds ​a ​list ​of ​ten ​students ​and ​displays ​it ​on ​the page. ​The ​students ​displayed depends ​on ​the ​page ​number ​passed ​to ​this ​function. ​The ​function ​should ​loop ​through ​all ​the students ​in ​the ​list ​and ​determine ​if ​each ​student ​is ​on ​this ​page. ​It ​will ​show ​all ​the ​students ​on this ​page ​and ​hide ​the ​rest. ​Here ​are ​some ​ideas ​for ​how ​this ​could ​work ​in ​code:*/
function showPage(/* arguments for page number and student list */) {
  // first hide all students on the page
  // then loop through all students in our student list argument
  // if student should be on this page number
  // show the student

}


/*This ​function ​creates ​all ​the ​page ​links ​based ​on ​a ​list ​of ​students. ​It ​will ​determine ​how ​many pages ​we ​need ​based ​on ​the ​list's ​length, ​create ​a ​list ​of ​links ​for ​each ​page, ​and ​append ​that list ​to ​the ​page. ​When ​each ​link ​is ​clicked, ​we'll ​use ​the ​showPage ​function ​to ​display ​the corresponding ​page, ​and ​mark ​the ​active ​link. ​For ​example, ​clicking ​the ​link ​to ​page ​2 ​will ​tell the ​showPage ​function ​to ​display ​students ​11 ​through ​20.*/
function appendPageLinks(list) {
  numberOfPages(list, studentsPerPage); // determines how many pages
  createPageLinksSection(page); // creates a page link section

  // "for" every page

  // add a page link to the page link section
  // remove the old page link section from the site
  // append our new page link section to the site
  // define what happens when you click a link (event listener)
  // Use showPage to display the page for the link clicked
  // mark that link as "active"
}


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
console.log(studentList[1]);







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
