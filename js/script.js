
let pagUl, linksLi, pageButton, linksDiv, linksUl, topNum, bottomNum, clickedNum, resultsHTML;

//three arrays to filter results
let studentArrWorking = []; //array to hold the complete list after filtering, the working array
let studentArrDisplay = []; //array to hold the students currently being displayed on page
let studentArrSearch = []; //array to hold all search results
const studentArrAll = document.querySelectorAll('.student-item'); //array to hold complete list of students, populates from HTML file

const studentsPerPage = 10; //the number of students per page
const getNumberOfPages = (length, perPage) => Math.ceil(length/perPage); //divides total student list by number of students on each page and rounds up
const page = document.querySelector('.page'); //gets the main page div
const pageHeader = document.querySelector('.page-header'); //gets page header div
const createLinksDiv = document.createElement('div'); //creates div for pagination
const createSearchDiv = document.createElement('div'); //creates div for search
const createNoResultsDiv = document.createElement('div'); //creates div for no-results message
const createResultsH3 = document.createElement('h3'); //creates div for results summary message
const createUl = document.createElement('ul'); //creates ul for pagination
const searchBarHTML = `
  <input placeholder="Search for students... " title="Type in a name" class='search-box'>
  <button class='searchButton'>Search</button>
`; //HTML to append search features
const noResultsHTML = `
  <h3>No Results Found</h3>
`; //HTML to append no-results message

const hideStudents = (list) => { //hides students from list (array)
  for (let i=0; i<list.length; i++) {
    list[i].style.display = 'none';
  }
}

const clearArr = (arr) => {arr.length = 0} //empties array

const displayStudents = (list) => { //sets display style to 'list-item' of objects in list (array)
  for (let i=0; i<list.length; i++) {
    list[i].style.display = 'list-item';
  }
}

const getNumbers = (pageNum) => { //sets the topNum and bottomNum variables according to the pageNum, example: pageNum 2 sets 10-20 as bottomNum and topNum
  topNum = pageNum*studentsPerPage;
  bottomNum = topNum-studentsPerPage;
}

const appendItem = (parent, item, className, innerHTML) => { //appends an element to a parent, can set className and innerHTML properties
  let element = item;
  element.classList = className;
  element.innerHTML = innerHTML;
  parent.appendChild(element);
}

const appendLinksContainer = () => { //appends div and ul elements for pagination to bottom of page
  appendItem(page, createLinksDiv, 'pagination', '');
  linksDiv = document.querySelector('.pagination');
  appendItem(linksDiv, createUl, '', '')
  linksUl = document.querySelector('.pagination ul')
}

const removeContainer = (parent, removeThis) => { //removes element from parent if element exists in parent
  if (parent.contains(removeThis)) { //checks if element exists in parent
    removeThis.remove();
  }
}

const createButtonElement = (i) => { //appends an li and a tag, needs to be iterated, has index from iteration as parameter
  const createLi = document.createElement('li');
  const createA = document.createElement('a');
  appendItem(linksUl, createLi, '', ''); //appends li
  linksLi = document.querySelectorAll('.pagination ul li')[i]; //gets li tag that was just appended
  appendItem(linksLi, createA, 'button', i+1); //appends a to li with index+1 as html content (number on link, number of page it represents for pagination)
  pageButton = document.querySelectorAll('.pagination ul li a')[i]; //gets a tag that was just appended
  pageButton.href = '#'; //adds href to new a tag
}

const createButtons = (numPag) => { //creates anchor tags (buttons) depending on number of pages
  for (let i=0; i<numPag; i++) { //"for" every page
    createButtonElement(i); //creates button for each page, adds correct number to button using index
  }
}

const popDisplayList = (workingList, displayList) => { //takes working list (complete list after filtering) and populates display list depending on page number.
  clearArr(studentArrDisplay); //clears array to repopulate
  for (let i=0; i<workingList.length; i++) { //loops through working list and adds student to display array if they fall within range
    if (bottomNum <= i && i < topNum) { //if within number range
      displayList.push(workingList[i]); //add to display list
    }
  }
}

const popWorkingList = (updateList) => { //populates working list from another list (update list)
  clearArr(studentArrWorking); //clears array to repopulate
  for (let i=0; i<updateList.length; i++) {
    studentArrWorking.push(updateList[i])
  }
}

const setActive = (event) => { //sets the clicked anchor tag class as active, removes active class from previous active
  if (event.target.tagName == 'A') { //if click target is an anchor tag
    let allLinks = document.querySelectorAll('.pagination ul li a'); //gets collection of all anchor tags
    for (let i=0; i<allLinks.length; i++) { //loops through array
      allLinks[i].classList.remove("active"); //removes active class
    }
    event.target.classList.add('active'); //sets click target as active class
  }
  clickedNum = document.querySelector('.active').textContent; //stores clicked page number in variable
}

const setPgOneActive = () => { //sets the first anchor tag as active class, used for pagination refresh
  let links = document.querySelectorAll('.pagination ul li a'); //gets collection of links
  if (checkArrBlank(links)) { //checks if collection exits (if there are links on the page)
    links[0].classList.add('active'); //sets first link as active
  }
}

const showPage = (pageNum, workingList, displayList) => { //​builds ​a ​list ​of ​students based off the page number ​and ​displays ​it ​on ​the page.
  getNumbers(pageNum); //gets numbers to filter students against, stores in topNum and bottomNum variable
  popDisplayList(workingList, displayList); //populates display list from working list using topNum and bottomNum as filter
  displayStudents(displayList); //changes display property of all objects in argument (array).
}

