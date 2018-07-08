//Use ​unobtrusive ​JavaScript ​to ​append ​markup ​for ​the ​pagination ​links

//const numberOfStudents = document.getElementsByClassName("student-list").getElementsByTagName("li");
//console.log(document.getElementsByClassName("student-list").getElementsByTagName("li").length);
//console.log(document.getElementsByClassName("student-list").querySelectorAll("li").length);
//console.log(numberOfStudents);
const studentsPerPage = 10; //the number of students per page
const numberOfStudents = document.querySelectorAll('.student-list li').length; //stores the total number of students (list items) in variable
const numberOfPages = (list, studentsPerPage) => Math.ceil(list/studentsPerPage); //divides total student list by number of students on each page and rounds up


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
// create a page link section
// "for" every page
// add a page link to the page link section
// remove the old page link section from the site
// append our new page link section to the site
// define what happens when you click a link (event listener)
// Use showPage to display the page for the link clicked
// mark that link as "active"
}


console.log(appendPageLinks(numberOfStudents));


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
