
/* method javascript dom: Changing HTML Elements
const erroMessage = document.getElementById('error-mess');
erroMessage.innerHTML = 'This is a test error message'; // add new html content
erroMessage.setAttribute("disabled", "true"); // add new attribute
erroMessage.style.color = 'red'; // change style
erroMessage.style.fontSize = '20px'; // change style
 */

/*Adding and Deleting Elements
const divElement = document.createElement('div');
divElement.innerHTML = 'This is a virtual div element';
divElement.style.color = 'red';
divElement.style.fontSize = '20px';
divElement.style.marginTop = '10px';
erroMessage.appendChild(divElement); // add new element to the body
*/

let todos = [];

const issuesList = document.getElementById('issuesList');

async function fetchTodos() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5&_page=1');
  const data = await res.json();
  todos.push(...data);
  return data;
}

function renderTodoList(dataSource = []) {
  /*
  <li id="issue-list-item--1" class="issue-list-item">
    <div class="list-item-header">
        <div for="" class="list-item-title">1</div>
        <div id="issueStatus" class="list-item-status">
            new
        </div>
    </div>
    <div class="list-item-content">
        <h3 class="issue-name">delectus aut autem</h3>
        <div class="list-item-severity">low</div>
        <div class="list-item-group-btn">
          <button id="changeSttBtn" class="btn btn--close" onclick="closeIssue('1','new')">
              Close
          </button>
          <button class="btn btn--delete" onclick="deleteIssue('1')">Delete</button>
        </div>
    </div>
  </li>
  */

  // clear list
  issuesList.innerHTML = '';

  dataSource.forEach((item) => {
    // create li
    const liElement = document.createElement('li');
    liElement.setAttribute('id', `issue-list-item--${item.id}`);
    liElement.setAttribute('class', 'issue-list-item');

    // create div list-item-header
    const divHeader = document.createElement('div');
    divHeader.setAttribute('class', 'list-item-header');

    const divTitle = document.createElement('div');
    divTitle.setAttribute('class', 'list-item-title');
    divTitle.innerHTML = item.title;

    const divStatus = document.createElement('div');
    divStatus.setAttribute('id', 'issueStatus');
    divStatus.setAttribute('class', 'list-item-status');
    divStatus.innerHTML = item.completed ? 'completed' : 'new';

    divHeader.appendChild(divTitle);
    divHeader.appendChild(divStatus);

    // create div list-item-content
    const divContent = document.createElement('div');
    divContent.setAttribute('class', 'list-item-content');

    const h3Element = document.createElement('h3');
    h3Element.setAttribute('class', 'issue-name');
    h3Element.innerHTML = item.title;

    const divSeverity = document.createElement('div');
    divSeverity.setAttribute('class', 'list-item-severity');
    divSeverity.innerHTML = 'low';

    const divGroupBtn = document.createElement('div');
    divGroupBtn.setAttribute('class', 'list-item-group-btn');

    const btnClose = document.createElement('button');
    btnClose.setAttribute('id', 'changeSttBtn');
    btnClose.setAttribute('class', 'btn btn--close');
    btnClose.setAttribute('onclick', `closeIssue(${item.id})`);
    btnClose.innerHTML = 'Close';

    const btnDelete = document.createElement('button');
    btnDelete.setAttribute('class', 'btn btn--delete');
    btnDelete.setAttribute('onclick', `deleteIssue(${item.id})`);
    btnDelete.innerHTML = 'Delete';

    divGroupBtn.appendChild(btnClose);
    divGroupBtn.appendChild(btnDelete);

    divContent.appendChild(h3Element);
    divContent.appendChild(divSeverity);
    divContent.appendChild(divGroupBtn);

    liElement.appendChild(divHeader);
    liElement.appendChild(divContent);
    issuesList.appendChild(liElement);
  })
  
}

fetchTodos()
  .then(data => {
    renderTodoList(data);
  });


// delete issue
function deleteIssue(todoId) {
  // remove item in array

  // find index
  const todoIndex = todos.findIndex(todo => todo.id === todoId);

  // remove item
  const newTodos = [...todos];
  newTodos.splice(todoIndex, 1);
  todos = newTodos;
  
  // render todo list
  renderTodoList(newTodos);
}