const appendPageLinks = (list, perPage) => { //creates ​​the ​page ​links ​based ​on length of list and students per page.
  if (list.length>perPage) { //if list length is greater than students per page (if more than one page is needed)
    appendLinksContainer(); //appends container holding links
    let numberOfPages = getNumberOfPages(list.length, perPage); //determines how many pages will be needed, stores highest page number
    createButtons(numberOfPages); //creates anchor tags (buttons) for each page
    setPgOneActive(); //sets the first page as active (default)
  }
}

const clearMessage = () => { //removes no-results message from DOM
  removeContainer(page, document.querySelector('.no-results'))
}

const showMsgNoResult = () => { //appends no-results message to DOM
  appendItem(page, createNoResultsDiv, 'no-results', noResultsHTML);
}

const appendSearch = () => { //appends search bar to DOM
  appendItem(pageHeader, createSearchDiv, 'student-search', searchBarHTML);
}

const appendResults = () => { //populates and appends results summary
  let pseudoTopNumber = topNum; //stores topNum in variable for function
  if (studentArrWorking.length<1) { //if working list has no students
    resultsHTML = `Students 0 out of ${studentArrWorking.length}`; //show custom message for 0 students
  } else {
    if (pseudoTopNumber>studentArrWorking.length) { //if top number is greater than the length of working list
      pseudoTopNumber = studentArrWorking.length; //change pseudoTopNumber to top number from list. This prevents messages such as "Students 41-50 out of 45 students". In example, "50" should be changed to "45" to say "Students 41-45 out of 45 students".
    }
    if (pseudoTopNumber==bottomNum+1) { //if bottom number and top number are the same (example: "Students 31-31 out of 31"). In other works, one student is displayed on the page...
      resultsHTML = `Student ${pseudoTopNumber} out of ${studentArrWorking.length}` // then custom message...
      appendItem(pageHeader, createResultsH3, 'results', resultsHTML); //append to page...
      return; //and end function
    } //otherwise
    resultsHTML = `Students ${bottomNum+1}-${pseudoTopNumber} out of ${studentArrWorking.length}`; //stores message, example:"Students 11-20 out of 54"
  }
  appendItem(pageHeader, createResultsH3, 'results', resultsHTML); //appends stored message to page
}

const updateResults = () => { //updates results summery
  removeContainer(pageHeader, document.querySelector('.results')); //clears current message
  appendResults(); //writes new message
}

const matchStudents = (allArr, searchArr) => { //filters based off search and stores in search list (array)
  let input, filter, students, h3, i;
  input = document.querySelector('.student-search input'); //grabs input element
  filter = input.value.toUpperCase(); //grabs content from input, makes UPPERCASE
  students = allArr; //stores complete student list in variable to search through
  clearArr(searchArr); //clears previous search results
  for (i=0; i<students.length; i++) { //loops through complete student list
    h3 = students[i].querySelector('h3'); //stores student name in variable
    if (h3.innerHTML.toUpperCase().indexOf(filter) > -1) { //if student name (h3) contains the filter (search value), then the 0 is returned because the filter was found in h3 at the index value of 0 (the h3 array only contains one student at a time, so the only two results possible are 0 (filter found) or -1 (filter not found)). (example: search value is "CAL" and student name is "CALEB", so 0 is returned because "CAL" was found at index 0).
      searchArr.push(students[i]); //each student who contains the filter value is stored in the search array
    }
  }
}

const startPgOne = () => {clickedNum=1} //sets clickedNum to 1

const checkArrBlank = (arr) => { //returns true if array is not empty
  if (arr.length != 0) {
    return true;
  }
}

const refreshList = () => { //refreshes display list
  hideStudents(studentArrAll); //hides all students
  showPage(clickedNum, studentArrWorking, studentArrDisplay); //using clickedNum as argument, the display array is populated from the working array
  updateResults(); //updates results summery
  clearMessage(); //clears no-results message
}

const refreshPagination = () => { //refreshes pagination links
  removeContainer(page, document.querySelector('.pagination')); //removes old links
  appendPageLinks(studentArrWorking, studentsPerPage); //appends new links
}

const runSearch = () => { //search function
  matchStudents(studentArrAll, studentArrSearch); //populates search array
  popWorkingList(studentArrSearch); //populates working array from search array
  if (checkArrBlank(studentArrWorking)) { //check if search results are 0, if true (not 0), then display list refreshes with search results, starting on page one and new pagination links
    startPgOne();
    refreshPagination();
    refreshList();
  } else { //shows message saying no results found
    refreshPagination();
    refreshList();
    showMsgNoResult();
  }
}

//script startup functions, run on page load
startPgOne();
popWorkingList(studentArrAll);
appendSearch();
appendResults();
refreshPagination();
refreshList();

linksDiv.addEventListener('click', (event) => { //event listener for pagination links, sets click target as active class and refreshes list
  if(event.target.tagName == 'A') {
    setActive(event);
    refreshList();
  }
});

document.querySelector('.searchButton').addEventListener('click', (event) => { //event listener for search button click, runs search function
  runSearch();
});

document.querySelector('.search-box').addEventListener('keyup', (event) => { //event listener for keyup, runs search function
  runSearch();
});
