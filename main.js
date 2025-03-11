const createTaskInputElement = document.querySelector('[data-js-create-task-input]')
const createTaskButtonElement = document.querySelector('[data-js-create-task-button]')
const todoListElement = document.querySelector('[data-js-todo-list]')

function removeTask(element) {
  element.remove()
}

todoListElement.addEventListener('click', (event) => {
  const todoItemElement = event.target.closest('[data-js-todo-item]')
  const deleteButtonElement = event.target.closest('[data-js-task-delete-button]')

  if (deleteButtonElement) {
    removeTask(todoItemElement)
  }
  else if (todoItemElement) {
    todoItemElement.querySelector('[data-js-task-checkbox]').checked = false
    console.log(event.target)
    todoItemElement.classList.toggle('checked')

    if (todoItemElement.classList.contains('checked')) {
      todoItemElement.querySelector('[data-js-task-checkbox]').checked = true
    }
    
  }
})

const taskCheckboxElements = todoListElement.querySelectorAll('[data-js-task-checkbox]')

function addTodoItem() {
  const taskMessage = createTaskInputElement.value
  if (taskMessage === '') {
    return
  }
  const newTaskMarkup = `
    <li class="todo__item task shadow-block" data-js-todo-item>
      <input class="task__checkbox custom-checkbox" type="checkbox" data-js-task-checkbox>
      <span class="task__content">${taskMessage}</span>
      <button class="task__delete-button button" type="button" aria-label="Delete task" title="Delete task" data-js-task-delete-button></button>
    </li>`

  todoListElement.insertAdjacentHTML("afterbegin", newTaskMarkup)
  createTaskInputElement.value = ''
}

createTaskButtonElement.addEventListener('click', addTodoItem)

createTaskInputElement.addEventListener('keydown', (event) => {
  if (event.code === "Enter") {
    event.preventDefault()
    addTodoItem()
  }
})





